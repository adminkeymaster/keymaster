//Next, React (core node_modules) imports must be placed here
import { useSession } from "next-auth/react";
//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import DashboardLayout from "@/layouts/Dashboard";
//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from "./Rules.module.scss";

const RulesPage = (props) => {
  const { data: session, status } = useSession();
  if (status === "loading") return null;
  if (!session || !session.user.isAdmin) return null;
  return <main className={styles.container}>This is the rules page</main>;
};

RulesPage.Layout = DashboardLayout;

export default RulesPage;
