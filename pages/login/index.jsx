//Next, React (core node_modules) imports must be placed here
import Image from "next/image";
import Link from "next/link";
//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import LoginLayout from "@/layouts/Login";
//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from "./Login.module.scss";

const LoginPage = (props) => {
  return (
    <main className={styles.container}>
      <div className={styles.star}>
        <Image
          width={150}
          height={250}
          src="/star.png"
          layout="fixed"
          className={styles.star}
          alt="star"
        />
      </div>
      <form className={styles.form} action="POST">
        <div className={styles.imageContainer}>
          <Image
            className={styles.image}
            src="/signinbg.png"
            layout="fill"
            alt="Login"
          />
        </div>
        <div className={styles.details}>
          <label htmlFor="email">Цахим шуудан</label>
          <input type="email" placeholder="Таны и-мейл хаяг" />
          <label htmlFor="password">Нууц үг</label>
          <input type="password" placeholder="Таны нууц үг" />
          <div className={styles.remember}>
            <input type="checkbox" />
            <label htmlFor="checkbox">Хэрэглэгч сануулах</label>
          </div>
          <button>
            <span>Нэвтрэх</span>
          </button>
          <Link href="/register">
            <a href="">Бүртгүүлэх</a>
          </Link>
        </div>
      </form>
    </main>
  );
};
LoginPage.Layout = LoginLayout;
export default LoginPage;
