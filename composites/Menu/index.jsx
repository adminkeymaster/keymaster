import { useSession, getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useContext, useEffect } from "react";

import ActiveAnchorContext from "@/store/ActiveAnchor";

import PrimaryButton from "@/components/PrimaryButton";

import styles from "./Menu.module.scss";

const Menu = (props) => {
  const { data: session, status } = useSession();

  const { route } = useRouter();
  const { activeAnchor } = useContext(ActiveAnchorContext);

  useEffect(() => {
    console.log(session);
  }, [status]);

  return (
    <ul className={styles.container}>
      <li>
        <Link href="/about">
          <a
            className={
              route == "/about"
                ? `${styles.isActive} ${styles.link}`
                : styles.link
            }
            onClick={props.onClick}
          >
            Тухай
          </a>
        </Link>
      </li>
      <li>
        <Link href="/news">
          <a
            className={
              route == "/news"
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
        <Link href="/competition">
          <a
            className={
              route == "/competition"
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
        <Link href="/videos">
          <a
            className={
              route == "/videos"
                ? `${styles.isActive} ${styles.link}`
                : styles.link
            }
            onClick={props.onClick}
          >
            Keymaster
          </a>
        </Link>
      </li>
      <li>
        <Link href="/products">
          <a
            className={
              route == "/products"
                ? `${styles.isActive} ${styles.link}`
                : styles.link
            }
            onClick={props.onClick}
          >
            Бараа бүтээгдэхүүн
          </a>
        </Link>
      </li>
      {(session &&
        (session.user.isAdmin ? (
          <Link href="/dashboard">
            <li>
              <PrimaryButton>Dashboard</PrimaryButton>
            </li>
          </Link>
        ) : (
          <Link href="/dashboard">
            <li>
              <PrimaryButton>{session.user.firstName}</PrimaryButton>
            </li>
          </Link>
        ))) || (
        <Link href="/auth/login">
          <li>
            <PrimaryButton>Нэвтрэх</PrimaryButton>
          </li>
        </Link>
      )}
    </ul>
  );
};

export default Menu;
