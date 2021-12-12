//Next, React (core node_modules) imports must be placed here
import Link from "next/link";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import { Close } from "@styled-icons/evaicons-solid/Close";
//import STORE from '@/store'

//import COMPONENT from '@/components'
import PrimaryButton from "@/components/PrimaryButton";

import styles from "./SidePanel.module.scss";

const StyledCloseIcon = styled(Close)`
  width: 4.8rem;
  height: 4.8rem;
`;

const SidePanel = ({ handler, isOpen, ...props }) => {
  const { data: session, status } = useSession();
  const { route } = useRouter();
  return (
    <aside className={isOpen ? styles.container : styles.closed}>
      <button className={styles.closeButton} onClick={handler}>
        <StyledCloseIcon />
      </button>

      <ul className={styles.list}>
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
        <Link href="/api/auth/signin">
          <li>
            <PrimaryButton>Нэвтрэх</PrimaryButton>
          </li>
        </Link>
      )}
      </ul>
    </aside>
  );
};

export default SidePanel;
