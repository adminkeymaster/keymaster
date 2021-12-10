//Next, React (core node_modules) imports must be placed here
import Link from "next/link";
//import STORE from '@/store'

//import COMPONENT from '@/components'

import styles from "./CompetitionCard.module.scss";

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
