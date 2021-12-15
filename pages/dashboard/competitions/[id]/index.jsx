//Next, React (core node_modules) imports must be placed here
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import DashboardLayout from "@/layouts/Dashboard";
//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'
import Notification from "@/components/Notification";

import styles from "./EditCompetition.module.scss";


const EditCompetitionPage = (props) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { id } = router.query;

  const [form, setForm] = useState({
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    newsLink: "",
  });
  const [notification, setNotification] = useState({
    message: "",
    success: false,
  });

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();
    const signal = controller.signal;
    axios
      .get(`/api/competition/${id}`, { signal: signal })
      .then(({ data }) => {
        // console.log(data.data);
        setForm(data.data);
      })
      .catch((err) => {
        console.log("EditCompetitionPage Fetch Aborted", err);
      });

    return () => controller.abort();
  }, [id]);

  useEffect(() => {
    if (!notification.message) return;

    const timer = setTimeout(() => {
      setNotification({
        message: "",
        success: false,
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification]);

  if (status === "loading") return null;
  if (!session || !session.user.isAdmin) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/competition", {
        compID: id,
        description: form.description,
        location: form.location,
        startDate: form.startDate,
        endDate: form.endDate,
        newsLink: form.newsLink,
      })
      .then((res) => {
        if (res.status === 200) {
          router.push(
            {
              pathname: "/dashboard/competitions",
              query: {
                message: "Тэмцээний мэдээлэл амжилттай засагдлаа",
                success: true,
              },
            },
            "/dashboard/competitions"
          );
        }
      })
      .catch((err) => {
        setNotification({
          message: "Тэмцээний мэдээлэл нэмэхэд алдаа гарлаа.",
          success: false,
        });
        console.log("/dashboard/competitions/[id] Submit:", err);
      });
  };

  return (
    <main className={styles.container}>
      <Notification
        message={notification.message}
        success={notification.success}
      />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.headingContainer}>
          <h1 className={styles.heading}>Тэмцээн нэмэх</h1>
          <button type="submit" className={styles.button}>
            Хадгалах
          </button>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.inputLabel}>
            Тайлбар
          </label>

          <textarea
            type="text"
            id="description"
            name="description"
            className={styles.inputArea}
            onChange={handleChange}
            defaultValue={form.description}
            spellCheck="false"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="location" className={styles.inputLabel}>
            Байршил
          </label>

          <textarea
            type="text"
            id="location"
            name="location"
            className={styles.inputArea}
            onChange={handleChange}
            defaultValue={form.location}
            spellCheck="false"
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
            defaultValue={form.startDate}
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
            defaultValue={form.endDate}
            className={styles.input}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="newsLink" className={styles.inputLabel}>
            Мэдээний Линк
          </label>

          <input
            type="text"
            id="newsLink"
            name="newsLink"
            className={styles.input}
            defaultValue={form.newsLink}
            onChange={handleChange}
          />
        </div>
      </form>
    </main>
  );
};

EditCompetitionPage.Layout = DashboardLayout;

export default EditCompetitionPage;
