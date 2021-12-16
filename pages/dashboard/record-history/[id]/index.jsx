//Next, React (core node_modules) imports must be placed here
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styled from "styled-components";
import { Check } from "@styled-icons/entypo/Check";
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

const StyledCheckIcon = styled(Check)`
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
  const [isFetched, setIsFetched] = useState(false);
  const [competitions, setCompetitions] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [form, setForm] = useState({
    competitionName: "",
    type: "",
    ageGroup: "",
    record: [],
  });

  const [keymasterType, setKeymasterType] = useState([]);

  const { id } = router.query;

  const [notification, setNotification] = useState({
    message: "",
    success: false,
  });

  useEffect(() => {
    axios.get("/api/keymasterTypes").then(({ data }) => {
      setKeymasterType(data.data);

      const record = data.data.map((type) => {
        return {
          keymasterType: type.keymasterType,
          time: "",
        };
      });

      setForm({
        ...form,
        record: record,
      });
    });

    axios
      .get("/api/competition")
      .then(({ data }) => {
        setCompetitions(data.data);
        setIsFetched(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  const handleRecordChange = (e) => {
    const newRecord = form.record.map((recordObj) => {
      if (recordObj.keymasterType === e.target.name) {
        return {
          ...recordObj,
          time: e.target.value,
        };
      } else {
        return recordObj;
      }
    });

    setForm({
      ...form,
      record: newRecord,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    axios
      .post(`/api/record-history/${id}`, form)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          router.push(
            {
              pathname: "/dashboard/record-history/",
              query: {
                success: true,
                message: "Хэрэглэгчийн мэдээлэл амжилттай хадгалагдлаа",
              },
            },
            "/dashboard/record-history/"
          );
        }
      })
      .catch((err) => {
        setNotification({
          message: "Мэдээлэл нэмэхэд алдаа гарлаа.",
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
      {isFetched && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.headingContainer}>
            <h1 className={styles.heading}>Хэрэглэгчийн тэмцээний мэдээлэл</h1>
            <button type="submit" className={styles.button}>
              Хадгалаx
            </button>
          </div>
          <div className={styles.formGroup}>
            <span className={styles.inputLabel}>Тэмцээний нэр</span>
            {(!selectedCompetition && (
              <div className={styles.cardContainer}>
                {competitions.map((competition) => {
                  return (
                    <div
                      className={styles.competitionCard}
                      key={competition._id}
                    >
                      <button
                        className={styles.cardAddButton}
                        type="button"
                        onClick={(e) => {
                          setSelectedCompetition(competition);
                          setForm({
                            ...form,
                            competitionName: competition.compName,
                          });
                        }}
                      >
                        <StyledCheckIcon />
                      </button>
                      <span>{competition.compName}</span>
                    </div>
                  );
                })}
              </div>
            )) || (
              <div className={styles.selected}>
                <h2>{selectedCompetition.compName}</h2>
                <button
                  type="button"
                  className={styles.button}
                  onClick={(e) => {
                    setSelectedCompetition(null);
                    setForm({
                      competitionName: "",
                      type: "",
                      ageGroup: "",
                      record: [],
                    });
                  }}
                >
                  Өөрчлөх
                </button>
              </div>
            )}
          </div>
          {selectedCompetition && (
            <div className={styles.formGroup}>
              <span className={styles.inputLabel}>Насны ангилал</span>
              {(!form.ageGroup && (
                <ul className={styles.list}>
                  {selectedCompetition.ageGroup.map((age, index) => {
                    return (
                      <li key={index}>
                        {age}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setForm({
                              ...form,
                              ageGroup: age,
                            });
                          }}
                          className={styles.cardAddButton}
                        >
                          <StyledCheckIcon />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )) || (
                <div className={styles.selected}>
                  <h2>{form.ageGroup}</h2>
                  <button
                    type="button"
                    className={styles.button}
                    onClick={(e) => {
                      setForm({
                        ...form,
                        ageGroup: "",
                      });
                    }}
                  >
                    Өөрчлөх
                  </button>
                </div>
              )}
            </div>
          )}
          {selectedCompetition && (
            <div className={styles.formGroup}>
              <span className={styles.inputLabel}>Тэмцээний төрөл</span>
              {(!form.type && (
                <ul className={styles.list}>
                  {selectedCompetition.type.map((t, index) => {
                    return (
                      <li key={index}>
                        {t}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setForm({
                              ...form,
                              type: t,
                            });
                          }}
                          className={styles.cardAddButton}
                        >
                          <StyledCheckIcon />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )) || (
                <div className={styles.selected}>
                  <h2>{form.type}</h2>
                  <button
                    type="button"
                    className={styles.button}
                    onClick={(e) => {
                      setForm({
                        ...form,
                        type: "",
                      });
                    }}
                  >
                    Өөрчлөх
                  </button>
                </div>
              )}
            </div>
          )}

          {keymasterType.map((type, index) => {
            return (
              <div className={styles.formGroup} key={index}>
                <label
                  className={styles.inputLabel}
                  htmlFor={type.keymasterType}
                >
                  {type.keymasterType} (сек)
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  id={type.keymasterType}
                  name={type.keymasterType}
                  className={styles.input}
                  onChange={handleRecordChange}
                />
              </div>
            );
          })}
        </form>
      )}
    </main>
  );
};

CreateCompetitionPage.Layout = DashboardLayout;

export default CreateCompetitionPage;
