//Next, React (core node_modules) imports must be placed here
import Image from "next/image";
//import STORE from '@/store'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from "./Information.module.scss";

const Information = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.text}>
          <h2>Насны ангилал</h2>
          <div className={styles.listWrapper}>
            <ul className={styles.list}>
              <li>4 нас</li>
              <li>5 нас</li>
              <li>6 нас</li>
              <li>7-8 нас</li>
            </ul>
            <ul className={styles.list}>
              <li>9-11 нас</li>
              <li>12-14 нас</li>
              <li>15-17 нас</li>
              <li>18-аас дээш нас</li>
            </ul>
          </div>
          <div className={styles.information}>
            Тэмцээнд насны ангилал болон төрөл тус бүрт оролцох тамирчдын тоо 50
            байна.
          </div>
          <div className={styles.information}>
            50-аас илүү тамирчин оролцохоор бүртгүүлсэн тохиолдолд урьдчилсан
            шалгаруулалт хийнэ.
          </div>
        </div>
        <div className={styles.image}>
          <Image src="/compinfo.jpg" layout="fill" objectFit="cover" />
        </div>
      </div>
    </div>
  );
};

export default Information;
