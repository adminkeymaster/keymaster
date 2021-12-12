//Next, React (core node_modules) imports must be placed here
import { motion } from "framer-motion";
//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import DashboardLayout from "@/layouts/Dashboard";
//import VIEWS from '@/views'
import { useSession } from "next-auth/react"

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from "./Dashboard.module.scss";

const DashboardPage = (props) => {
    return <motion.main exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={styles.container}>Welcome to dashboard</motion.main>;

};

DashboardPage.Layout = DashboardLayout;

export default DashboardPage;
