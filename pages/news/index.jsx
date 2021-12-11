//Next, React (core node_modules) imports must be placed here
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import LandingLayout from "@/layouts/Landing";

//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'
import NewsCardLong from "@/composites/NewsCardLong";

import styles from "./News.module.scss";

const NewsPage = (props) => {
  const [isFetched, setIsFetched] = useState(false);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get("/api/news", { signal: controller.signal })
      .then(({ data }) => {
        // Reverse the array so the newest news is first
        setNews(data.data.reverse());
        setIsFetched(true);
      })
      .catch((err) => {
        console.log("/news fetch aborted", err);
      });

    return () => controller.abort();
  }, []);

  return (
    <motion.main exit={{ opacity: 0 }}
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 1 }}
    className={styles.container}>
      {isFetched &&
        news.map((article) => {
          return (
            <NewsCardLong
              key={article._id}
              link={`/news/${article._id}`}
              date={article.date}
              src={article.photoLink}
              description={article.description}
              title={article.title}
            />
          );
        })}
    </motion.main>
  );
};

NewsPage.Layout = LandingLayout;

export default NewsPage;
