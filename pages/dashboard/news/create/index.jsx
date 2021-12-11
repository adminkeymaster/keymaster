import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import axios from "axios";
import { useState, useEffect } from "react";

import "react-quill/dist/quill.snow.css";

import styled from "styled-components";
import { Upload } from "@styled-icons/heroicons-outline/Upload";

import DashboardLayout from "@/layouts/Dashboard";

import Notification from "@/components/Notification";

import styles from "./CreateArticle.module.scss";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const StyledUploadIcon = styled(Upload)`
  width: 3.6rem;
  height: 3.6rem;
`;

const CreateArticle = () => {
  const router = useRouter();
  const [notification, setNotification] = useState({
    message: "",
    success: false,
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    photoUpload: null,
  });

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
  };

  const handleQuill = (value) => {
    setFormData({
      ...formData,
      description: value,
    });
  };

  const handleFileInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    for (const key in formData) {
      if (!formData[key]) {
        setNotification({
          ...notification,
          message: "Бүх талбаруудыг бөглөнө үү!",
          success: false,
        });
        return;
      }
      form.append(key, formData[key]);
    }

    axios
      .post("/api/news", form)
      .then((res) => {
        if (res.status === 200) {
          router.push(
            {
              pathname: "/dashboard/news",
              query: {
                success: true,
                message: "Мэдээ амжилттай нэмэгдлээ",
              },
            },
            "/dashboard/news"
          );
        }
      })
      .catch((err) => {
        setNotification({
          message: "Мэдээ нэмэхэд алдаа гарлаа.",
          success: false,
        });
        console.log("CreateArticle handleSubmit:", err);
      });
  };
  return (
    <main className={styles.container}>
      <Notification
        message={notification.message}
        success={notification.success}
      />
      <form className={styles.form}>
        <h1 className={styles.heading}>Мэдээ нэмэх</h1>

        <div className={styles.formGroup}>
          <label className={styles.inputLabel} htmlFor="title">
            Гарчиг
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className={styles.inputTitle}
            onChange={handleInputFormData}
            required
          />
        </div>

        <div className={styles.formGroupFile}>
          <label
            htmlFor="photoUpload"
            className={
              !formData.photoUpload
                ? styles.labelFileSend
                : `${styles.labelFileSend} ${styles.labelFileSendActive}`
            }
          >
            <StyledUploadIcon /> Зураг{" "}
            {(formData.photoUpload && "засах") || "оруулах"}
          </label>
          <button
            type="submit"
            className={styles.postButton}
            onClick={handleSubmit}
          >
            Нийтлэх
          </button>
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

        <ReactQuill
          className={styles.formEditor}
          theme="snow"
          value={formData.description}
          onChange={handleQuill}
        />
      </form>
    </main>
  );
};
CreateArticle.Layout = DashboardLayout;
export default CreateArticle;
