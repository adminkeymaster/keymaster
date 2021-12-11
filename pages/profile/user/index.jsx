//Next, React (core node_modules) imports must be placed here
import { useSession, signIn, signOut } from "next-auth/react";
//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import DashboardLayout from "@/layouts/Dashboard";
//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from "./User.module.scss";

const UserPage = (props) => {
  return (
    <main className={styles.container}>
      This is the User Page
      <button
        onClick={() => {
          signOut();
        }}
      >
        Signout
      </button>
    </main>
  );
};

UserPage.Layout = DashboardLayout;

export default UserPage;
