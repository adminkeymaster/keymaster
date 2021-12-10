//Next, React (core node_modules) imports must be placed here

//Styles must be imported here
import styles from './Login.module.scss'

//Components must be imported here
import Navbar from '@/composites/Navbar';
const LoginLayout = ({children, ...props}) => {
	 return (
		 <div className={styles.container}>
			 <Navbar />
			{children}
		</div>
	)
};

export default LoginLayout;
