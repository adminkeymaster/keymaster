import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react"


import { useContext } from "react";

import ActiveAnchorContext from "@/store/ActiveAnchor";

import styles from "./DashboardMenu.module.scss";

const DashboardMenu = (props) => {
  const { route } = useRouter();
  const { activeAnchor } = useContext(ActiveAnchorContext);
  const { data: session, status } = useSession()
  console.log(status)

  if (status === "loading") {
    return <p>Loading...</p>
  }

  else if (status === "authenticated") {

    return (
      <ul className={styles.container}>
        {session?.user.isAdmin && (
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
        )}
        {session?.user.isAdmin && (
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
          </li>)}


        {session?.user.isAdmin && (
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
          </li>)}


        {session?.user.isAdmin && (
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
          </li>)}
        {session?.user.isAdmin && (
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
          </li>)}

        {session?.user.isAdmin && (
          <li>
            <Link href="/dashboard/rules">
              <a
                className={
                  route == "/dashboard/rules"
                    ? `${styles.isActive} ${styles.link}`
                    : styles.link
                }
                onClick={props.onClick}
              >
                Дүрэм
              </a>
            </Link>
          </li>)}


        {session?.user.isAdmin && (
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
          </li>)}

        {session && (
          <li>
            <Link href="/profile/send-record">
              <a
                className={
                  route == "/dashboard/send-record"
                    ? `${styles.isActive} ${styles.link}`
                    : styles.link
                }
                onClick={props.onClick}
              >
                Рекорд илгээх
              </a>
            </Link>
          </li>)}

        {session && (
          <li>
            <Link href="/profile/user">
              <a
                className={
                  route == "/dashboard/user"
                    ? `${styles.isActive} ${styles.link}`
                    : styles.link
                }
                onClick={props.onClick}
              >
                Хэрэглэгч
              </a>
            </Link>
          </li>)}

      </ul>
    );
  } else {
    return <p>Page not found</p>
  }





};

export default DashboardMenu;
