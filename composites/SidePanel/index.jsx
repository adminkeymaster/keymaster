//Next, React (core node_modules) imports must be placed here
import Link from "next/link";
import { useRouter } from "next/router";
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
        <li>
          <PrimaryButton>Нэвтрэх</PrimaryButton>
        </li>
      </ul>
    </aside>
  );
};

export default SidePanel;
