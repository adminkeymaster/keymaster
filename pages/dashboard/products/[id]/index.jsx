//Next, React (core node_modules) imports must be placed here
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect, Fragment } from "react";
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
import Notification from "@/components/Notification";

import styles from "./Product.module.scss";

const StyledCloseIcon = styled(Close)`
  width: 3.6rem;
  height: 3.6rem;
`;

const StyledUploadIcon = styled(Upload)`
  width: 3.6rem;
  height: 3.6rem;
`;

const EditProduct = () => {
  const { data: session, status } = useSession();

  const [currentColor, setCurrentColor] = useState("#000000");
  const [colorInputs, setColorInputs] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [isReadyToSend, setIsReadyToSend] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    success: false,
  });
  const router = useRouter();
  const { id } = router.query;
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

  useEffect(() => {
    if (!id) {
      return;
    }

    const controller = new AbortController();

    axios
      .get(`/api/product/${id}`, { signal: controller.signal })
      .then(({ data }) => {
        setFormData({
          productName: data.data.productName,
          photoIDs: data.data.photoIDs,
          photoLinks: data.data.photoLinks,
          productPrice: data.data.productPrice,
          description: data.data.description,
          hexColor: [],
          type: data.data.type,
        });
        setIsFetched(true);
      })
      .catch((err) => {
        console.log("/dashboard/product/[id] fetch aborted", err);
      });

    return () => controller.abort();
  }, [id]);

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
    setColorInputs([
      ...colorInputs,
      <input
        type="color"
        name="hexColor"
        id="hexColor"
        defaultValue={formData.hexColor[0]}
        className={styles.inputHexColor}
        onChange={handleColorChange}
        key={colorInputs.length}
        required
      />,
    ]);
  }, []);
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
      .post(`/api/product/${id}`, {
        productName: formData.productName,
        hexColor: formData.hexColor,
        type: formData.type,
        description: formData.description,
        photoLinks: formData.photoLinks,
        photoIDs: formData.photoIDs,
        productPrice: formData.productPrice,
      })
      .then((res) => {
        if (res.status === 200) {
          router.push(
            {
              pathname: "/dashboard/products",
              query: {
                success: true,
                message: "Бүтээгдэхүүн амжилттай засагдлаа",
              },
            },
            "/dashboard/products"
          );
        }
      })
      .catch((err) => {
        setNotification({
          message: "Бүтээгдэхүүнийг засах явцад алдаа гарлаа",
          success: false,
        });
        console.log("Edit Product handleSubmit:", err);
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

  const handleColorAdd = (e) => {
    setColorInputs([
      ...colorInputs,
      <input
        type="color"
        name="hexColor"
        id="hexColor"
        value={currentColor}
        className={styles.inputHexColor}
        key={colorInputs.length}
        readOnly
        onClick={(e) => {
          e.preventDefault();
        }}
      />,
    ]);
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

    if (!formData.photoUpload) {
      setIsReadyToSend(true);

      return;
    }

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
          {formData.photoLinks[0] && (
            <Image
              src={formData.photoLinks[0]}
              layout="fill"
              objectFit="cover"
              alt="article image"
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
            {colorInputs.map((input, index) => {
              return <Fragment key={index}>{input}</Fragment>;
            })}
            <button type="button" onClick={handleColorAdd}>
              +
            </button>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.inputLabel} htmlFor="description">
            Бүтээгдэхүүний тайлбар
          </label>
          <div className={styles.inputColorContainer}>
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

EditProduct.Layout = DashboardLayout;

export default EditProduct;
