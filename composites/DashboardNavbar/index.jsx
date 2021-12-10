//Next, React (core node_modules) imports must be placed here

//import STORE from '@/store'

//import COMPONENT from '@/components'
import DashboardMenu from '@/composites/DashboardMenu'
import styles from './DashboardNavbar.module.scss'

const DashboardNavbar = (props) => {
	 return (
		 <div className={styles.container}>
			<DashboardMenu />
		</div>
	)
};

export default DashboardNavbar;
