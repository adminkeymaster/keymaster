import Image from "next/image"
import styled from "styled-components"
import { useState } from "react";
import { Timer } from "styled-icons/boxicons-regular"
import LandingLayout from "@/layouts/Landing";
import Header from "@/views/Products/Header";
import styles from "./Record.module.scss"
const StyledTimer = styled(Timer)`
  width: 2rem;
  height: 2rem;
`;

const RecordPage = (props) => {
  const [compRecord, setCompRecord] = useState(true);
  const handleRecord = () => {
    setCompRecord(!compRecord);
  };
  return (
    <main
      className={styles.container}>
      <Header />
      <div className={styles.userHeading}>
        <div className={styles.userProfile}>
          <div className={styles.userImage}>
            <Image src="/badral.png" layout="fill" objectFit="contain" alt="User Profile" />
          </div>
        </div>
        <h2 className={styles.name}>Dulguun</h2>
        <p className={styles.age}>Нас 15</p>
      </div>
      <div className={styles.recordHistory}>
        <div className={styles.recordHeading}>Миний Түүх</div>
        <div className={styles.records}>
          <div className={styles.recordContent}>
            <div className={styles.recordType}>
              5 түлхүүрт
            </div>
            <div className={styles.recordTime}><StyledTimer /> 58.16 секүнд</div>
          </div>
          <div className={styles.recordContent}>
            <div className={styles.recordType}>
              7 түлхүүрт
            </div>
            <div className={styles.recordTime}><StyledTimer /> 58.16 секүнд</div>
          </div>
          <div className={styles.recordContent}>
            <div className={styles.recordType}>
              7 түлхүүрт
            </div>
            <div className={styles.recordTime}><StyledTimer /> 58.16 секүнд</div>
          </div>
          <div className={styles.recordContent}>
            <div className={styles.recordType}>
              7 түлхүүрт
            </div>
            <div className={styles.recordTime}><StyledTimer /> 58.16 секүнд</div>
          </div>
          <div className={styles.recordContent}>
            <div className={styles.recordType}>
              asdadasdsdsadasadasdasdas
            </div>
            <div className={styles.recordTime}><StyledTimer /> 58.16 секүнд</div>
          </div>
        </div>
      </div>
      <div className={styles.compHistory}>
        <div className={styles.recordHeading}>Миний оролцсон тэмцээнүүд</div>
        <div className={styles.compList}>
          <div className={styles.comp} handler={handleRecord}>
            <p>Кимастер Хотын аварга шалгаруулах тэмцээн</p>
            <div className={compRecord ? styles.compRecord : styles.closed}>
              <h2>compinfo</h2>
            </div>
          </div>
          <div className={styles.comp}>
            <p>Кимастер Хотын аварга шалгаруулах тэмцээн</p>
          </div>
          <div className={styles.comp}>
            <p>Кимастер Хотын аварга шалгаруулах тэмцээн</p>
          </div>
        </div>
      </div>
    </main>
  );
};

RecordPage.Layout = LandingLayout;

export default RecordPage;
