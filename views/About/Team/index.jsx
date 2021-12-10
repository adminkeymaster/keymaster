//Next, React (core node_modules) imports must be placed here
import Image from "next/image";
//import STORE from '@/store'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from "./Team.module.scss";

const Team = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.star}>
        <Image width={180} height={300} src="/star.png" layout="fixed" />
      </div>
      <h1>Манай хамт олон</h1>
      <div className={styles.content}>
        <div className={styles.member}>
          <div className={styles.image}>
            <Image
              className={styles.cover}
              layout="fill"
              src="/Khatanbaatar.png"
              alt="image"
            />
          </div>
          <h3>Х.Хатанбаатар</h3>
        </div>
        <div className={styles.member}>
          <div className={styles.image}>
            <Image
              className={styles.cover}
              layout="fill"
              src="/bayarkhuu.png"
              alt="image"
            />
          </div>
          <h3>Г. Баярхүү</h3>
        </div>
        <div className={styles.member}>
          <div className={styles.image}>
            <Image
              className={styles.cover}
              layout="fill"
              src="/enkhmunkh.png"
              alt="image"
            />
          </div>
          <h3>Г. Энхмөнх</h3>
        </div>
      </div>
      <h2>Хамтрагч Байгууллагууд</h2>
      <div className={styles.partnerships}>
        <div className={styles.logo}>
          <Image layout="fill" objectFit="contain" src="/mastermind.png" />
        </div>
      </div>
    </div>
  );
};

export default Team;
