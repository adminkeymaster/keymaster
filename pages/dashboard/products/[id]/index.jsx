//Next, React (core node_modules) imports must be placed here
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

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

import styles from "./Product.module.scss";

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
    productName: "",
    photoUpload: null,
    price: "",
    color: "",
    hexColor: "",
    type: "",
    photoLink: "",
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    const controller = new AbortController();

    axios
      .get(`/api/product/${id}`, { signal: controller.signal })
      .then(({ data }) => {
        console.log(data);
        setFormData({
          productName: data.data.productName,
          photoLink: data.data.photoLink,
          productPrice: data.data.productPrice,
          color: data.data.color,
          hexColor: data.data.hexColor,
          type: data.data.type,
        });
        setDescription(data.data.description);
        setIsFetched(true);
      })
      .catch((err) => {
        console.log("/dashboard/product/[id] fetch aborted", err);
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

    for (const key in formData) {
      form.append(key, formData[key]);
    }

    axios.post(`/api/product/${id}`, form);
  };

  return (
    <main className={styles.container}>
      <form className={styles.form}>
        <h1 className={styles.heading}>Бүтээгдэхүүн Засах</h1>

        <div className={styles.formGroup}>
          <label className={styles.inputLabel} htmlFor="productName">
            Бүтээгдэхүүний нэр
          </label>
          <input
            type="text"
            name="productName"
            id="productName"
            defaultValue={formData.productName}
            className={styles.inputTitle}
            onChange={handleInputFormData}
            required
          />
        </div>

        <div className={styles.imageContainer}>
          {isFetched && formData.photoLink && (
            <Image src={formData.photoLink} layout="fill" objectFit="cover" />
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

        <div className={styles.formGroup}>
          <label className={styles.inputLabel} htmlFor="hexColor">
            Бүтээгдэхүүний өнгө
          </label>
          <div className={styles.inputColorContainer}>
            <input
              type="text"
              name="color"
              id="color"
              defaultValue={formData.color}
              className={styles.inputColor}
              onChange={handleInputFormData}
              required
            />
            <input
              type="color"
              name="hexColor"
              id="hexColor"
              defaultValue={formData.hexColor}
              className={styles.inputHexColor}
              onChange={handleInputFormData}
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.inputLabel} htmlFor="type">
            Бүтээгдэхүүний төрөл
          </label>
          <div className={styles.inputColorContainer}>
            <input
              type="text"
              name="type"
              id="type"
              defaultValue={formData.type}
              className={styles.input}
              onChange={handleInputFormData}
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.inputLabel} htmlFor="productPrice">
            Бүтээгдэхүүний үнэ (₮)
          </label>
          <div className={styles.inputColorContainer}>
            <input
              type="text"
              name="productPrice"
              id="productPrice"
              defaultValue={formData.productPrice}
              className={styles.input}
              onChange={handleInputFormData}
              required
            />
          </div>
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
      </form>
    </main>
  );
};

EditArticle.Layout = DashboardLayout;

export default EditArticle;
