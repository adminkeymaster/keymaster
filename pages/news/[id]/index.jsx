//Next, React (core node_modules) imports must be placed here
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import LandingLayout from "@/layouts/Landing";

//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from "./Article.module.scss";

const Article = () => {
  const [isFetched, setIsFetched] = useState(false);
  const [article, setArticle] = useState();
  const router = useRouter();
  const ref = useRef();
  const { scrollY } = useViewportScroll();
  const y = useTransform(scrollY, [0, 100], [0, -100]);

  const { id } = router.query;

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

  useEffect(() => {
    if (!id) {
      return;
    }

    const controller = new AbortController();

    axios
      .get(`/api/news/${id}`, { signal: controller.signal })
      .then(({ data }) => {
        setArticle(data.data);
        setIsFetched(true);
      })
      .catch((error) => {
        console.log("/news/[id] fetch aborted", error);
      });

    return () => controller.abort();
  }, [id]);

  return (
    <main className={styles.container}>
      <motion.div className={styles.imageContainer} ref={ref} style={{ y: y }}>
        {article?.photoLink && (
          <Image
            src={article?.photoLink}
            layout="fill"
            objectFit="cover"
            alt="article image"
          />
        )}
        <div className={styles.overlay}></div>
        <h1 className={styles.heading} data-date={dateDiff(article?.date)}>
          {article?.title}
        </h1>
      </motion.div>
      <article className={styles.content}>
        {ReactHtmlParser(article?.description)}
      </article>
    </main>
  );
};

Article.Layout = LandingLayout;

export default Article;
