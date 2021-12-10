//Next, React (core node_modules) imports must be placed here
import Image from "next/image";
//import STORE from '@/store'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from "./Keymaster.module.scss";

const Keymaster = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.triangle}>
        <Image
          width={100}
          height={100}
          src="/triangle.png"
          layout="fixed"
          alt="triangle"
        />
      </div>
      <div className={styles.smallTriangle}>
        <Image
          width={50}
          height={50}
          src="/smalltraingle.png"
          layout="fixed"
          alt="small triangle"
        />
      </div>
      <div className={styles.content}>
        <div className={styles.contentContainer}>
          <div className={styles.text}>
            <h2>Кимастер</h2>
            <p>
              Кимастер нь мод болон төмрөөр уралсан цагирагт түлхүүр тоглоом юм.
              Олон хэлхээ бүхий цагирагны цоожыг ямарч багаж хэрэгсэлгүйгээр
              тайлснаар хүүхдийн сэтгэхүйг хөгжүүлэн, оюуныг задалж, хурдан
              түргэн сэтгэн бодох чадварыг сайжруулна.{" "}
            </p>
          </div>
        </div>
        <div className={styles.image}>
          <Image
            className={styles.cover}
            height={"100%"}
            width={"100%"}
            layout="responsive"
            objectFit="contain"
            src="/AboutImage.png"
            alt="image"
          />
        </div>
      </div>
    </div>
  );
};

export default Keymaster;
