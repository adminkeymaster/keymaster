//Next, React (core node_modules) imports must be placed here
import Image from "next/image";
//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import LandingLayout from "@/layouts/Landing";

//import VIEWS from '@/views'
import Information from "@/views/Competition/Information";
import CompetitionTable from "@/composites/CompetitionTable";
import Rules from "@/views/Rules/Rules";
//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from "./Competition.module.scss";

const CompetitionPage = (props) => {
  return (
    <main className={styles.container}>
      <div className={styles.withBackground}>
        <Rules/>
        <h2>КиМастер Тэмцээн</h2>
        <CompetitionTable />
        <div className={styles.rectangleRight}>
        <Image width={200} height={300} src="/rectangleright.png" layout="fixed" />
      </div>
      <div className={styles.star}>
        <Image width={200} height={300} src="/star.png" layout="fixed" />
      </div>
      <div className={styles.circle}>
        <Image width={150} height={200} src="/circle1.png" layout="fixed" />
      </div>
      </div>
    </main>
  );
};

CompetitionPage.Layout = LandingLayout;

export default CompetitionPage;
