//Next, React (core node_modules) imports must be placed here
<<<<<<< HEAD
import ReactPlayer from 'react-player';
//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import LandingLayout from '@/layouts/Landing';
=======
import ReactPlayer from "react-player";
//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import LandingLayout from "@/layouts/Landing";
>>>>>>> 09ff2e9565a7565f40059591bb80eae4479f3178
//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

<<<<<<< HEAD
import styles from './videos.module.scss'

const VideosPage = (props) => {
	return (
		<main className={styles.container}>
			<div className={styles.innerContainer}>
				<div className={styles.featuredVideo}>
					<ReactPlayer
						width="100%"
						height="100%"
						url='https://www.youtube.com/watch?v=5SbDdV_0XTY'
					/>
				</div>
				<div className={styles.videoList}>
=======
import styles from "./Videos.module.scss";

const VideosPage = (props) => {
  return (
    <main className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.featuredVideo}>
          <ReactPlayer
            width="100%"
            height="100%"
            url="https://www.youtube.com/watch?v=5SbDdV_0XTY"
          />
        </div>
        {/* <div className={styles.videoList}>
>>>>>>> 09ff2e9565a7565f40059591bb80eae4479f3178
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
<<<<<<< HEAD
				</div>
			</div>
		</main>
	)
=======
				</div> */}
      </div>
    </main>
  );
>>>>>>> 09ff2e9565a7565f40059591bb80eae4479f3178
};
VideosPage.Layout = LandingLayout;

export default VideosPage;
