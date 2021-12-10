//Next, React (core node_modules) imports must be placed here

//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import DashboardLayout from "@/layouts/Dashboard";
//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from "./VideoRequest.module.scss";

const VideoRequestPage = (props) => {
  return <main className={styles.container}>this is video Request Page</main>;
};

VideoRequestPage.Layout = DashboardLayout;

export default VideoRequestPage;
