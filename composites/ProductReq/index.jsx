//Next, React (core node_modules) imports must be placed here
import { useRouter } from "next/router";
import { useState } from "react";
//import STORE from '@/store'

//import COMPONENT from '@/components'
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
};

export default ProductReq;
