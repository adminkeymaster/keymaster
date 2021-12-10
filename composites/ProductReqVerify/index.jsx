//Next, React (core node_modules) imports must be placed here
import { useRouter } from "next/router";
import { useState } from "react";
//import STORE from '@/store'

//import COMPONENT from '@/components'
import Logo from "@/components/Logo";
import styles from "./ProductReqVerify.module.scss";

const ProductReqVerify = ({
  handleSubmit,
  handleChange,
  firstName,
  lastName,
  email,
  phoneNumber,
  ...props
}) => {
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
            defaultValue={lastName}
            onChange={handleChange}
          />
          <label htmlFor="firstName">Нэр</label>
          <input
            type="text"
            placeholder="Нэр"
            name="firstName"
            id="firstName"
            defaultValue={firstName}
            onChange={handleChange}
          />
          <label htmlFor="email">Цахим шуудан</label>
          <input
            type="email"
            placeholder="Цахим шуудан"
            name="email"
            id="email"
            defaultValue={email}
            onChange={handleChange}
          />
          <label htmlFor="phoneNumber">Утасны дугаар</label>
          <input
            type="text"
            placeholder="Утасны дугаар"
            name="phoneNumber"
            id="phoneNumber"
            defaultValue={phoneNumber}
            onChange={handleChange}
          />
        </form>
      </div>
    </div>
  );
};

export default ProductReqVerify;
