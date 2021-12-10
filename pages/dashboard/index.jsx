//Next, React (core node_modules) imports must be placed here

//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import DashboardLayout from "@/layouts/Dashboard";
//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from "./Dashboard.module.scss";

const DashboardPage = (props) => {
  return <main className={styles.container}>Welcome to dashboard</main>;
};

DashboardPage.Layout = DashboardLayout;

export default DashboardPage;
