//Next, React (core node_modules) imports must be placed here
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
//import STORE from '@/store'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'
// import CompetitorList from "@/components/CompetitorList";
import PrimaryButton from "@/components/PrimaryButton";

import styles from "./Home.module.scss";

const Home = (props) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
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
      transition: { duration: 1, staggerChildren: 0.2 },
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
      <Image
        className={styles.image}
        layout="fill"
        objectFit="cover"
        src="/HomeCover.png"
      />
      <motion.div
        initial="hidden"
        animate={animation}
        variants={container}
        className={styles.content}
      >
        <motion.h2 variants={children}>Ухаанаа уралдуул</motion.h2>
        <motion.p variants={children}>
          Монголын уламжлалт оньсон тоглоом
        </motion.p>
        <motion.div variants={children}>
          <Link href="/products"><a><PrimaryButton>Урьдчилан Захиалах</PrimaryButton></a></Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
