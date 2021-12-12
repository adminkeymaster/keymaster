//Next, React (core node_modules) imports must be placed here
import { useRouter } from "next/router";
import { useState } from "react";
//import STORE from '@/store'

//import COMPONENT from '@/components'
import Logo from "@/components/Logo";
import styles from "./ProductReqVerify.module.scss";

const ProductReqVerify = ({
  handleSubmit,
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
              <p>Данс: 1405136317</p>
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
              Санамж: Та төлбөрөө шилжүүлсний дараа захиалга баталгаажуулах товчыг дарна уу!
            </b>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="lastName">Овог</label>
          <input
            readonly
            type="text"
            placeholder="Овог"
            name="lastName"
            id="lastName"
            defaultValue={lastName}
            required
          />
          <label htmlFor="firstName">Нэр</label>
          <input
            readonly
            type="text"
            placeholder="Нэр"
            name="firstName"
            id="firstName"
            defaultValue={firstName}
            required
          />
          <label htmlFor="email">Цахим шуудан</label>
          <input
            readonly
            type="email"
            placeholder="Цахим шуудан"
            name="email"
            id="email"
            defaultValue={email}
            required
          />
          <label htmlFor="phoneNumber">Утасны дугаар</label>
          <input
            readonly
            type="text"
            placeholder="Утасны дугаар"
            name="phoneNumber"
            id="phoneNumber"
            defaultValue={phoneNumber}
            required
          />
        </form>
      </div>
    </div>
  );
};

export default ProductReqVerify;
