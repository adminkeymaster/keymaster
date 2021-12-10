//Next, React (core node_modules) imports must be placed here
import Image from "next/image";
//import STORE from '@/store'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from "./Goal.module.scss";

const Goal = (props) => {
  return (
    <div className={styles.container}>
<<<<<<< HEAD
      <Image
        className={styles.coverImage}
        layout="fill"
        objectFit="cover"
        src="/HomeCover.png"
        alt="cover image"
      />
=======
      <div className={styles.rectangle}>
        <Image width={200} height={300} src="/rectangle.png" layout="fixed" />
      </div>
      <div className={styles.circle}>
        <Image width={300} height={300} src="/circle.png" layout="fixed" />
      </div>
>>>>>>> 09ff2e9565a7565f40059591bb80eae4479f3178
      <div className={styles.content}>
        <div className={styles.contentContainer}>
          <div className={styles.text}>
            <h2>Бидний ЭРХЭМ ЗОРИЛГО</h2>
            <p>
              Кимастер спортыг улсын хэмжээнд хөгжүүлэх замаар кимастер спортоор
              хичээллэгч хүүхэд, залуусын хүрээг тэлж, хүйс болон насны олон
              ангиллаар улс, олон улс, тив, дэлхийн хэмжээнд өрсөлдөх өндөр
              зэрэглэлийн тамирчдыг бэлтгэн эх орноо сурталчлах эрхэм зорилготой
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goal;
