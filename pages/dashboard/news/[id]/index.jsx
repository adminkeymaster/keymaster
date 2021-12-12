//Next, React (core node_modules) imports must be placed here
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import 'react-quill/dist/quill.snow.css';

import styled from 'styled-components';
import { Close } from '@styled-icons/evaicons-solid/Close';
import { Upload } from '@styled-icons/heroicons-outline/Upload';
//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import DashboardLayout from '@/layouts/Dashboard';

//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'
import Notification from '@/components/Notification';

import styles from './Article.module.scss';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const StyledCloseIcon = styled(Close)`
  width: 3.6rem;
  height: 3.6rem;
`;

const StyledUploadIcon = styled(Upload)`
  width: 3.6rem;
  height: 3.6rem;
`;

const EditArticle = () => {
  const [isFetched, setIsFetched] = useState(false);

  const router = useRouter();

  const { id } = router.query;

  const [notification, setNotification] = useState({
    message: '',
    success: false,
  });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    photolink: '',
    photoUpload: null,
    preview: null,
  });

  useEffect(() => {
    if (!id) {
      return;
    }

    const controller = new AbortController();

    axios
      .get(`/api/news/${id}`, { signal: controller.signal })
      .then(({ data }) => {
        setFormData({
          title: data.data.title,
          description: data.data.description,
          photolink: data.data.photoLink,
        });
        setIsFetched(true);
      })
      .catch((err) => {
        console.log('/dashboard/news/[id] fetch aborted', err);
      });

    return () => controller.abort();
  }, [id]);

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

  const handleQuill = (description) => {
    setFormData({
      ...formData,
      description: description,
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

    return () => URL.revokeObjectURL(objectUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageForm = new FormData();
    imageForm.append('upload_preset', 'keymaster');
    imageForm.append('file', formData['photoUpload']);
    const data = await fetch('https://api.cloudinary.com/v1_1/keymaster123/image/upload', {
      method: 'POST',
      body: imageForm,
    }).then((r) => r.json());

    formData.photoLink = data.url;

    axios
      .post(`/api/news/${id}`, {
        title: formData.title,
        description: formData.description,
        photoLink: formData.photoLink,
      })
      .then((res) => {
        if (res.status === 200) {
          router.push(
            {
              pathname: '/dashboard/news',
              query: {
                message: 'Мэдээ амжилттай засагдлаа',
                success: true,
              },
            },
            '/dashboard/news'
          );
        }
      })
      .catch((err) => {
        setNotification({
          message: 'Мэдээ засахад алдаа гарлаа',
          success: false,
        });
        console.log('Edit Article handleSubmit', err);
      });
  };

  return (
    <main className={styles.container}>
      <Notification message={notification.message} success={notification.success} />

      {isFetched && (
        <form className={styles.form}>
          <h1 className={styles.heading}>Мэдээ Засах</h1>

          <div className={styles.formGroup}>
            <label className={styles.inputLabel} htmlFor="title">
              Гарчиг
            </label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={formData.title}
              className={styles.inputTitle}
              onChange={handleInputFormData}
              required
            />
          </div>

          <div className={styles.imageContainer}>
            {formData.photolink && (
              <Image src={formData.photolink} layout="fill" objectFit="cover" alt="article image" />
            )}

            {formData.photoUpload && (
              <Image src={formData.preview} layout="fill" objectFit="cover" alt="uploaded image" />
            )}

            {formData.photoUpload && (
              <button
                className={styles.reset}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setFormData({
                    ...formData,
                    photoUpload: null,
                    preview: null,
                  });
                }}
              >
                <StyledCloseIcon />
              </button>
            )}

            <div className={styles.overlay}></div>

            <label
              htmlFor="photoUpload"
              className={
                !formData.photoUpload ? styles.labelFileSend : `${styles.labelFileSend} ${styles.labelFileSendActive}`
              }
            >
              <StyledUploadIcon /> Зураг {(formData.photoUpload && 'засах') || 'өөрчлөх'}
            </label>

            <input
              className={styles.inputFileSend}
              type="file"
              name="photoUpload"
              id="photoUpload"
              accept="image/png, image/jpeg"
              onChange={handleFileInput}
              required
            />
          </div>

          <div className={styles.formGroupFile}>
            <button type="submit" className={styles.postButton} onClick={handleSubmit}>
              Засах
            </button>
          </div>

          <ReactQuill className={styles.formEditor} theme="snow" value={formData.description} onChange={handleQuill} />
        </form>
      )}
    </main>
  );
};

EditArticle.Layout = DashboardLayout;

export default EditArticle;
