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

  if (status === "loading") return null;
  if (!session || !session.user.isAdmin) return null;

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
            message: "?????????????????? ?????????????????? ????????????????????",
            success: true,
          });
        }
      })
      .catch((err) => {
        setNotification({
          message: "?????????????????? ?????????????????? ?????????? ?????????? ????????????",
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
            message: "???????????? ?????????????????? ????????????????????",
            success: true,
          });
        }
      })
      .catch((err) => {
        setNotification({
          message: "?????????????????? ???????????? ?????????? ?????????? ????????????",
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
        <h1 className={styles.heading}>???????????? ????????????</h1>
      </div>

      <div className={styles.table}>
        <div className={styles.tableHead}>
          <div className={`${styles.tableHeadCol} ${styles.tableFirstName}`}>
            ??????
          </div>
          <div className={`${styles.tableHeadCol} ${styles.tableLastName}`}>
            ????????
          </div>

          <div className={`${styles.tableHeadCol} ${styles.tableType}`}>
            ??????????
          </div>

          <div className={`${styles.tableHeadCol} ${styles.tableGender}`}>
            ????????
          </div>

          <div className={`${styles.tableHeadCol} ${styles.tableAge}`}>??????</div>

          <div className={`${styles.tableHeadCol} ${styles.tableTime}`}>
            ??????
          </div>

          <div className={`${styles.tableHeadCol} ${styles.tableAction}`}>
            ??????????????????
          </div>
          <div className={`${styles.tableHeadCol} ${styles.tableAction}`}>
            ????????????
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
                      {request.gender === "male" ? "????" : "????"}
                    </div>

                    <div
                      className={`${styles.tableBodyCol} ${styles.tableAge}`}
                    >
                      {calculateAgeByBirthday(request.birthDate)}
                    </div>

                    <div
                      className={`${styles.tableBodyCol} ${styles.tableTime}`}
                    >
                      {request.time}??
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
