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

const AthleteCard = () => {
  const [isFetched, setIsFetched] = useState(false);
  const [athlete, setAthlete] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    axios
      .get("/api/topuser", { signal: signal })
      .then(({ data }) => {
        console.log(data.data);
        setAthlete({
          name: `${data.data.firstName} ${data.data.lastName}`,
          photoLink: data.data.photoLink,
          recFive: data.data.record[0].time,
          recSeven: data.data.record[1].time,
          recNine: data.data.record[2].time,
          lastCompetition: data.data.lastComp[0].description,
        });
        setIsFetched(true);
      })
      .catch((err) => {
        console.log("AthleteCard Fetch Aborted", err);
      });

    return () => controller.abort();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        {(athlete.photoLink && <Image src={athlete.photoLink} layout="fill" objectFit="cover" alt="athlete profile" />) || (
          <StyledUserIcon />
        )}
      </div>
      <div className={styles.profile}>
        <span className={styles.profileName}>
          {(isFetched && athlete.name) || "Хэрэглэгчийн нэр"}
        </span>
        <span className={styles.highlight}>Сүүлд оролцсон тэмцээн</span>
        <span>{(isFetched && athlete.lastCompetition) || "Тэмцээний нэр"}</span>
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
            {(isFetched && athlete.recFive) || "-"}
          </span>
          <span className={`${styles.col} ${styles.time}`}>
            {(isFetched && athlete.recSeven) || "-"}
          </span>
          <span className={`${styles.col} ${styles.time}`}>
            {(isFetched && athlete.recNine) || "-"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AthleteCard;
