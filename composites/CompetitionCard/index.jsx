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

const CompetitionCard = ({
  name,
  startDate,
  endDate,
  location,
  newsLink,
  ...props
}) => {
  return (
    <Link href={newsLink}>
      <a className={styles.container}>
        <span className={`${styles.tableBodyCol} ${styles.nameCol}`}>
          {name}
        </span>
        <span className={`${styles.tableBodyCol} ${styles.startCol}`}>
          {startDate}
        </span>
        <span className={`${styles.tableBodyCol} ${styles.endCol}`}>
          {endDate}
        </span>
        <span className={`${styles.tableBodyCol} ${styles.locationCol}`}>
          {location}
        </span>
      </a>
    </Link>
  );
};

export default CompetitionCard;
