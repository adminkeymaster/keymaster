//Next, React (core node_modules) imports must be placed here
import Image from "next/image";
import { motion } from "framer-motion";
//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import LandingLayout from "@/layouts/Landing";

//import VIEWS from '@/views'
import CompetitionTable from "@/composites/CompetitionTable";
import Rules from "@/views/Rules/Rules";
//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from "./Competition.module.scss";

const CompetitionPage = (props) => {
  return (
    <motion.main exit={{ opacity: 0 }}
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 1 }}
    className={styles.container}>
      <div className={styles.withBackground}>
        <Rules />
        <h2>КиМастер Тэмцээн</h2>
        <CompetitionTable />
        <div className={styles.rectangleRight}>
          <Image
            width={200}
            height={300}
            src="/rectangleright.png"
            layout="fixed"
            alt="rectagleRight"
          />
        </div>
        <div className={styles.star}>
          <Image
            width={200}
            height={300}
            src="/star.png"
            layout="fixed"
            alt="star"
          />
        </div>
        <div className={styles.circle}>
          <Image
            width={150}
            height={200}
            src="/circle1.png"
            layout="fixed"
            alt="circle"
          />
        </div>
      </div>
    </motion.main>
  );
};

CompetitionPage.Layout = LandingLayout;

export default CompetitionPage;
