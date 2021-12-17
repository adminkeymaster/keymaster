//Next, React (core node_modules) imports must be placed here
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

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

import styles from "./RecordHistory.module.scss";

const StyledCheckIcon = styled(Check)`
  width: 1.6rem;
  height: 1.6rem;
`;

const StyledCrossIcon = styled(Cross)`
  width: 1.6rem;
  height: 1.6rem;
`;

const RecordRequestPage = (props) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isFetched, setIsFetched] = useState(false);
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState({
    message: "",
    successs: false,
  });

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get("/api/record-history", { signal: controller.signal })
      .then(({ data }) => {
        // Reverse the array so the newest request is first
        console.log(data);
        setUsers(data.data);
        setIsFetched(true);
      })
      .catch((err) => {
        console.log("/dashboard/products/request fetch aborted", err);
      });

    return () => controller.abort();
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

  const calculateAgeByBirthday = (birthday) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleRecordDelete = (e) => {
    e.preventDefault();
    console.log(e.currentTarget.dataset);
    const userId = e.currentTarget.dataset.userId;
    const competitionId = e.currentTarget.dataset.competitionId;

    axios.post(`/api/record-history/${userId}`, {
      compID: competitionId
    }).then((res) => {
      if (res.status === 200) {
        // remove competition from users
        const newData = users.map((user) => {
          if (user._id === userId) {
            const newCompetitions = user.lastComp.filter(
              (competition) => competition._id !== competitionId
            );
            user.lastComp = newCompetitions;
          }
          return user;
        });

        console.log(newData);

        setUsers(newData);

        setNotification({
          message: "Хэрэглэгчийн мэдээлэл амжилттай устгагдлаа",
          success: "true",
        });
      }
    });
  };

  return (
    <main className={styles.container}>
      <Notification
        message={notification.message}
        success={notification.success}
      />
      <div className={styles.headingContainer}>
        <h1 className={styles.heading}>Сүүлд оролцсон тэмцээн нэмэх</h1>
      </div>

      <div className={styles.table}>
        <div className={styles.tableHead}>
          <div className={`${styles.tableHeadCol} ${styles.tableFirstName}`}>
            Нэр
          </div>
          <div className={`${styles.tableHeadCol} ${styles.tableLastName}`}>
            Овог
          </div>

          <div className={`${styles.tableHeadCol} ${styles.tableEmail}`}>
            Email
          </div>

          <div className={`${styles.tableHeadCol} ${styles.tableAge}`}>Нас</div>

          <div className={`${styles.tableHeadCol} ${styles.tableAction}`}>
            Тэмцээн
          </div>
        </div>

        <div className={styles.tableBody}>
          {isFetched &&
            users.map((user, index) => {
              return (
                <div className={styles.tableRowContainer} key={user._id}>
                  <div className={styles.tableRow}>
                    <div
                      className={`${styles.tableBodyCol} ${styles.tableFirstName}`}
                    >
                      {user.firstName}
                    </div>
                    <div
                      className={`${styles.tableBodyCol} ${styles.tableLastName}`}
                    >
                      {user.lastName}
                    </div>

                    <div
                      className={`${styles.tableBodyCol} ${styles.tableEmail}`}
                    >
                      {user.email}
                    </div>

                    <div
                      className={`${styles.tableBodyCol} ${styles.tableAge}`}
                    >
                      {calculateAgeByBirthday(user.birthDate)}
                    </div>

                    <div
                      className={`${styles.tableBodyCol} ${styles.tableAction}`}
                    >
                      <Link href={`/dashboard/record-history/${user._id}`}>
                        <a className={styles.link}>Нэмэх</a>
                      </Link>
                    </div>
                  </div>

                  {user.lastComp.length > 0 && (
                    <div className={styles.cardContainer}>
                      {user.lastComp.map((competition) => {
                        return (
                          <div
                            className={styles.competitionCard}
                            key={competition._id}
                          >
                            <button
                              data-user-id={user._id}
                              data-competition-id={competition._id}
                              className={styles.cardDeleteButton}
                              onClick={handleRecordDelete}
                            >
                              <StyledCrossIcon />
                            </button>
                            <span>Тэмцээний нэр: {competition.compName}</span>
                            <span>Насны ангилал: {competition.ageGroup}</span>
                            <span>Тэмцээний төрөл: {competition.type}</span>
                            {competition.record.length > 0 &&
                              competition.record.map((record, index) => {
                                return (
                                  <span key={index}>
                                    {record.keymasterType}: {record.time}с
                                  </span>
                                );
                              })}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </main>
  );
};

RecordRequestPage.Layout = DashboardLayout;

export default RecordRequestPage;
