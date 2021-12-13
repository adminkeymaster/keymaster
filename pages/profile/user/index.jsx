//Next, React (core node_modules) imports must be placed here
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import styled from 'styled-components';
import { Upload } from '@styled-icons/heroicons-outline/Upload';
import { Close } from '@styled-icons/evaicons-solid/Close';

//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import UserLayout from "@/layouts/User";
//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'
import Notification from '@/components/Notification';
import styles from "./User.module.scss";

const StyledCloseIcon = styled(Close)`
  width: 3.6rem;
  height: 3.6rem;
`;
const StyledUploadIcon = styled(Upload)`
  width: 3.6rem;
  height: 3.6rem;
`;
const UserPage = (props) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") return null;

  if (!session) return null;

  const [notification, setNotification] = useState({
    message: "",
    status: "",
  });

  const [isFetched, setIsFetched] = useState(false);

  const [formData, setFormData] = useState({
    firstName: null,
    lastName: null,
<<<<<<< HEAD
    email: '',
    phoneNumber: '',
    password: '',
    photoUpload: null,
=======
    email: "",
    phoneNumber: "",
    password: "",
    // photoLink: null,
>>>>>>> cb519c88b26e463fdda550c02e0bb03853726031
  });

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get(`/api/user/${session.user._id}`, { signal: controller.signal })
      .then(({ data }) => {
        setFormData({
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          email: data.data.email,
          phoneNumber: data.data.phoneNumber,
          photolink: data.data.photoLink,
        });
        setIsFetched(true);
      })
      .catch((err) => {
        console.log("/dashboard/user/[id] fetch aborted", err);
      });

    return () => controller.abort();
<<<<<<< HEAD
  }, [_id]);
=======
  }, []);
>>>>>>> cb519c88b26e463fdda550c02e0bb03853726031

  useEffect(() => {
    if (!notification.message) return;

    const timer = setTimeout(() => {
      setNotification({
        message: "",
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
    console.log(formData);
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
      .post(`/api/user/${session.user._id}`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        photoLink: formData.photoLink,
      })
      .then((res) => {
        if (res.status === 200) {
          router.push(            {
            pathname: '/profile/user',
            query: {
              message: 'Мэдээлэл амжилттай засагдлаа',
              success: true,
            },
          },
          '/profile/user');
        }
      })
      .catch((err) => {
        setNotification({
          message: "Мэдээлэл засахад алдаа гарлаа",
          success: false,
        });
        console.log("Edit UserInfo handleSubmit", err);
      });
  };
  return (
    <main className={styles.container}>
      <Notification message={notification.message} success={notification.success} />
      <h2>Хэрэглэгчийн мэдээлэл</h2>
<<<<<<< HEAD
      <form className={styles.form}>
      <div className={styles.imageContainer}>
            {formData.photolink && (
              <Image src={formData.photolink} layout="fill" objectFit="cover" alt="profile image" />
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
          <div className={styles.details}>
        <input type="text" id="firstName" name="firstName" onChange={handleInputFormData} defaultValue={formData.firstName} required/>
        <input type="text" id="lastName" name="lastName" onChange={handleInputFormData} defaultValue={formData.lastName} required />
        <input type="email" id="email" name="email" onChange={handleInputFormData} defaultValue={formData.email} required />
        <input type="tel" id="phoneNumber" name="phoneNumber" onChange={handleInputFormData} defaultValue={formData.phoneNumber} required/>
        <input type="password" id="password" onChange={handleInputFormData} name="password" placeholder="Нууц үг" required />
        <input type="password" id="passwordconfirm" name="passwordconfirm" placeholder="Нууц үгээ дахин хийнэ үү" required />
        <button className={styles.button} type="submit" onClick={handleSubmit}>Мэдээлэл солих</button>
        </div>
      </form>
      <button className={styles.button}
=======
      {isFetched && (
        <form onSubmit={handleSubmit}>
          <input
            className={styles.inputFileSend}
            type="file"
            name="photoUpload"
            id="photoUpload"
            accept="image/png, image/jpeg"
          />
          <input
            type="text"
            id="firstName"
            name="firstName"
            onChange={handleInputFormData}
            defaultValue={formData.firstName}
            required
          />
          <input
            type="text"
            id="lastName"
            name="lastName"
            onChange={handleInputFormData}
            defaultValue={formData.lastName}
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleInputFormData}
            defaultValue={formData.email}
            required
          />
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            onChange={handleInputFormData}
            defaultValue={formData.phoneNumber}
            required
          />
          <input
            type="password"
            id="password"
            onChange={handleInputFormData}
            name="password"
            placeholder="Password"
            required
          />
          <input
            type="password"
            id="passwordconfirm"
            name="passwordconfirm"
            placeholder="Confirm Password"
            required
          />
          <button type="submit">Мэдээлэл солих</button>
        </form>
      )}

      <button
>>>>>>> cb519c88b26e463fdda550c02e0bb03853726031
        onClick={() => {
          signOut();
        }}
      >
        Гарах
      </button>
    </main>
  );
};

UserPage.Layout = UserLayout;

export default UserPage;
