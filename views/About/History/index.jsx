//Next, React (core node_modules) imports must be placed here
import Image from "next/image";
//import STORE from '@/store'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from "./History.module.scss";

const History = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.image}>
          <Image
            className={styles.cover}
            height={"100%"}
            width={"100%"}
            layout="responsive"
            objectFit="contain"
            src="/AboutImage2.png"
            alt="image"
          />
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.text}>
            <h2>Тоглоомын түүх </h2>
            <p>
              Аз жаргалтай амьпралын эрэлд гарсан хэн боловч өөрийн дотор буй 9
              муу чанараа даван туулах ёстой гэж үздэг. 9 муу чанар бүр өөр
              өөрийн гэсэн сорилттой бөгөө хамгийн адаг чанар нь бусдыг
              буруутгах үзэл, дараагийн чанар нь залхуурал, дараагийн муу чанар
              нь бусдын нүдийг хуурах гэх зэргээр 9 муу чанараа даван туулсаар
              нэг дэх үед ирэхэд аз жаргалын хаалгыг тоглоомтой ижил хэлбэр,
              хийцтэй цоожоор цоожилсон байх болно.Цоожыг маш бат бөх урласан
              тул уурын мунхаг, биеийн хүчээр дийлэх боломжгүй. Зөвхөн ажигч
              гярхай, ухаалаг, тэвчээртэй хүн тэрхүү оньсны учрыг тайлж, учгыг
              олж чадна.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
