//Next, React (core node_modules) imports must be placed here
import { useState, useEffect } from "react";
import axios from "axios";
//import STORE from '@/store'

//import COMPONENT from '@/components'
import CompetitionCard from "@/composites/CompetitionCard";
import styles from "./CompetitionTable.module.scss";

const CompetitionTable = (props) => {
  const [isFetched, setIsFetched] = useState(false);
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    axios.get("/api/competition", { signal: signal }).then(({ data }) => {
      setCompetitions(data.data.competitions);
      setIsFetched(true);
    });

    return () => controller.abort();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div className={`${styles.tableHeaderCol} ${styles.nameCol}`}>
            Тэмцээн
          </div>
          <div className={`${styles.tableHeaderCol} ${styles.startCol}`}>
            Эхлэх огноо
          </div>
          <div className={`${styles.tableHeaderCol} ${styles.endCol}`}>
            Дуусах огноо
          </div>
          <div className={`${styles.tableHeaderCol} ${styles.locationCol}`}>
            Байршил
          </div>
        </div>
        <div className={styles.tableBody}>
          {isFetched &&
            competitions.map((competition) => {
              console.log(competition);
              return (
                <CompetitionCard
                  key={competition._id}
                  name={competition.description}
                  startDate={competition.startDate}
                  endDate={competition.endDate}
                  location={competition.location}
				  newsLink={competition.newsLink}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CompetitionTable;
