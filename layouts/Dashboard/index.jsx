//Next, React (core node_modules) imports must be placed here
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
//import STORE from '@/store'

//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'
import Navbar from "@/composites/Navbar";
import DashboardNavbar from "@/composites/DashboardNavbar";
//import COMPONENT from '@/components'
import styles from "./Dashboard.module.scss";

const DashboardLayout = ({ children, ...props }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return null;
  }

  if (!session || !session.user.isAdmin) {
    router.push("/auth/login");
    return null;
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <DashboardNavbar />
      {children}
    </div>
  );
};

export default DashboardLayout;
