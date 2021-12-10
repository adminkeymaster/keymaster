//Next, React (core node_modules) imports must be placed here
import styled from "styled-components";
import { Upload } from "@styled-icons/heroicons-outline/Upload";
//import STORE from '@/store'

import styles from "./SendVideo.module.scss";

const StyledUploadIcon = styled(Upload)`
  width: 2.4rem;
  height: 2.4rem;
`;

const SendVideo = (props) => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2>Бичлэг илгээх</h2>
        <p>Lorem ipsum dolor nde impedit sapiente laborum!</p>
        <div className={styles.inputContainer}>
          {/* <label>Хугацаа</label> */}
          <input type="text" placeholder="Хугацаа" />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.labelFileSend} htmlFor="video-upload">
            <StyledUploadIcon />
            <span className={styles.labelText}>Файл сонгох</span>
            <input
              className={styles.inputFileSend}
              id="video-upload"
              type="file"
              accept="video/mp4, video/x-m4v, video/*"
            />
          </label>
          <button className={styles.button}>Илгээх</button>
        </div>
      </form>
    </div>
  );
};

export default SendVideo;
