//Next, React (core node_modules) imports must be placed here
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import axios from "axios";
//import STORE from '@/store'

//import COMPOSITES from '@/composites'
// import LeaderboardTable from "@/composites/LeaderboardTable";
import LeaderboardTableRefactored from "@/composites/LeaderboardTableRefactored";
// import AthleteCard from "@/composites/AthleteCard";
import CompetitionTable from "@/composites/CompetitionTable";
// import CompetitionCard from "@/composites/CompetitionCard";
//import COMPONENT from '@/components'
// import SendVideoHome from "@/composites/SendVideoHome";
import styles from "./Feature.module.scss";

const Feature = (props) => {
  const { ref, inView } = useInView({
    threshold: 0.8,
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
      {/* <LeaderboardTable /> */}
      <LeaderboardTableRefactored />
      {/* <SendVideoHome /> */}
      {/* <h2>Тэмцээний мэдээллүүд</h2> */}
      <div className={styles.content}>
        {/* <AthleteCard /> */}
        <CompetitionTable />
      </div>
      <div className={styles.circle}>
        <Image
          width={200}
          height={200}
          src="/circle.png"
          layout="fixed"
          alt="circle"
        />
      </div>
    </div>
  );
};

export default Feature;
