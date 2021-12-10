//Next, React (core node_modules) imports must be placed here
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { Trophy } from "@styled-icons/bootstrap/Trophy";
import { PermMedia } from "@styled-icons/material-outlined/PermMedia";
//import STORE from '@/store'

//import COMPONENT from '@/components'
import PrimaryLink from "@/components/PrimaryLink";

import styles from "./CompetitionCard.module.scss";

const StyledTrophyIcon = styled(Trophy)`
  margin-left: 0.5em;
  height: 2rem;
`;

const StyledMediaIcon = styled(PermMedia)`
  width: 32%;
  height: 32%;
`;

const CompetitionCard = ({name, date, location, ...props }) => {
  return (
    <div className={styles.container}>
        <p className={`${styles.tableBodyCol} ${styles.nameCol}`}>
          {(name && name) || "Competition Name"}
        </p>
        <p className={`${styles.tableBodyCol} ${styles.startCol}`}>
          {(date && date) || "Эхлэх: 2022-01-15  Дуусах: 2022-01-30"}
        </p>
        <p className={`${styles.tableBodyCol} ${styles.endCol}`}>
          {(date && date) || "Эхлэх: 2022-01-15  Дуусах: 2022-01-30"}
        </p>
        <p className={`${styles.tableBodyCol} ${styles.locationCol}`}>
          {(location && location) || "Байршил: ХУД, ЧӨЧ, 15р хороо 6а-17 тоот"}
        </p>
    </div>
  );
};

export default CompetitionCard;
