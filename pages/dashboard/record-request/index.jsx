//Next, React (core node_modules) imports must be placed here
import { useEffect, useState } from "react";
import axios from "axios";

import styled from "styled-components";
import { Sort } from "@styled-icons/boxicons-regular/Sort";
import { AttachMoney } from "@styled-icons/material/AttachMoney";
import { MoneyOff } from "@styled-icons/material/MoneyOff";
//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import DashboardLayout from "@/layouts/Dashboard";
//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from "./RecordRequest.module.scss";

const StyledSortIcon = styled(Sort)`
  width: 1.6rem;
  height: 1.6rem;
  margin-left: 0.5rem;
`;

const StyledStatusIcon = styled(AttachMoney)`
  width: 3.2rem;
  height: 3.2rem;
  color: #ff6b00;
`;

const StyledNotStatusIcon = styled(MoneyOff)`
  width: 3.2rem;
  height: 3.2rem;
  color: #ed1e42;
`;

const RecordRequestPage = (props) => {
  const [isFetched, setIsFetched] = useState(false);
  const [productRequests, setProductRequests] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get("/api/record-request", { signal: controller.signal })
      .then(({ data }) => {
        console.log(data.data);
        // Reverse the array so the newest request is first
        setProductRequests(data.data.reverse());
        setIsFetched(true);
      })
      .catch((err) => {
        console.log("/dashboard/products/request fetch aborted", err);
      });

    return () => controller.abort();
  }, []);

  return (
    <main className={styles.container}>
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

          <div className={`${styles.tableHeadCol} ${styles.tableEmail}`}>
            Цахим шуудан
          </div>

          <div className={`${styles.tableHeadCol} ${styles.tableTel}`}>
            Утасны Дугаар
          </div>

          <div
            className={`${styles.tableHeadCol} ${styles.tableStatus} ${styles.filter}`}
          >
            Төлөв <StyledSortIcon />
          </div>

          <div className={`${styles.tableHeadCol} ${styles.tableAction}`}>
            Баталгаажуулах
          </div>
        </div>

        <div className={styles.tableBody}>
          {/* {isFetched &&
          productRequests.map((request) => {
            return (
              <div
                className={
                  request.status
                    ? `${styles.tableRowContainer} ${styles.isVerified}`
                    : `${styles.tableRowContainer}`
                }
                key={request._id}
              >
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
                    className={`${styles.tableBodyCol} ${styles.tableEmail}`}
                  >
                    {request.email}
                  </div>
                  <div
                    className={`${styles.tableBodyCol} ${styles.tableTel}`}
                  >
                    {request.phoneNumber}
                  </div>

                  <div
                    className={`${styles.tableBodyCol} ${styles.tableStatus}`}
                  >
                    {(request.status && <StyledStatusIcon />) || (
                      <StyledNotStatusIcon />
                    )}
                  </div>

                  <div
                    className={`${styles.tableBodyCol} ${styles.tableAction}`}
                  >
                    <button
                      className={styles.tableButton}
                      id={request._id}
                    >
                      {(request.status && "Буцаах") || "Баталгаажуулах"}
                    </button>
                  </div>
                </div>

                <div className={styles.tableRowProduct}>
                  <div className={styles.productNetPrice}>
                    <span>Нийт үнэ:</span>
                    <span>
                      {request.productInfo.reduce((prev, current) => {
                        return (
                          prev.productPrice * prev.quantity +
                          current.productPrice * current.quantity
                        );
                      })}
                      ₮
                    </span>
                  </div>
                  {request.productInfo.map((product) => {
                    return (
                      <div
                        className={styles.productInfoContainer}
                        key={product._id}
                      >
                        <div className={styles.productInfo}>
                          <span>Нэр:</span>
                          <span>{product.productName}</span>
                        </div>
                        <div className={styles.productInfo}>
                          <span>Төрөл:</span>
                          <span>{product.type}</span>
                        </div>
                        <div className={styles.productInfo}>
                          <span>Өнгө:</span>
                          <span>{product.color}</span>
                        </div>
                        <div className={styles.productInfo}>
                          <span>Тоо (ш):</span>
                          <span>{product.quantity}</span>
                        </div>
                        <div className={styles.productInfo}>
                          <span>Үнэ:</span>
                          <span>{product.productPrice}₮</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })} */}
        </div>
      </div>
    </main>
  );
};

RecordRequestPage.Layout = DashboardLayout;

export default RecordRequestPage;
