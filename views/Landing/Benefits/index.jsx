//Next, React (core node_modules) imports must be placed here
import Image from "next/image";
import { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
//import STORE from '@/store'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from "./Benefits.module.scss";

const Benefits = (props) => {
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
    <div className={styles.container}>
      <motion.div
        initial="hidden"
        animate={animation}
        variants={container}
        className={styles.content}
        ref={ref}
      >
        <motion.h2 variants={children}>Давуу талууд</motion.h2>
        <motion.div variants={children} className={styles.benefits}>
          <div className={styles.benefit}>
            <div className={styles.icon}>
              <Image
                layout="fill"
                objectFit="cover"
                src="/BenefitsOne.png"
                alt="benefit image"
              />
            </div>
            <p>Стресс бууруулах, Спорт зан чанар, Анхаарал төвлөрөлт</p>
          </div>
          <motion.div variants={children} className={styles.benefit}>
            <div className={styles.icon}>
              <Image
                layout="fill"
                objectFit="cover"
                src="/BenefitsTwo.png"
                alt="benefit image"
              />
            </div>
            <p>
              Гарын жижиг булчингийн хөгжил, Цусны эргэлт, Тооцоолон бодох
              чадвар
            </p>
          </motion.div>
          <motion.div variants={children} className={styles.benefit}>
            <div className={styles.icon}>
              <Image
                layout="fill"
                objectFit="cover"
                src="/BenefitsThree.png"
                alt="benefit image"
              />
            </div>
            <p>Хоёр тархины хөгжил, Тэвчээр, Тууштай зан чанар,</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Benefits;
