//Next, React (core node_modules) imports must be placed here
//Styles must be imported here
import styles from './SecondaryButton.module.scss'

const SecondaryButton = (props) => {
	 return (
		 <button className={styles.container}>
			 {props.children}
		</button>
	)
};

export default SecondaryButton;
