//Next, React (core node_modules) imports must be placed here
import Image from 'next/image'
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import LoginLayout from '@/layouts/Login';
//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from './Register.module.scss'

const RegisterPage = (props) => {
	const [formIsSent, setFormIsSent] = useState(false);
	const [formData, setFormData] = useState({
	  firstName: "",
	  lastName: "",
	  birthDate: "",
	  gender: "",
	  email: "",
	  phoneNumber: "",
	  password: "",
	});
	const [signUpError, setSignUpError] = useState({
	  error: false,
	  errorMsg: "", 
	});
	const handleInputFormData = (e) => {
	  setFormData({
		...formData,
		[e.target.name]: e.target.value,
	  });
	};
  
	const handleSubmit = async (e) => {
	  e.preventDefault();
	  console.log(formData)
	  try {
		const response = await axios.post("/api/user", formData);
		setFormIsSent(true);
		console.log(response);
		if (!response.data.success) {
		  setSignUpError({
			error: true,
			errorMsg: response.data.msg,
		  });
		}
	  } catch (error) {
		console.log(error);
		setFormIsSent(true);
		setSignUpError({
		  error: true,
		  errorMsg: error.message,
		});
	  }
	};
	
	return (
		<main className={styles.container}>
			<div className={styles.star}>
				<Image width={150} height={250} src="/star.png" layout="fixed" className={styles.star} alt="" />
			</div>
			<form className={styles.form} action="POST">
				<div className={styles.imageContainer}>
					<Image className={styles.image} src="/signinbg.png" layout="fill" alt="Login" />
				</div>
				<div className={styles.details}>
					<label htmlFor="firstName">Овог</label>
					<input
						type="text"
						name="firstName"
						id="firstName"
						placeholder="Овог"
						onChange={handleInputFormData}
						required
					/>
					<label htmlFor="lastName">Нэр</label>
					<input
						type="text"
						name="lastName"
						id="lastName"
						placeholder="Нэр"
						onChange={handleInputFormData}
						required
					/>
					<label htmlFor="gender">Хүйс</label>
					<select
						name="gender" onChange={handleInputFormData}>
						<option defaultValue value="male">Эр</option>
						<option value="female">Эм</option>
					</select>
					<label htmlFor="birthDate">Birthday:</label>
					<input type="date" id="birthDate" name="birthDate" onChange={handleInputFormData} />
					<label htmlFor="phonenumber">Утасны дугаар</label>
					<input
						type="tel"
						name="phoneNumber"
						id="phonenumber"
						placeholder="Утасны дугаар"
						onChange={handleInputFormData}
						required
					/>
					<label htmlFor="email">Цахим шуудан</label>
					<input type="email"
						name="email"
						id="email"
						onChange={handleInputFormData}
						required placeholder="Таны и-мейл хаяг" />
					<label htmlFor="password">Нууц үг</label>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="Нууц үг"
						onChange={handleInputFormData}
						required
					/>
					<label htmlFor="passwordconfirm">Нууц үг давтах</label>
					<input
						type="password"
						name="passwordconfirm"
						id="passwordconfirm"
						placeholder="Нууц үг"
					/>
					<button onSubmit={handleSubmit}><span>Бүртгүүлэх</span></button>
					<Link href="/register"><a href="">Нэвтрэх</a></Link>
				</div>
			</form>
		</main>
	)
};

RegisterPage.Layout = LoginLayout;
export default RegisterPage;
