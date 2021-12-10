//Next, React (core node_modules) imports must be placed here

//import STORE from '@/store'

//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'
import Navbar from '@/composites/Navbar';
import Footer from '@/composites/Footer';
//import COMPONENT from '@/components'

import styles from './Landing.module.scss'

const LandingLayout = ({ children, ...props }) => {
	return (
		<div className={styles.container}>
			<Navbar />
			{children}
			<Footer />
		</div>
	)
}

export default LandingLayout;
