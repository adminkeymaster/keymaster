//Next, React (core node_modules) imports must be placed here
import Image from "next/image";
import styled from "styled-components";
import { Key } from "@styled-icons/boxicons-regular/Key";
import { Star } from "@styled-icons/bootstrap/Star";
import { User } from "@styled-icons/fa-solid/User";
import { useState, useEffect } from "react";
import axios from "axios";
//import STORE from '@/store'

//import COMPONENT from '@/components'

import styles from "./AthleteCard.module.scss";

const StyledUserIcon = styled(User)`
  width: 100%;
  height: 100%;
`;

const StyledKeyIcon = styled(Key)`
  transform: rotate(315deg);
  margin-right: 0.5em;
  height: 3.2rem;
`;

const StyledStarIcon = styled(Star)`
  margin-left: 0.5em;
  height: 2rem;
`;

const AthleteCard = ({
  src,
  name,
  lastCompetition,
  recFive,
  recSeven,
  recNine,
  ...props
}) => {
  const [isFetched, setIsFetched] = useState(false);
  const [athlete, setAthlete] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    axios
      .get("/api/topuser", { signal: signal })
      .then(({ data }) => {
        console.log(data.data);
        setAthlete(data.data);
        setIsFetched(true);
      })
      .catch((err) => {
        console.log("AthleteCard Fetch Aborted", err);
      });

    return () => controller.abort();
    const calculateAge = (birthdate) => {
      const today = new Date();
      const birthDate = new Date(birthdate);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        {(src && <Image src={src} layout="fill" objectFit="cover" alt="athlete profile" />) || (
          <StyledUserIcon />
        )}
      </div>
      <div className={styles.profile}>
        <span className={styles.profileName}>
          {(name && name) || "Хэрэглэгчийн нэр"}
        </span>
        <span className={styles.highlight}>Сүүлд оролцсон тэмцээн</span>
        <span>{(lastCompetition && lastCompetition) || "Тэмцээний нэр"}</span>
      </div>
      <div className={styles.record}>
        <span className={styles.recordHeader}>Хувийн үзүүлэлт</span>
        <div className={styles.row}>
          <span className={styles.col}>
            <StyledKeyIcon /> 5
          </span>
          <span className={styles.col}>
            <StyledKeyIcon /> 7
          </span>
          <span className={styles.col}>
            <StyledKeyIcon /> 9
          </span>
        </div>
        <div className={styles.row}>
          <span className={`${styles.col} ${styles.time}`}>
            {(recFive && recFive) || "-"}
          </span>
          <span className={`${styles.col} ${styles.time}`}>
            {(recSeven && recSeven) || "-"}
          </span>
          <span className={`${styles.col} ${styles.time}`}>
            {(recNine && recNine) || "-"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AthleteCard;
