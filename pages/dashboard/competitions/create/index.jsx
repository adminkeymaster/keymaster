//Next, React (core node_modules) imports must be placed here
import { useSession } from "next-auth/react";
import { useState } from "react";
//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import DashboardLayout from "@/layouts/Dashboard";
//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from "./Create.module.scss";
import axios from "axios";

const CreateCompetitionPage = (props) => {
  const { data: session, status } = useSession();
  if (status === "loading") return null;
  if (!session || !session.user.isAdmin) return null;

  const [form, setForm] = useState({
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    newsLink: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/competition", form)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          window.location.href = "/dashboard/competitions";
        }
      })
      .catch((err) => {
        console.log("CreateCompetitionPage Submit:", err);
      });
  };

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.headingContainer}>
          <h1 className={styles.heading}>Тэмцээн нэмэх</h1>
          <button type="submit" className={styles.button}>
            Нийтлэх
          </button>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.inputLabel}>
            Тайлбар
          </label>

          <input
            type="text"
            id="description"
            name="description"
            className={styles.input}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="location" className={styles.inputLabel}>
            Байршил
          </label>

          <input
            type="text"
            id="location"
            name="location"
            className={styles.input}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="startDate" className={styles.inputLabel}>
            Эхлэх огноо
          </label>

          <input
            type="date"
            id="startDate"
            name="startDate"
            className={styles.input}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="endDate" className={styles.inputLabel}>
            Дуусах огноо
          </label>

          <input
            type="date"
            id="endDate"
            name="endDate"
            className={styles.input}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="newsLink" className={styles.inputLabel}>
            Зургийн Линк
          </label>

          <input
            type="text"
            id="newsLink"
            name="newsLink"
            className={styles.input}
            onChange={handleChange}
          />
        </div>
      </form>
    </main>
  );
};

CreateCompetitionPage.Layout = DashboardLayout;

export default CreateCompetitionPage;
