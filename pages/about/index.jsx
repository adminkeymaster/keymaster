//Next, React (core node_modules) imports must be placed here
//import STORE from '@/store'
import { motion } from 'framer-motion'
//import LAYOUT from '@/layouts'
import LandingLayout from '@/layouts/Landing';
//import VIEWS from '@/views'
import Keymaster from '@/views/About/Keymaster';
import History from '@/views/About/History';
import Goal from '@/views/About/Goal';
import Team from '@/views/About/Team';
//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from './About.module.scss'

const AboutPage = (props) => {
	 return (
		<motion.main       
		exit={{ opacity: 0 }}
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 1 }}
		className={styles.container}>
			<Keymaster/>
			<History/>
			<Goal/>
			<Team/>
		</motion.main>
	)
};
AboutPage.Layout = LandingLayout;
export default AboutPage;
