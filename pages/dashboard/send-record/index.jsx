//Next, React (core node_modules) imports must be placed here
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
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

import styles from "./SendRecord.module.scss";

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
  const [preview, setPreview] = useState(null);
  const [types, setTypes] = useState([]);
  const [formData, setFormData] = useState({
    videoUpload: "",
    keymasterType: "",
    time: "",
  });

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get("/api/keymasterTypes", { signal: controller.signal })
      .then(({ data }) => {
        setTypes(data.data);
        setFormData({ ...formData, keymasterType: data.data[0].keymasterType });
        setIsFetched(true);
      })
      .catch((err) => {
        console.log("/dashboard/products fetch aborted", err);
      });

    return () => controller.abort();
  }, []);

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

    e.target.value = null;

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("userID", "61b302d67f6a44f925f3a7d9");

    // append all the keys and values from the formData object
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    axios
      .post("/api/record-request", form)
      .then((res) => {
        if (res.status === 200) {
          router.push("/");
        }
      })
      .catch((err) => {
        console.log("SendRecordPage handleSubmit:", err);
      });
  };
  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <div className={styles.videoContainer}>
            {formData.videoUpload && (
              <video controls>
                <source src={preview} type="video/mp4" />
              </video>
            )}

            {formData.videoUpload && (
              <button
                className={styles.reset}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setPreview(null);
                  setFormData({
                    ...formData,
                    videoUpload: null,
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
                !formData.videoUpload
                  ? styles.labelFileSend
                  : `${styles.labelFileSend} ${styles.labelFileSendActive}`
              }
            >
              <StyledUploadIcon /> Бичлэг{" "}
              {(formData.videoUpload && "засах") || "оруулах"}
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
              required
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
            Цаг
          </label>
          <input
            className={styles.input}
            type="number"
            step="0.01"
            name="time"
            id="time"
            onChange={handleInputFormData}
            required
          />
        </div>

        <button className={styles.postButton}>Илгээх</button>
      </form>
    </main>
  );
};
SendRecordPage.Layout = DashboardLayout;
export default SendRecordPage;
