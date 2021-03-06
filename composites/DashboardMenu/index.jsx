import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./DashboardMenu.module.scss";

const DashboardMenu = (props) => {
  const { route } = useRouter();

  return (
    <ul className={styles.container}>
      <li>
        <Link href="/dashboard/news">
          <a
            className={
              route == "/dashboard/news"
                ? `${styles.isActive} ${styles.link}`
                : styles.link
            }
            onClick={props.onClick}
          >
            Мэдээ
          </a>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/products">
          <a
            className={
              route == "/dashboard/products"
                ? `${styles.isActive} ${styles.link}`
                : styles.link
            }
            onClick={props.onClick}
          >
            Бүтээгдэхүүн
          </a>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/products/request">
          <a
            className={
              route == "/dashboard/products/request"
                ? `${styles.isActive} ${styles.link}`
                : styles.link
            }
            onClick={props.onClick}
          >
            Захиалга
          </a>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/competitions">
          <a
            className={
              route == "/dashboard/competitions"
                ? `${styles.isActive} ${styles.link}`
                : styles.link
            }
            onClick={props.onClick}
          >
            Тэмцээн
          </a>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/record-history">
          <a
            className={
              route == "/dashboard/record-history"
                ? `${styles.isActive} ${styles.link}`
                : styles.link
            }
            onClick={props.onClick}
          >
            Тэмцээний түүх
          </a>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/record-request">
          <a
            className={
              route == "/dashboard/record-request"
                ? `${styles.isActive} ${styles.link}`
                : styles.link
            }
            onClick={props.onClick}
          >
            Рекорд Хүсэлт
          </a>
        </Link>
      </li>
      <li>
        <Link href="/dashboard/contact-request">
          <a
            className={
              route == "/dashboard/contact-request"
                ? `${styles.isActive} ${styles.link}`
                : styles.link
            }
            onClick={props.onClick}
          >
            Хэрэглэгчийн хүсэлт
          </a>
        </Link>
      </li>
    </ul>
  );
};

export default DashboardMenu;
