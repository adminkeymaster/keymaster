//Next, React (core node_modules) imports must be placed here
import { signIn, useSession, getCsrfToken } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import LoginLayout from "@/layouts/Login";
import Notification from "@/components/Notification";
//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from "./Login.module.scss";

const errorMsgs = {
  noUser: "Хэрэглэгч олдсонгүй",
  wrongPassword: "Таны нууц үг буруу байна",
};

const LoginPage = ({ csrfToken }) => {
  const router = useRouter();
  const { error } = router.query;
  const [notification, setNotification] = useState({
    message: "",
    success: false,
  });

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

  useEffect(() => {
    if (error) {
      setNotification({
        message: errorMsgs[error],
        success: false,
      });
    }
  }, [error]);

  return (
    <main className={styles.container}>
      <Notification
        message={notification.message}
        success={notification.success}
      />
      <div className={styles.star}>
        <Image
          width={150}
          height={250}
          src="/star.png"
          layout="fixed"
          className={styles.star}
          alt="star"
          priority
        />
      </div>
      <form
        className={styles.form}
        action="/api/auth/callback/credentials"
        method="post"
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <div className={styles.imageContainer}>
          <Image
            className={styles.image}
            src="/signinbg.png"
            layout="fill"
            alt="Login"
            priority
          />
        </div>
        <div className={styles.details}>
          <label htmlFor="email">Цахим шуудан</label>
          <input name="email" type="email" placeholder="Таны и-мейл хаяг" />
          <label htmlFor="password">Нууц үг</label>
          <input name="password" type="password" placeholder="Таны нууц үг" />
          <div className={styles.remember}>
            <input type="checkbox" />
            <label htmlFor="checkbox">Хэрэглэгч сануулах</label>
          </div>
          <button type="submit">
            <span>Нэвтрэх</span>
          </button>
          <Link href="/auth/register">
            <a>Бүртгүүлэх</a>
          </Link>
        </div>
      </form>
    </main>
  );
};

export async function getServerSideProps(ctx) {
  const token = await getCsrfToken(ctx);
  return {
    props: {
      csrfToken: token ? token : null,
    },
  };
}

LoginPage.Layout = LoginLayout;
export default LoginPage;
