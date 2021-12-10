//Next, React (core node_modules) imports must be placed here
import Image from 'next/image';
//import STORE from '@/store'

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
		<main className={styles.container}>
			<Keymaster/>
			<History/>
			<Goal/>
			<Team/>
		</main>
	)
};
AboutPage.Layout = LandingLayout;
export default AboutPage;
