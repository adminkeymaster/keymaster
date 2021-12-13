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
  const truncateText = (text, length) => {
    const textContent = text
      .replace(/<h1[^>]*>.*?<\/h1>/g, "")
      .replace(/<h2[^>]*>.*?<\/h2>/g, "")
      .replace(/<h3[^>]*>.*?<\/h3>/g, "")
      .replace(/<h4[^>]*>.*?<\/h4>/g, "")
      .replace(/<h5[^>]*>.*?<\/h5>/g, "")
      .replace(/<h6[^>]*>.*?<\/h6>/g, "")
      .replace(/<ul[^>]*>.*?<\/ul>/g, "")
      .replace(/<ol[^>]*>.*?<\/ol>/g, "")
      .replace(/<\/?[^>]+(>|$)/g, "");

    if (!length) {
      return textContent;
    }

    if (textContent.length > length) {
      return `${textContent.substring(0, length)}...`;
    } else {
      return textContent;
    }
  };

  return (
    <Link href={newsLink}>
      <a className={styles.container}>
        <span className={`${styles.tableBodyCol} ${styles.nameCol}`}>
          {truncateText(name, 100)}
        </span>
        <span className={`${styles.tableBodyCol} ${styles.locationCol}`}>
          {location}
        </span>
        <span className={`${styles.tableBodyCol} ${styles.startCol}`}>
          {startDate}
        </span>
        <span className={`${styles.tableBodyCol} ${styles.endCol}`}>
          {endDate}
        </span>
      </a>
    </Link>
  );
};

export default CompetitionCard;
