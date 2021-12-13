//Next, React (core node_modules) imports must be placed here
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { PermMedia } from "@styled-icons/material-outlined/PermMedia";

//import STORE from '@/store'

import styles from "./NewsCard.module.scss";

const StyledMediaIcon = styled(PermMedia)`
  width: 32%;
  height: 32%;
`;

const NewsComp = ({ title, description, src, date, id, ...props }) => {
  const dateDiff = (givenDate) => {
    const dateNow = new Date();
    const dateGiven = new Date(givenDate);
    const diff = dateNow - dateGiven;
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diff / (1000 * 60));
    const diffSeconds = Math.floor(diff / 1000);

    if (diffDays > 0) {
      return `${diffDays} өдрийн өмнө`;
    }
    if (diffHours > 0) {
      return `${diffHours} цагийн өмнө`;
    }
    if (diffMinutes > 0) {
      return `${diffMinutes} минутын өмнө`;
    }
    if (diffSeconds > 0) {
      return `${diffSeconds} секундын өмнө`;
    }
  };

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
    <Link href={`/news/${id}`}>
      <a className={styles.container}>
        <div className={styles.imageContainer}>
          {(src && (
            <Image layout="fill" src={`${src}`} alt={title} objectFit="cover" />
          )) || <StyledMediaIcon />}
        </div>
        <h3 className={styles.heading} data-date={dateDiff(date)}>
          {title}
        </h3>
        <p>{truncateText(description, 100)}</p>
      </a>
    </Link>
  );
};

export default NewsComp;
