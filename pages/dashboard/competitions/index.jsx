//Next, React (core node_modules) imports must be placed here

//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import DashboardLayout from "@/layouts/Dashboard";
//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from "./Competitions.module.scss";

const CompetitionsPage = (props) => {
  return (
    <main className={styles.container}>This is the Competitions Page</main>
  );
};

CompetitionsPage.Layout = DashboardLayout;

export default CompetitionsPage;
