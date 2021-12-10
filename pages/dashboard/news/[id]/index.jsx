//Next, React (core node_modules) imports must be placed here
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import "react-quill/dist/quill.snow.css";

import styled from "styled-components";
import { Close } from "@styled-icons/evaicons-solid/Close";
import { Upload } from "@styled-icons/heroicons-outline/Upload";
//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import DashboardLayout from "@/layouts/Dashboard";

//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from "./Article.module.scss";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

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
  const [description, setDescription] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    photoUpload: null,
  });

  const [preview, setPreview] = useState(null);

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
          photolink: data.data.photoLink,
        });
        setDescription(data.data.description);
        setIsFetched(true);
      })
      .catch((err) => {
        console.log("/dashboard/news/[id] fetch aborted", err);
      });

    return () => controller.abort();
  }, [id]);

  const handleInputFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleFileInput = (e) => {
    const objectURL = URL.createObjectURL(e.target.files[0]);

    setPreview(objectURL);

    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });

    return () => URL.revokeObjectURL(objectUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", description);
    form.append("photoUpload", formData.photoUpload);

    axios
      .post(`/api/news/${id}`, form)
      .then((res) => {
        if (res.status === 200) {
          router.push("/dashboard/news");
        }
      })
      .catch((err) => {
        console.log("Edit Article handleSubmit", err);
      });
  };

  return (
    <main className={styles.container}>
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
          {isFetched && formData.photolink && (
            <Image src={formData.photolink} layout="fill" objectFit="cover" />
          )}

          {formData.photoUpload && (
            <Image src={preview} layout="fill" objectFit="cover" />
          )}

          {formData.photoUpload && (
            <button
              className={styles.reset}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setPreview(null);
                setFormData({
                  ...formData,
                  photoUpload: null,
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
            required
          />
        </div>

        <div className={styles.formGroupFile}>
          <button
            type="submit"
            className={styles.postButton}
            onClick={handleSubmit}
          >
            Засах
          </button>
        </div>

        <ReactQuill
          className={styles.formEditor}
          theme="snow"
          value={description}
          onChange={setDescription}
        />
      </form>
    </main>
  );
};

EditArticle.Layout = DashboardLayout;

export default EditArticle;
