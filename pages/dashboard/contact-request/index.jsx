//Next, React (core node_modules) imports must be placed here
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import DashboardLayout from "@/layouts/Dashboard";
//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from "./ContactRequest.module.scss";

const ContactRequestPage = (props) => {
  const { data: session, status } = useSession();

  const [isFetched, setIsFetched] = useState(false);
  const [contactRequests, setContactRequests] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    axios
      .get("/api/contact", { signal: signal })
      .then(({ data }) => {
        setContactRequests(data.data);
        setIsFetched(true);
      })
      .catch((err) => {
        console.log("/dashboard/contact-request fetch aborted", err);
      });

    return () => controller.abort();
  }, []);

  if (status === "loading") return null;
  if (!session || !session.user.isAdmin) return null;

  return (
    <main className={styles.container}>
      <div className={styles.headingContainer}>
        <h1 className={styles.heading}>Contact Request</h1>
      </div>
      <div className={styles.table}>
        <div className={styles.tableHead}>
          <div className={`${styles.tableHeadCol} ${styles.tableDescription}`}>
            Хүсэлт
          </div>

          <div className={`${styles.tableHeadCol} ${styles.tableEmail}`}>
            Цахим Шуудан
          </div>

          <div className={`${styles.tableHeadCol} ${styles.tableLastName}`}>
            Овог
          </div>

          <div className={`${styles.tableHeadCol} ${styles.tableFirstName}`}>
            Нэр
          </div>

          <div className={`${styles.tableHeadCol} ${styles.tableTel}`}>
            Утас
          </div>
        </div>

        <div className={styles.tableBody}>
          {isFetched &&
            contactRequests.map((contactRequest) => {
              return (
                <div className={styles.tableRow} key={contactRequest._id}>
                  <div
                    className={`${styles.tableBodyCol} ${styles.tableDescription}`}
                  >
                    {contactRequest.description}
                  </div>
                  <div
                    className={`${styles.tableBodyCol} ${styles.tableEmail}`}
                  >
                    {contactRequest.email}
                  </div>
                  <div
                    className={`${styles.tableBodyCol} ${styles.tableLastName}`}
                  >
                    {contactRequest.lastName}
                  </div>
                  <div
                    className={`${styles.tableBodyCol} ${styles.tableFirstName}`}
                  >
                    {contactRequest.firstName}
                  </div>
                  <div className={`${styles.tableBodyCol} ${styles.tableTel}`}>
                    {contactRequest.phoneNumber}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </main>
  );
};

ContactRequestPage.Layout = DashboardLayout;

export default ContactRequestPage;
