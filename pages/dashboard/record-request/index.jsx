//Next, React (core node_modules) imports must be placed here
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
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

import styles from "./RecordRequest.module.scss";

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
  if (status === "loading") return null;
  if (!session || !session.user.isAdmin) return null;
  
  const [isFetched, setIsFetched] = useState(false);
  const [recordRequests, setRecordRequests] = useState([]);
  const [notification, setNotification] = useState({
    message: "",
    successs: false,
  });

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get("/api/record-request", { signal: controller.signal })
      .then(({ data }) => {
        // Reverse the array so the newest request is first
        setRecordRequests(data.data.reverse());
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

  const handleApprove = (id) => {
    axios
      .post(`/api/record-request/${id}`, { approval: true })
      .then((res) => {
        if (res.status === 200) {
          const newRecordRequests = recordRequests.filter(
            (request) => request._id !== id
          );
          setRecordRequests([...newRecordRequests]);

          setNotification({
            message: "Хүсэлтийг амжилттай зөвшөөрлөө",
            success: true,
          });
        }
      })
      .catch((err) => {
        setNotification({
          message: "Хүсэлтийг зөвшөөрөх явцад алдаа гарлаа",
          success: false,
        });
        console.log("/dashboard/record-request", err);
      });
  };

  const handleDeny = (id) => {
    axios
      .post(`/api/record-request/${id}`, { approval: false })
      .then((res) => {
        if (res.status === 200) {
          const newRecordRequests = recordRequests.filter((request) => {
            return request._id !== id;
          });

          setRecordRequests([...newRecordRequests]);
          setNotification({
            message: "Хүсэлт амжилттай устгагдлаа",
            success: true,
          });
        }
      })
      .catch((err) => {
        setNotification({
          message: "Хүсэлтийг устгах явцад алдаа гарлаа",
          success: false,
        });
        console.log("/dashboard/record-request", err);
      });
  };

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

  return (
    <main className={styles.container}>
      <Notification
        message={notification.message}
        success={notification.success}
      />
      <div className={styles.headingContainer}>
        <h1 className={styles.heading}>Рекорд хүсэлт</h1>
      </div>

      <div className={styles.table}>
        <div className={styles.tableHead}>
          <div className={`${styles.tableHeadCol} ${styles.tableFirstName}`}>
            Нэр
          </div>
          <div className={`${styles.tableHeadCol} ${styles.tableLastName}`}>
            Овог
          </div>

          <div className={`${styles.tableHeadCol} ${styles.tableType}`}>
            Төрөл
          </div>

          <div className={`${styles.tableHeadCol} ${styles.tableGender}`}>
            Хүйс
          </div>

          <div className={`${styles.tableHeadCol} ${styles.tableAge}`}>Нас</div>

          <div className={`${styles.tableHeadCol} ${styles.tableTime}`}>
            Цаг
          </div>

          <div className={`${styles.tableHeadCol} ${styles.tableAction}`}>
            Зөвшөөрөх
          </div>
          <div className={`${styles.tableHeadCol} ${styles.tableAction}`}>
            Устгах
          </div>
        </div>

        <div className={styles.tableBody}>
          {isFetched &&
            recordRequests.map((request, index) => {
              return (
                <div className={styles.tableRowContainer} key={request._id}>
                  <div className={styles.tableRow}>
                    <div
                      className={`${styles.tableBodyCol} ${styles.tableFirstName}`}
                    >
                      {request.firstName}
                    </div>
                    <div
                      className={`${styles.tableBodyCol} ${styles.tableLastName}`}
                    >
                      {request.lastName}
                    </div>

                    <div
                      className={`${styles.tableBodyCol} ${styles.tableType}`}
                    >
                      {request.keymasterType}
                    </div>

                    <div
                      className={`${styles.tableBodyCol} ${styles.tableGender}`}
                    >
                      {request.gender === "male" ? "эр" : "эм"}
                    </div>

                    <div
                      className={`${styles.tableBodyCol} ${styles.tableAge}`}
                    >
                      {calculateAgeByBirthday(request.birthDate)}
                    </div>

                    <div
                      className={`${styles.tableBodyCol} ${styles.tableTime}`}
                    >
                      {request.time}с
                    </div>
                    <div
                      className={`${styles.tableBodyCol} ${styles.tableAction}`}
                    >
                      <button
                        className={styles.tableButton}
                        onClick={(e) => {
                          e.preventDefault();
                          handleApprove(request._id);
                        }}
                      >
                        <StyledCheckIcon />
                      </button>
                    </div>
                    <div
                      className={`${styles.tableBodyCol} ${styles.tableAction}`}
                    >
                      <button
                        className={styles.tableButton}
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeny(request._id);
                        }}
                      >
                        <StyledCrossIcon />
                      </button>
                    </div>
                  </div>
                  <div className={styles.videoContainer}>
                    <video muted controls>
                      <source src={request.videoLink} type="video/mp4" />
                    </video>
                  </div>
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
