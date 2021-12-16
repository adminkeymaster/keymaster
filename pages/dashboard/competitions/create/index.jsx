//Next, React (core node_modules) imports must be placed here
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import styled from "styled-components";
import { AddToQueue } from "@styled-icons/boxicons-solid/AddToQueue";
import { Cross } from "@styled-icons/entypo/Cross";

//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import DashboardLayout from "@/layouts/Dashboard";
//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'
import Notification from "@/components/Notification";

import styles from "./Create.module.scss";
import axios from "axios";

const StyledAddToQueue = styled(AddToQueue)`
  width: 1.6rem;
  height: 1.6rem;
`;

const StyledCrossIcon = styled(Cross)`
  width: 1.6rem;
  height: 1.6rem;
`;

const CreateCompetitionPage = (props) => {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [form, setForm] = useState({
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    newsLink: "",
    compName: "",
    type: [],
    ageGroup: [],
  });

  const [currentType, setCurrentType] = useState("");
  const [currentAgeGroup, setCurrentAgeGroup] = useState("");

  const [notification, setNotification] = useState({
    message: "",
    success: false,
  });

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
    Object.keys(form).forEach((key) => {
      if (!form[key]) {
        setNotification({
          message: `Бүх талбарыг бөглөнө үү`,
          success: false,
        });
        return;
      }
    });
    console.log(form);
    axios
      .post("/api/competition", form)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          router.push(
            {
              pathname: "/dashboard/competitions",
              query: {
                success: true,
                message: "Тэмцээн амжилттай нэмэгдлээ",
              },
            },
            "/dashboard/competitions"
          );
        }
      })
      .catch((err) => {
        setNotification({
          message: "Тэмцээн нэмэхэд алдаа гарлаа.",
          success: false,
        });
        console.log("CreateCompetitionPage Submit:", err);
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
            Нийтлэх
          </button>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="compName" className={styles.inputLabel}>
            Нэр
          </label>

          <input
            type="text"
            id="compName"
            name="compName"
            className={styles.input}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="ageGroup" className={styles.inputLabel}>
            Насны ангилал
          </label>

          <input
            type="text"
            id="ageGroup"
            name="ageGroup"
            className={styles.input}
            onChange={(e) => {
              setCurrentAgeGroup(e.target.value);
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setForm({
                ...form,
                ageGroup: [...form.ageGroup, currentAgeGroup],
              });
            }}
            type="button"
            className={styles.addButton}
          >
            <StyledAddToQueue />
          </button>

          {form.ageGroup.length > 0 && (
            <ul className={styles.list}>
              {form.ageGroup.map((age, index) => {
                return (
                  <li key={index}>
                    {age}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setForm({
                          ...form,
                          ageGroup: form.ageGroup.filter(
                            (item) => item !== age
                          ),
                        });
                      }}
                      className={styles.deleteButton}
                    >
                      <StyledCrossIcon />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="type" className={styles.inputLabel}>
            Тэмцээний төрөл
          </label>

          <input
            type="text"
            id="type"
            name="type"
            className={styles.input}
            onChange={(e) => {
              setCurrentType(e.target.value);
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setForm({
                ...form,
                type: [...form.type, currentType],
              });
            }}
            className={styles.addButton}
            type="button"
          >
            <StyledAddToQueue />
          </button>

          {form.type.length > 0 && (
            <ul className={styles.list}>
              {form.type.map((t, index) => {
                return (
                  <li key={index}>
                    {t}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setForm({
                          ...form,
                          type: form.type.filter((type) => type !== t),
                        });
                      }}
                      className={styles.deleteButton}
                    >
                      <StyledCrossIcon />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
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
            Мэдээнийы Линк
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
