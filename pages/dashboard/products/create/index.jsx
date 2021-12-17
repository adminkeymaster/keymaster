//Next, React (core node_modules) imports must be placed here
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useEffect, Fragment } from "react";
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
import Notification from "@/components/Notification";

import styles from "./CreateProduct.module.scss";

const StyledCloseIcon = styled(Close)`
  width: 3.6rem;
  height: 3.6rem;
`;

const StyledUploadIcon = styled(Upload)`
  width: 3.6rem;
  height: 3.6rem;
`;

const CreateProductPage = () => {
  const { data: session, status } = useSession();

  const router = useRouter();
  const [currentColor, setCurrentColor] = useState("#000000");
  const [isReadyToSend, setIsReadyToSend] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    photoUpload: null,
    productPrice: "",
    hexColor: [],
    type: "",
    preview: "",
    description: "",
    photoLinks: [],
    photoIDs: [],
  });
  const [notification, setNotification] = useState({
    message: "",
    success: false,
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

  useEffect(() => {
    if (!isReadyToSend) {
      return;
    }

    for (const key in formData) {
      if (!formData[key]) {
        setNotification({
          message: "Бүх талбаруудыг бөглөнө үү!",
          success: false,
        });
        return;
      }
    }

    axios
      .post("/api/product/", formData)
      .then((res) => {
        if (res.status === 200) {
          router.push(
            {
              pathname: "/dashboard/products",
              query: {
                success: true,
                message: "Бүтээгдэхүүн амжилттай нэмэгдлээ",
              },
            },
            "/dashboard/products"
          );
        }
      })
      .catch((err) => {
        console.log("CreateProductPage handleSubmit", err);
        setNotification({
          ...notification,
          message: "Бүтээгдэхүүн үүсгэх явцад алдаа гарлаа",
          success: false,
        });
      });

    setIsReadyToSend(false);
  }, [isReadyToSend, formData]);

  if (status === "loading") return null;
  if (!session || !session.user.isAdmin) return null;

  const handleInputFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleColorChange = (e) => {
    setCurrentColor(e.target.value);
  };

  const handleDeleteColor = (e) => {
    setFormData({
      ...formData,
      hexColor: formData.hexColor.filter(
        (color) => color !== e.currentTarget.dataset.color
      ),
    });
  };

  const handleColorAdd = (e) => {
    setFormData({
      ...formData,
      hexColor: [...formData.hexColor, currentColor],
    });
  };

  const handleFileInput = async (e) => {
    const objectURL = URL.createObjectURL(e.target.files[0]);

    const files = await Promise.all(
      [...e.target.files].map(async (file) => {
        return file;
      })
    );

    await setFormData({
      ...formData,
      preview: objectURL,
      photoUpload: [...files],
    });

    e.target.value = null;

    return () => URL.revokeObjectURL(objectUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Promise.all(
      formData.photoUpload.map(async (imageUpload) => {
        const imageForm = new FormData();
        imageForm.append("upload_preset", "keymaster");
        imageForm.append("file", imageUpload);

        const photoLinkObject = await axios
          .post(
            `https://api.cloudinary.com/v1_1/keymaster123/image/upload`,
            imageForm
          )
          .then((res) => {
            if (res.status === 200) {
              return {
                link: res.data.secure_url,
                id: res.data.public_id,
              };
            }
          })
          .catch((err) => {
            console.log(err);
          });

        return photoLinkObject;
      })
    ).then((photoLinkObjects) => {
      const photoLinks = photoLinkObjects.map((photoLinkObject) => {
        return photoLinkObject.link;
      });

      const photoIDs = photoLinkObjects.map((photoLinkObject) => {
        return photoLinkObject.id;
      });

      setFormData({
        ...formData,
        photoLinks: photoLinks,
        photoIDs: photoIDs,
      });

      setIsReadyToSend(true);
    });
  };

  return (
    <main className={styles.container}>
      <Notification
        message={notification.message}
        success={notification.success}
      />
      <form className={styles.form}>
        <h1 className={styles.heading}>Бүтээгдэхүүн Нэмэх</h1>

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
            multiple
            onChange={handleFileInput}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.inputLabel} htmlFor="hexColor">
            Бүтээгдэхүүний өнгө
          </label>
          <div className={styles.inputColorContainer}>
            {formData.hexColor.length > 0 &&
              formData.hexColor.map((input, index) => {
                return (
                  <button
                    type="button"
                    onClick={handleDeleteColor}
                    data-color={input}
                    key={index}
                    style={{ backgroundColor: input }}
                    className={`${styles.inputHexColorAdded}`}
                  ></button>
                );
              })}
          </div>
          <input
            type="color"
            name="hexColor"
            id="hexColor"
            defaultValue={currentColor}
            className={styles.inputHexColor}
            onChange={handleColorChange}
            required
          />
          <button
            className={styles.hexColorAddButton}
            type="button"
            onClick={handleColorAdd}
          >
            +
          </button>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.inputLabel} htmlFor="type">
            Бүтээгдэхүүний төрөл
          </label>
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

        <div className={styles.formGroup}>
          <label className={styles.inputLabel} htmlFor="description">
            Бүтээгдэхүүний тайлбар
          </label>
          <input
            type="text"
            name="description"
            id="description"
            defaultValue={formData.description}
            className={styles.input}
            onChange={handleInputFormData}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.inputLabel} htmlFor="productPrice">
            Бүтээгдэхүүний үнэ (₮)
          </label>
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

        <div className={styles.formGroupFile}>
          <button
            type="submit"
            className={styles.postButton}
            onClick={handleSubmit}
          >
            Нэмэх
          </button>
        </div>
      </form>
    </main>
  );
};

CreateProductPage.Layout = DashboardLayout;

export default CreateProductPage;
