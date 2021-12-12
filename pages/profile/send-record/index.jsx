//Next, React (core node_modules) imports must be placed here
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Close } from '@styled-icons/evaicons-solid/Close';
import { Upload } from '@styled-icons/heroicons-outline/Upload';
import { useSession } from 'next-auth/react';
//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import DashboardLayout from '@/layouts/Dashboard';
//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'
import Notification from '@/components/Notification';

import styles from './SendRecord.module.scss';

const StyledCloseIcon = styled(Close)`
  width: 3.6rem;
  height: 3.6rem;
`;

const StyledUploadIcon = styled(Upload)`
  width: 3.6rem;
  height: 3.6rem;
`;

const SendRecordPage = (props) => {
  const router = useRouter();
  const [isFetched, setIsFetched] = useState(false);
  const [notification, setNotification] = useState({
    message: '',
    status: '',
  });
  const { data: session, status } = useSession();

  const [types, setTypes] = useState([]);
  const [formData, setFormData] = useState({
    videoUpload: null,
    preview: null,
    keymasterType: '',
    time: '',
  });

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get('/api/keymasterTypes', { signal: controller.signal })
      .then(({ data }) => {
        setTypes(data.data);
        setFormData({ ...formData, keymasterType: data.data[0].keymasterType });
        setIsFetched(true);
      })
      .catch((err) => {
        console.log('/dashboard/products fetch aborted', err);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!notification.message) return;

    const timer = setTimeout(() => {
      setNotification({
        message: '',
        success: false,
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification]);

  const handleInputFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileInput = (e) => {
    const objectURL = URL.createObjectURL(e.target.files[0]);

    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
      preview: objectURL,
    });

    e.target.value = null;

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    const videoForm = new FormData();
    videoForm.append('upload_preset', 'keymaster');
    videoForm.append('file', formData['videoUpload']);

    const data = await fetch('https://api.cloudinary.com/v1_1/dl9girfpg/video/upload', {
      method: 'POST',
      body: videoForm,
    }).then((r) => r.json());
    form.append('userID', session.user._id);

    for (const key in formData) {
      if (!formData[key]) {
        setNotification({
          message: 'Бүх талбаруудыг бөглөнө үү!',
          success: false,
        });
        return;
      }
      form.append(key, formData[key]);
    }
    form.append('videoLink', data.url);

    await axios
      .post('/api/record-request', form)
      .then((res) => {
        if (res.status === 200) {
          router.push('/');
        }
      })
      .catch((err) => {
        setNotification({
          message: 'Рекорд илгээхэд алдаа гарлаа',
          success: false,
        });
        console.log('SendRecordPage handleSubmit:', err);
      });
  };
  return (
    <main className={styles.container}>
      <Notification message={notification.message} success={notification.success} />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <div className={styles.videoContainer}>
            {formData.videoUpload && (
              <video controls>
                <source src={formData.preview} type="video/mp4" />
              </video>
            )}

            {formData.videoUpload && (
              <button
                className={styles.reset}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setFormData({
                    ...formData,
                    videoUpload: null,
                    preview: null,
                  });
                }}
              >
                <StyledCloseIcon />
              </button>
            )}

            <div className={styles.background}></div>

            <label
              htmlFor="videoUpload"
              className={
                !formData.videoUpload ? styles.labelFileSend : `${styles.labelFileSend} ${styles.labelFileSendActive}`
              }
            >
              <StyledUploadIcon /> Бичлэг {(formData.videoUpload && 'засах') || 'оруулах'}
            </label>

            <input
              className={styles.inputFileSend}
              type="file"
              name="videoUpload"
              id="videoUpload"
              accept="video/mp4, video/x-m4v, video/*"
              onChange={handleFileInput}
            />
          </div>
        </div>

        {isFetched && (
          <div className={styles.formGroup}>
            <label htmlFor="keymasterType" className={styles.inputLabel}>
              Төрөл
            </label>
            <select
              name="keymasterType"
              onChange={handleInputFormData}
              className={styles.input}
              defaultValue={types[0].keymasterType}
            >
              {types.map((type) => {
                return (
                  <option value={type.keymasterType} key={type._id}>
                    {type.keymasterType}
                  </option>
                );
              })}
            </select>
          </div>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="time" className={styles.inputLabel}>
            Цаг (секунд)
          </label>
          <input
            className={styles.input}
            type="number"
            min="0.1"
            step="0.1"
            name="time"
            id="time"
            onChange={handleInputFormData}
          />
        </div>

        <button className={styles.postButton}>Илгээх</button>
      </form>
    </main>
  );
};
SendRecordPage.Layout = DashboardLayout;
export default SendRecordPage;
