//Next, React (core node_modules) imports must be placed here
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import DashboardLayout from "@/layouts/Dashboard";
//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from "./Competitions.module.scss";

const CompetitionsPage = (props) => {
  const { data: session, status } = useSession();
  if (status === "loading") return null;
  if (!session || !session.user.isAdmin) return null;

  const [isFetched, setIsFetched] = useState(false);
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    axios
      .get("/api/competition", { signal: signal })
      .then(({ data }) => {
        setCompetitions(data.data.competitions);
        setIsFetched(true);
      })
      .catch((err) => {
        console.log("CompetitionsPage Fetch Aborted", err);
      });

    return () => controller.abort();
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();

    axios
      .delete(`/api/competition/${e.target.id}`)
      .then((res) => {
        if (res.status === 200) {
          setCompetitions(
            competitions.filter(
              (competition) => competition._id !== e.target.id
            )
          );
        }
      })
      .catch((err) => {
        console.log("CompetitionsPage handleDelete", err);
      });
  };

  return (
    <main className={styles.container}>
      <div className={styles.headingContainer}>
        <h1 className={styles.heading}>Тэмцээн</h1>
        <Link href="/dashboard/competitions/create">
          <a className={styles.link}>Тэмцээн Нэмэх</a>
        </Link>
      </div>

      <div className={styles.table}>
        <div className={styles.tableHead}>
          <div className={`${styles.tableHeadCol} ${styles.tableDescription}`}>
            Тэмцээн Тайлбар
          </div>
          <div className={`${styles.tableHeadCol} ${styles.tableLocation}`}>
            Байршил
          </div>
          <div className={`${styles.tableHeadCol} ${styles.tableDate}`}>
            Эхлэх огноо
          </div>

          <div className={`${styles.tableHeadCol} ${styles.tableDate}`}>
            Дуусах огноо
          </div>

          <div className={`${styles.tableHeadCol} ${styles.tableAction}`}>
            Засах
          </div>

          <div className={`${styles.tableHeadCol} ${styles.tableAction}`}>
            Устгах
          </div>
        </div>

        {isFetched && (
          <div className={styles.tableBody}>
            {competitions.map((competition) => {
              return (
                <div className={styles.tableRow} key={competition._id}>
                  <div
                    className={`${styles.tableBodyCol} ${styles.tableDescription}`}
                  >
                    {competition.description}
                  </div>
                  <div
                    className={`${styles.tableBodyCol} ${styles.tableLocation}`}
                  >
                    {competition.location}
                  </div>
                  <div className={`${styles.tableBodyCol} ${styles.tableDate}`}>
                    {competition.startDate}
                  </div>
                  <div className={`${styles.tableBodyCol} ${styles.tableDate}`}>
                    {competition.endDate}
                  </div>
                  <div
                    className={`${styles.tableBodyCol} ${styles.tableAction}`}
                  >
                    <Link href={`/dashboard/competitions/${competition._id}`}>
                      <a className={styles.link}>Засах</a>
                    </Link>
                  </div>
                  <div
                    className={`${styles.tableBodyCol} ${styles.tableAction}`}
                  >
                    <button
                      id={competition._id}
                      className={styles.button}
                      onClick={handleDelete}
                    >
                      Устгах
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

CompetitionsPage.Layout = DashboardLayout;

export default CompetitionsPage;
