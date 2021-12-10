//Next, React (core node_modules) imports must be placed here
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { ArrowUpLeft } from "@styled-icons/bootstrap/ArrowUpLeft";
import ReactHtmlParser from "react-html-parser";
//import STORE from '@/store'

import styles from "./NewsCardLong.module.scss";

const StyledArrowIcon = styled(ArrowUpLeft)`
  width: 1em;
  transform: rotate(135deg);
  margin-left: 0.5em;
`;

const NewsSection = ({ title, src, description, date, link, ...props }) => {
  const dateObj = new Date(date);

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

  // function that truncates text by character length

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
    <div className={styles.container}>
      <Link href={link}>
        <div className={styles.headline}>
          <div className={styles.date}>
            <span>{dateObj.toLocaleDateString()}</span>
            <span>{dateDiff(date)}</span>
          </div>

          <h2>{title}</h2>

          <div className={styles.overlay}></div>

          <Image
            className={styles.imageContainer}
            src={`${src}`}
            layout="fill"
            objectFit="cover"
            alt="news image"
          />
        </div>
      </Link>

      <div className={styles.content}>
        <p className={styles.text}>
          {ReactHtmlParser(truncateText(description, 480))}
        </p>

        <Link href={link}>
          <a className={styles.link}>
            Дэлгэрэнгүй <StyledArrowIcon />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default NewsSection;
