//Next, React (core node_modules) imports must be placed here
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import DashboardLayout from "@/layouts/Dashboard";
//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from "./Dashboard.module.scss";

const DashboardPage = (props) => {
  const { data: session, status } = useSession();
  if (status === "loading") return null;
  if (!session || !session.user.isAdmin) return null;

  return (
    <motion.main
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={styles.container}
    >
      <h1>Админий хэсэгт тавтай морилно уу!</h1>
      <button
      className={styles.button}
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </button>
    </motion.main>
  );
};

DashboardPage.Layout = DashboardLayout;

export default DashboardPage;
