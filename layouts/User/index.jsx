//Next, React (core node_modules) imports must be placed here
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
//import STORE from '@/store'

//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'
import Navbar from "@/composites/Navbar";
import UserNavbar from "@/composites/UserNavbar";
//import COMPONENT from '@/components'
import styles from "./User.module.scss";

const UserLayout = ({ children, ...props }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return null;
  }

  if (!session || session.user.isAdmin) {
    router.push("/auth/login");
    return null;
  }

  return (
    <div className={styles.container}>
      <Navbar />
      {session && <UserNavbar />}
      {session && children}
    </div>
  );
};

export default UserLayout;
