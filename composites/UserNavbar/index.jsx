//Next, React (core node_modules) imports must be placed here
import Link from "next/link";
import { useRouter } from "next/router";
//import STORE from '@/store'

//import COMPONENT from '@/components'

import styles from "./UserNavbar.module.scss";

const UserNavbar = (props) => {
  const { route } = useRouter();
  return (
    <nav className={styles.container}>
      <ul className={styles.content}>
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
              Рекорд илгээх.
            </a>
          </Link>
        </li>

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
        </li>
      </ul>
    </nav>
  );
};

export default UserNavbar;
