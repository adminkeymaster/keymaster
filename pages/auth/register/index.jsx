//Next, React (core node_modules) imports must be placed here
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import LoginLayout from "@/layouts/Login";
//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from "./Register.module.scss";

const RegisterPage = (props) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "male",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleInputFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    console.log("submit");
    axios
      .post("/api/user", formData)
      .then((res) => {
        router.push("/api/auth/signin");
      })
      .catch((err) => {
        console.log("/auth/register", err);
      });
  };

  return (
    <main className={styles.container}>
      <div className={styles.star}>
        <Image
          width={150}
          height={250}
          src="/star.png"
          layout="fixed"
          className={styles.star}
          alt="star"
          priority
        />
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.imageContainer}>
          <Image
            className={styles.image}
            src="/signinbg.png"
            layout="fill"
            alt="Login"
            priority
          />
        </div>
        <div className={styles.details}>
          <label htmlFor="lastName">Овог</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Овог"
            onChange={handleInputFormData}
            required
          />
          <label htmlFor="firstName">Нэр</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Нэр"
            onChange={handleInputFormData}
            required
          />
          <label htmlFor="gender">Хүйс</label>
          <select
            defaultValue={formData.gender}
            name="gender"
            onChange={handleInputFormData}
          >
            <option value="male">Эр</option>
            <option value="female">Эм</option>
          </select>
          <label htmlFor="birthDate">Birthday:</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            onChange={handleInputFormData}
          />
          <label htmlFor="phonenumber">Утасны дугаар</label>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="Утасны дугаар"
            onChange={handleInputFormData}
            required
          />
          <label htmlFor="email">Цахим шуудан</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleInputFormData}
            required
            placeholder="Таны и-мейл хаяг"
          />
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
          <button>
            <span>Бүртгүүлэх</span>
          </button>
          <Link href="/auth/login">
            <a>Нэвтрэх</a>
          </Link>
        </div>
      </form>
    </main>
  );
};

RegisterPage.Layout = LoginLayout;
export default RegisterPage;
