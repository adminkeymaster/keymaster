//Next, React (core node_modules) imports must be placed here
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
//import STORE from '@/store'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'
import SecondaryButton from "@/components/SecondaryButton";
import styles from "./About.module.scss";

const About = (props) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const animation = useAnimation();
  useEffect(() => {
    if (inView) {
      animation.start("visible");
    } else {
      animation.start("hidden");
    }
  }, [animation, inView]);

  const container = {
    visible: {
      opacity: 1,
      transition: { duration: 1, staggerChildren: 0.3 },
    },
    hidden: {
      opacity: 0,
    },
  };
  const children = {
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
    hidden: {
      y: 100,
      opacity: 0,
    },
  };
  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.star}>
        <Image
          width={150}
          height={300}
          src="/star.png"
          layout="fixed"
          alt="star"
        />
      </div>
      <div className={styles.contentContainer}>
        <motion.div
          initial="hidden"
          animate={animation}
          variants={container}
          className={styles.content}
        >
          <motion.h2 variants={children}>Түүх</motion.h2>
          <motion.p variants={children}>
            Аз жаргалтай амьдралын эрэлд гарсан хэн боловч өөрийн дотор буй 9
            муу чанараа даван туулах ёстой гэж үздэг. 9 муу чанар бүр өөр өөрийн
            гэсэн сорилттой бөгөө хамгийн адаг чанар нь бусдыг буруутгах үзэл,
            дараагийн чанар нь залхуурал, дараагийн муу чанар нь бусдын нүдийг
            хуурах гэх зэргээр 9 муу чанараа даван туулсаар нэг дэх үед ирэхэд
            аз жаргалын хаалгыг тоглоомтой ижил хэлбэр, хийцтэй цоожоор
            цоожилсон байх болно.Цоожыг маш бат бөх урласан тул уурын мунхаг,
            биеийн хүчээр дийлэх боломжгүй. Зөвхөн ажигч гярхай, ухаалаг,
            тэвчээртэй хүн тэрхүү оньсны учрыг тайлж, учгыг олж чадна.
          </motion.p>
        </motion.div>
      </div>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={animation}
        variants={container}
        className={styles.image}
      >
        <Image
          className={styles.cover}
          layout="fill"
          src="/AboutCover.jpg"
          objectFit="cover"
          alt="cover"
        />
      </motion.div>
      <div className={styles.greencircle}>
        <Image
          width={120}
          height={150}
          src="/greencircle.png"
          layout="fixed"
          alt="greencircle"
        />
      </div>
    </div>
  );
};

export default About;
