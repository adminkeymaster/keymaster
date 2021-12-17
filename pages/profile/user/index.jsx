//Next, React (core node_modules) imports must be placed here
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Upload } from "@styled-icons/heroicons-outline/Upload";
import { Close } from "@styled-icons/evaicons-solid/Close";

//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import UserLayout from "@/layouts/User";
//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'
import Notification from "@/components/Notification";
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

  const [notification, setNotification] = useState({
    message: "",
    status: "",
  });

  const [isFetched, setIsFetched] = useState(false);

  const [formData, setFormData] = useState({
    firstName: null,
    lastName: null,
    email: "",
    phoneNumber: "",
    password: "",
    passwordConfirm: "",
    photoUpload: null,
    preview: null,
    photoLink: null,
    photoID: "",
  });

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get(`/api/user/${session.user._id}`, { signal: controller.signal })
      .then(({ data }) => {
        setFormData({
          ...formData,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          email: data.data.email,
          phoneNumber: data.data.phoneNumber,
          photoLink: data.data.photoLink,
        });
        setIsFetched(true);
      })
      .catch((err) => {
        console.log("/dashboard/user/[id] fetch aborted", err);
      });

    return () => controller.abort();
  }, []);

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

  if (status === "loading") return null;
  if (!session) return null;

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
      photoUpload: e.target.files[0],
      preview: objectURL,
    });

    e.target.value = null;

    return () => URL.revokeObjectURL(objectUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      return setNotification({
        message: "Нууц үг 8 тэмдэгтээс бага байна",
        success: false,
      });
    }

    if (formData.password !== formData.passwordConfirm) {
      return setNotification({
        message: "Нууц үг таарахгүй байна",
        success: false,
      });
    }

    const imageForm = new FormData();

    imageForm.append("upload_preset", "keymaster");
    imageForm.append("file", formData["photoUpload"]);

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/keymaster123/image/upload",
      {
        method: "POST",
        body: imageForm,
      }
    ).then((r) => r.json());
    formData.photoLink = data.url;
    formData.photoID = data.public_id;

    axios
      .post(`/api/user/${session.user._id}`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        photoID: formData.photoID,
        password: formData.password,
        photoLink: formData.photoLink,
      })
      .then((res) => {
        if (res.status === 200) {
          setNotification({
            message: "Таны мэдээлэл амжилттай засагдлаа",
            success: true,
          });
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
      <Notification
        message={notification.message}
        success={notification.success}
      />

      <h2>Хэрэглэгчийн мэдээлэл</h2>

      {isFetched && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.imageContainer}>
            <div className={styles.image}>
              {formData.photoLink && (
                <Image
                  src={formData.photoLink}
                  layout="fill"
                  objectFit="cover"
                  alt="profile image"
                />
              )}

              {formData.photoUpload && (
                <Image
                  src={formData.preview}
                  layout="fill"
                  objectFit="cover"
                  alt="uploaded image"
                />
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
                  !formData.photoUpload
                    ? styles.labelFileSend
                    : `${styles.labelFileSend} ${styles.labelFileSendActive}`
                }
              >
                <StyledUploadIcon /> Зураг{" "}
                {(formData.photoUpload && "засах") || "өөрчлөх"}
              </label>

              <input
                className={styles.inputFileSend}
                type="file"
                name="photoUpload"
                id="photoUpload"
                accept="image/png, image/jpeg"
                onChange={handleFileInput}
              />
            </div>
          </div>
          <div className={styles.details}>
            <input
              type="text"
              id="firstName"
              name="firstName"
              onChange={handleInputFormData}
              defaultValue={formData.firstName}
              minLength={2}
              maxLength={35}
            />
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={handleInputFormData}
              defaultValue={formData.lastName}
              minLength={2}
              maxLength={35}
            />
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleInputFormData}
              defaultValue={formData.email}
              minLength={2}
            />
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              onChange={handleInputFormData}
              defaultValue={formData.phoneNumber}
              minLength={2}
            />
            <input
              type="password"
              id="password"
              onChange={handleInputFormData}
              name="password"
              placeholder="Нууц үг"
              minLength={8}
            />
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              placeholder="Нууц үгээ дахин хийнэ үү"
              minLength={8}
              onChange={handleInputFormData}
            />
            <button className={styles.button} type="submit">
              Мэдээлэл солих
            </button>
          </div>
        </form>
      )}
      <button
        type="button"
        className={styles.button}
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
