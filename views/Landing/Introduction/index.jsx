//Next, React (core node_modules) imports must be placed here
<<<<<<< HEAD
=======
import Image from "next/image"
>>>>>>> 09ff2e9565a7565f40059591bb80eae4479f3178
import ReactPlayer from "react-player";
import Link from "next/link";
import { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
//import STORE from '@/store'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'
import SecondaryButton from "@/components/SecondaryButton";
import styles from "./Introduction.module.scss";

const Introduction = (props) => {
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
<<<<<<< HEAD
=======
            <div className={styles.triangle}>
        <Image width={100} height={100} src="/triangle.png" layout="fixed" />
      </div>
>>>>>>> 09ff2e9565a7565f40059591bb80eae4479f3178
      <div className={styles.contentContainer}>
        <motion.div
          initial="hidden"
          animate={animation}
          variants={container}
          className={styles.content}
          ref={ref}
        >
          <motion.h2 variants={children}>Танилцуулга</motion.h2>
          <motion.p variants={children}>
            Кимастер нь мод болон төмрөөр уралсан цагирагт түлхүүр тоглоом юм.
            Олон хэлхээ бүхий цагирагны цоожыг ямарч багаж хэрэгсэлгүйгээр
            тайлснаар хүүхдийн сэтгэхүйг хөгжүүлэн, оюуныг задалж, хурдан түргэн
            сэтгэн бодох чадварыг сайжруулна.
          </motion.p>
        </motion.div>
      </div>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={animation}
        variants={children}
        className={styles.image}
      >
        <ReactPlayer
          width="100%"
          height="100%"
          url="https://youtu.be/5SbDdV_0XTY"
        />
      </motion.div>
    </div>
  );
};

export default Introduction;
