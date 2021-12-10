//Next, React (core node_modules) imports must be placed here

//import STORE from '@/store'

//import LAYOUT from '@/layouts'

//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from './Login.module.scss'

const LoginPage = (props) => {
	 return (
		 <main className={styles.container}>
			<form action="POST">
				<label htmlFor="email">И-Мейл</label>
				<input type="email" placeholder="Таны и-мейл хаяг"/>
				<label htmlFor="password">Нууц үг</label>
				<input type="password" placeholder="Таны нууц үг"/>
				<label htmlFor="checkbox">Хэрэглэгч сануулах</label>
				<input type="checkbox" />
				<button>Нэвтрэх</button>
				<a href="">Бүртгүүлэх</a>
			</form>
		</main>
	)
};
LoginPage.Layout = LoginLayout;
export default LoginPage;
