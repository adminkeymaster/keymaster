//Next, React (core node_modules) imports must be placed here

//Styles must be imported here
import styles from './Signup.module.scss'

//Components must be imported here

const SignupLayout = ({children, ...props}) => {
	 return (
		 <div className={styles.container}>
			{children}
		</div>
	)
};

export default SignupLayout;
