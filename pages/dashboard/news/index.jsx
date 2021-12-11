//Next, React (core node_modules) imports must be placed here
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import DashboardLayout from "@/layouts/Dashboard";
//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'
import Notification from "@/components/Notification";

import styles from "./News.module.scss";

const DashboardNews = (props) => {
  const router = useRouter();
  const { query } = router;
  const [isFetched, setIsFetched] = useState(false);
  const [news, setNews] = useState([]);
  const [notification, setNotification] = useState({
    message: "",
    success: false,
  });

  useEffect(() => {
    if (query) {
      setNotification({
        ...notification,
        message: query.message,
        success: query.success,
      });
    }

    const controller = new AbortController();
    axios
      .get("/api/news", { signal: controller.signal })
      .then(({ data }) => {
        // Reverse the array so the newest news is first
        setNews(data.data.reverse());
        setIsFetched(true);
      })
      .catch((err) => {
        console.log("/dashboard/news fetch aborted", err);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!notification.message) return;

    const timer = setTimeout(() => {
      setNotification({
        message: "",
        success: false,
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification]);

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

  const handleDelete = (e) => {
    axios
      .delete(`/api/news/${e.target.id}`)
      .then(() => {
        setNews(news.filter((article) => article._id !== e.target.id));
        setNotification({
          ...notification,
          message: "Мэдээ амжилттай устгагдлаа.",
          success: true,
        });
      })
      .catch((err) => {
        setNotification({
          ...notification,
          message: "Мэдээ устгахад алдаа гарлаа",
          success: false,
        });
        console.log("/dashboard/news handleDelete:", err);
      });
  };

  return (
    <main className={styles.container}>
      <Notification
        message={notification.message}
        success={notification.success}
      />
      <div className={styles.headingContainer}>
        <h1 className={styles.heading}>Мэдээ</h1>
        <Link href="/dashboard/news/create">
          <a className={styles.link}>Мэдээ Нэмэх</a>
        </Link>
      </div>
      <div className={styles.table}>
        <div className={styles.tableHead}>
          <div className={`${styles.tableHeadCol} ${styles.tableImage}`}>
            Зураг
          </div>
          <div className={`${styles.tableHeadCol} ${styles.tableTitle}`}>
            Гарчиг
          </div>

          <div className={`${styles.tableHeadCol} ${styles.tableDescription}`}>
            Мэдээ
          </div>
          <div
            className={`${styles.tableHeadCol} ${styles.tableLinkContainer}`}
          >
            Үзэх
          </div>

          <div className={`${styles.tableHeadCol} ${styles.tableDate}`}>
            Огноо
          </div>

          <div className={`${styles.tableHeadCol} ${styles.tableAction}`}>
            Засах
          </div>

          <div className={`${styles.tableBodyCol} ${styles.tableAction}`}>
            Устгах
          </div>
        </div>

        <div className={styles.tableBody}>
          {isFetched &&
            news.map((article) => {
              const formattedDate = new Date(article.date).toLocaleDateString();
              return (
                <div className={styles.tableRow} key={article._id}>
                  <div
                    className={`${styles.tableBodyCol} ${styles.tableImage}`}
                  >
                    <Image
                      src={article.photoLink}
                      alt={article.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div
                    className={`${styles.tableBodyCol} ${styles.tableTitle}`}
                  >
                    {article.title}
                  </div>

                  <div
                    className={`${styles.tableBodyCol} ${styles.tableDescription}`}
                  >
                    {truncateText(article.description, 82)}
                  </div>
                  <div
                    className={`${styles.tableBodyCol} ${styles.tableLinkContainer}`}
                  >
                    <Link href={`/news/${article._id}`}>
                      <a className={styles.tableLink}>Үзэх</a>
                    </Link>
                  </div>

                  <div className={`${styles.tableBodyCol} ${styles.tableDate}`}>
                    {formattedDate}
                  </div>

                  <div
                    className={`${styles.tableBodyCol} ${styles.tableAction}`}
                  >
                    <Link href={`/dashboard/news/${article._id}`}>
                      <a className={styles.tableLink}>Засах</a>
                    </Link>
                  </div>

                  <div
                    className={`${styles.tableBodyCol} ${styles.tableAction}`}
                  >
                    <button
                      className={styles.tableButton}
                      id={article._id}
                      onClick={handleDelete}
                    >
                      Устгах
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </main>
  );
};
DashboardNews.Layout = DashboardLayout;
export default DashboardNews;
