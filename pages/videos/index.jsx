//Next, React (core node_modules) imports must be placed here
import ReactPlayer from "react-player";
import { motion } from "framer-motion";
//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import LandingLayout from "@/layouts/Landing";
//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from "./Videos.module.scss";

const VideosPage = (props) => {
  return (
    <motion.main exit={{ opacity: 0 }}
	initial={{ opacity: 0 }}
	animate={{ opacity: 1 }}
	transition={{ duration: 1 }}
	className={styles.container}>
      <div className={styles.innerContainer}>
		<h2>КиМастер тоглоомын заавар</h2>
        <div className={styles.featuredVideo}>
          <ReactPlayer
            width="100%"
            height="100%"
            url="https://www.youtube.com/watch?v=NBSj7Ezw7qc"
          />
        </div>
		<div className={styles.featuredVideo}>
          <ReactPlayer
            width="100%"
            height="100%"
            url="https://www.youtube.com/watch?v=5SbDdV_0XTY"
          />
        </div>
        {/* <div className={styles.videoList}>
					<div className={styles.video}>
						<ReactPlayer
							width="100%"
							height="100%"
							url='https://www.youtube.com/watch?v=5SbDdV_0XTY'
						/>
						<h3 className={styles.title}>Г.Дөлгөөн дэлхийн рекорд эвдэв </h3>
						<div className={styles.description}>
						<p className={styles.views}>25 views</p>
						<p className={styles.uploadDate}>10 months ago</p>
						</div>
					</div>
					<div className={styles.video}>
						<ReactPlayer
							width="100%"
							height="100%"
							url='https://www.youtube.com/watch?v=5SbDdV_0XTY'
						/>
						<h3 className={styles.title}>Г.Дөлгөөн дэлхийн рекорд эвдэв </h3>
						<div className={styles.description}>
						<p className={styles.views}>25 views</p>
						<p className={styles.uploadDate}>10 months ago</p>
						</div>
					</div>
					<div className={styles.video}>
						<ReactPlayer
							width="100%"
							height="100%"
							url='https://www.youtube.com/watch?v=5SbDdV_0XTY'
						/>
						<h3 className={styles.title}>Г.Дөлгөөн дэлхийн рекорд эвдэв </h3>
						<div className={styles.description}>
						<p className={styles.views}>25 views</p>
						<p className={styles.uploadDate}>10 months ago</p>
						</div>
					</div>
				</div> */}
      </div>
    </motion.main>
  );
};
VideosPage.Layout = LandingLayout;

export default VideosPage;
