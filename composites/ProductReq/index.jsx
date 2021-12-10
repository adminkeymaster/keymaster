//Next, React (core node_modules) imports must be placed here
import { useRouter } from "next/router";
import { useState } from "react";
//import STORE from '@/store'

//import COMPONENT from '@/components'
<<<<<<< HEAD
import Logo from "@/components/Logo";
import styles from "./ProductReq.module.scss";

const ProductReq = ({ firstName, lastName, email, phoneNumber, ...props }) => {
  const [form, setForm] = useState({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
  });

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (router.pathname === "/products") {
      router.push({
        pathname: "/checkout",
        query: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phoneNumber: form.phoneNumber,
        },
        as: "/checkout",
      });
    }

    console.log(form);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.information}>
        <div className={styles.guide}>
          <h3>Төлбөр төлөх заавар</h3>
          <p>Та дараах данс руу төлбөрөө шилжүүлнэ үү.</p>
          <div className={styles.bankInfo}>
            <div className={styles.bank}>
              <p>Данс: 14051363171</p>
              <p>Банк: Голомт Банк</p>
              <p>Нэр: КиМастер Ворлд ХХК</p>
            </div>
            <Logo />
          </div>
          <p>
            <b>
              Гүйлгээний утган дээр та өөрийн нэр болон утасны дугаараа бичээрэй
            </b>
          </p>
          <p>
            <b>
              Санамж: Төлбөрөө бүрэн шилжүүлсэн тохиолдолд таны захиалга
              баталгаажихыг анхаарна уу!
            </b>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="lastName">Овог</label>
          <input
            type="text"
            placeholder="Овог"
            name="lastName"
            id="lastName"
            defaultValue={form.lastName}
            onChange={handleChange}
          />
          <label htmlFor="firstName">Нэр</label>
          <input
            type="text"
            placeholder="Нэр"
            name="firstName"
            id="firstName"
            defaultValue={form.firstName}
            onChange={handleChange}
          />
          <label htmlFor="email">Цахим шуудан</label>
          <input
            type="email"
            placeholder="Цахим шуудан"
            name="email"
            id="email"
            defaultValue={form.email}
            onChange={handleChange}
          />
          <label htmlFor="phoneNumber">Утасны дугаар</label>
          <input
            type="text"
            placeholder="Утасны дугаар"
            name="phoneNumber"
            id="phoneNumber"
            defaultValue={form.phoneNumber}
            onChange={handleChange}
          />
          <button>Урьдчилан Захиалах</button>
        </form>
      </div>
    </div>
  );
=======
<<<<<<< HEAD

=======
import Logo from '@/components/Logo';
>>>>>>> 09ff2e9565a7565f40059591bb80eae4479f3178
import styles from './ProductReq.module.scss'

const ProductReq = (props) => {
	 return (
		 <div className={styles.container}>
<<<<<<< HEAD
			<form action="POST">
				<label htmlFor="firstName">Овог</label>
				<input type="text" />
				<label htmlFor="lastName">Нэр</label>
				<input type="text" />
				<label htmlFor="email">Цахим шуудан</label>
				<input type="email" />
				<label htmlFor="phoneNumber">Утасны дугаар</label>
				<input type="tel" />
				<p>Та дараах данс руу төлбөрөө шилжүүлнэ үү.</p>
				<p>Данс: 14051363171</p>
				<p>Банк: Голомт Банк</p>
				<p>Нэр: КиМастер Ворлд ХХК</p>
				<p>Гүйлгээний утган дээр та өөрийн нэр болон утасны дугаараа бичээрэй</p>
				<p>Санамж: Төлбөрөө бүрэн шилжүүлсэн тохиолдолд таны захиалга баталгаажихыг анхаарна уу!</p>
				<button>Захиалга өгөх</button>
			</form>
=======
			 <div className={styles.information}>
			 <div className={styles.guide}>
			<h3>Төлбөр төлөх заавар</h3>
				<p>Та дараах данс руу төлбөрөө шилжүүлнэ үү.</p>
				<div className={styles.bankInfo}>
				<div className={styles.bank}>
				<p>Данс: 14051363171</p>
				<p>Банк: Голомт Банк</p>
				<p>Нэр: КиМастер Ворлд ХХК</p>
				</div>
				<Logo/>
				</div>
				<p><b>Гүйлгээний утган дээр та өөрийн нэр болон утасны дугаараа бичээрэй</b></p>
				<p><b>Санамж: Төлбөрөө бүрэн шилжүүлсэн тохиолдолд таны захиалга баталгаажихыг анхаарна уу!</b></p>
			</div>
			<form action="POST">
				<label htmlFor="firstName">Овог</label>
				<input type="text" placeholder="Овог"/>
				<label htmlFor="lastName">Нэр</label>
				<input type="text" placeholder="Нэр"/>
				<label htmlFor="email">Цахим шуудан</label>
				<input type="email" placeholder="Цахим шуудан"/>
				<label htmlFor="phoneNumber">Утасны дугаар</label>
				<input type="tel" placeholder="Утасны дугаар"/>
				<button>Захиалга өгөх</button>
			</form>
			</div>
>>>>>>> 09ff2e9565a7565f40059591bb80eae4479f3178
		</div>
	)
>>>>>>> 53cf62d755d0d5094c2cd68d4fb75a5981813357
};

export default ProductReq;
