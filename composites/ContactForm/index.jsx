//Next, React (core node_modules) imports must be placed here
import { useRouter } from "next/router";
import { useState } from "react";
//import STORE from '@/store'

//import COMPONENT from '@/components'

import styles from "./ContactForm.module.scss";

const ContactForm = (props) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    description: "",
  });

  const handleInputFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phoneNumber, description } = formData;
    router.push(
      {
        pathname: "/checkout",
        query: {
          firstName,
          lastName,
          email,
          phoneNumber,
          description,
        },
      },
      "/checkout"
    );
  };
  return (
    <div className={styles.container}>
      <form action="POST">
        <div className={styles.firstLine}>
          <div className={styles.firstName}>
            <label htmlFor="firstName">Овог</label>
            <input
              type="text"
              placeholder="Овог"
              name="firstName"
              id="firstName"
              onChange={handleInputFormData}
              required
            />
          </div>
          <div className={styles.lastName}>
            <label htmlFor="lastName">Нэр</label>
            <input
              type="text"
              placeholder="Нэр"
              name="lastName"
              id="lastName"
              onChange={handleInputFormData}
              required
            />
          </div>
        </div>
        <div className={styles.secondLine}>
          <div className={styles.email}>
            <label htmlFor="email">Цахим шуудан</label>
            <input
              type="email"
              placeholder="Цахим шуудан"
              name="email"
              id="email"
              onChange={handleInputFormData}
              required
            ></input>
          </div>
          <div className={styles.phone}>
            <label htmlFor="phoneNumber">Утас</label>
            <input
              type="tel"
              placeholder="Утасны дугаар"
              name="phoneNumber"
              id="phoneNumber"
              onChange={handleInputFormData}
              required
            ></input>
          </div>
        </div>
        <div className={styles.message}>
          <label htmlFor="description">Тайлбар</label>
          <textarea
            name="description"
            id="description"
            placeholder="Хүсэлтээ бичнэ үү"
            onChange={handleInputFormData}
            required
          ></textarea>
        </div>
        <button onClick={handleSubmit} type="submit">
          Илгээх
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
