//Next, React (core node_modules) imports must be placed here
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

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

import styles from './CreateProduct.module.scss';

const StyledCloseIcon = styled(Close)`
  width: 3.6rem;
  height: 3.6rem;
`;

const StyledUploadIcon = styled(Upload)`
  width: 3.6rem;
  height: 3.6rem;
`;

const CreateProductPage = () => {
  const router = useRouter();
  const [currentColor, setCurrentColor] = useState('#000000');
  const [colorInputs, setColorInputs] = useState([]);
  const [formData, setFormData] = useState({
    productName: '',
    photoUpload: null,
    productPrice: '',
    hexColor: [],
    type: '',
    preview: '',
  });
  const [notification, setNotification] = useState({
    message: '',
    success: false,
  });

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

  useEffect(() => {
    setColorInputs([
      ...colorInputs,
      <input
        type="color"
        name="hexColor"
        id="hexColor"
        defaultValue={currentColor}
        className={styles.inputHexColor}
        onChange={handleColorChange}
        key={colorInputs.length}
        required
      />,
    ]);
  }, []);

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

    const formEvent = e.currentTarget;

    const form = new FormData();
    const imageForm = new FormData();

    // const fileInput = Array.from(formEvent.elements).find(({ name }) => name === 'photoUpload');
    // console.log(fileInput);

    console.log(formData);

    for (const key in formData) {
      if (!formData[key]) {
        setNotification({
          message: 'Бүх талбаруудыг бөглөнө үү!',
          success: false,
        });
        return;
      }

      if (key === 'photoUpload') {
        console.log(key);
        formData[key].forEach((file, index) => {
          form.append(index, file);
          imageForm.append(index, file);
        });
      }

      form.append(key, formData[key]);
    }

    axios
      .post('/api/product/', form)
      .then((res) => {
        if (res.status === 200) {
          router.push(
            {
              pathname: '/dashboard/products',
              query: {
                success: true,
                message: 'Бүтээгдэхүүн амжилттай нэмэгдлээ',
              },
            },
            '/dashboard/products'
          );
        }
      })
      .catch((err) => {
        console.log('CreateProductPage handleSubmit', err);
        setNotification({
          ...notification,
          message: 'Бүтээгдэхүүн үүсгэх явцад алдаа гарлаа',
          success: false,
        });
      });
  };

  return (
    <main className={styles.container}>
      <Notification message={notification.message} success={notification.success} />
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
          <button type="submit" className={styles.postButton} onClick={handleSubmit}>
            Засах
          </button>
        </div>
      </form>
    </main>
  );
};

CreateProductPage.Layout = DashboardLayout;

export default CreateProductPage;
