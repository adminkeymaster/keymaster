//Next, React (core node_modules) imports must be placed here
import { Fragment } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
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

import styles from "./Products.module.scss";

const ProductsPage = (props) => {
  const { data: session, status } = useSession();

  const router = useRouter();
  const { query } = router;
  const [isFetched, setIsFetched] = useState(false);
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState({
    message: "",
    success: false,
  });

  useEffect(() => {
    if (query) {
      setNotification({
        ...notification,
        message: query.message,
        success: query.success,
      });
    }
    const controller = new AbortController();
    axios
      .get("/api/product", { signal: controller.signal })
      .then(({ data }) => {
        // Reverse the array so the newest news is first
        setProducts(data.data.reverse());
        setIsFetched(true);
      })
      .catch((err) => {
        console.log("/dashboard/products fetch aborted", err);
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

  const handleDelete = (e) => {
    axios
      .delete(`/api/product/${e.target.id}`)
      .then((res) => {
        if (res.status === 200) {
          setProducts(
            products.filter((product) => product._id !== e.target.id)
          );
          setNotification({
            ...notification,
            message: "?????????????????????????????? ?????????????????? ????????????????.",
            success: true,
          });
        }
      })
      .catch((err) => {
        setNotification({
          ...notification,
          message: "???????????????????????? ???????????? ?????? ?????????? ????????????",
          success: false,
        });
        console.log("ProductsPage handleDelete:", err);
      });
  };

  return (
    <main className={styles.container}>
      <Notification
        message={notification.message}
        success={notification.success}
      />
      <div className={styles.headingContainer}>
        <h1 className={styles.heading}>????????????????????????</h1>
        <Link href="/dashboard/products/create">
          <a className={styles.link}>???????????????????????? ??????????</a>
        </Link>
      </div>
      <div className={styles.table}>
        <div className={styles.tableHead}>
          <div className={`${styles.tableHeadCol} ${styles.tableImage}`}>
            ??????????
          </div>
          <div className={`${styles.tableHeadCol} ${styles.tableTitle}`}>
            ??????
          </div>
          <div className={`${styles.tableHeadCol} ${styles.tableColor}`}>
            ????????
          </div>

          <div className={`${styles.tableHeadCol} ${styles.tableType}`}>
            ??????????
          </div>

          <div className={`${styles.tableHeadCol} ${styles.tablePrice}`}>
            ??????
          </div>

          <div className={`${styles.tableHeadCol} ${styles.tableAction}`}>
            ??????????
          </div>
          <div className={`${styles.tableBodyCol} ${styles.tableAction}`}>
            ????????????
          </div>
        </div>

        <div className={styles.tableBody}>
          {isFetched &&
            products.map((product) => {
              return (
                <div className={styles.tableRow} key={product._id}>
                  <div
                    className={`${styles.tableBodyCol} ${styles.tableImage}`}
                  >
                    <Image
                      src={product.photoLinks[0]}
                      alt={product.productName}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div
                    className={`${styles.tableBodyCol} ${styles.tableTitle}`}
                  >
                    {product.productName}
                  </div>

                  <div
                    className={`${styles.tableBodyCol} ${styles.tableColor}`}
                  >
                    {product.hexColor.length > 0 &&
                      product.hexColor.map((color, index) => {
                        return (
                          <Fragment key={index}>
                            <span
                              className={styles.hexColor}
                              style={{
                                backgroundColor: color,
                              }}
                            ></span>
                          </Fragment>
                        );
                      })}
                  </div>

                  <div className={`${styles.tableBodyCol} ${styles.tableType}`}>
                    {product.type}
                  </div>

                  <div
                    className={`${styles.tableBodyCol} ${styles.tablePrice}`}
                  >
                    {product.productPrice}???
                  </div>
                  <div
                    className={`${styles.tableBodyCol} ${styles.tableAction}`}
                  >
                    <Link href={`/dashboard/products/${product._id}`}>
                      <a className={styles.tableLink}>??????????</a>
                    </Link>
                  </div>

                  <div
                    className={`${styles.tableBodyCol} ${styles.tableAction}`}
                  >
                    <button
                      className={styles.tableButton}
                      id={product._id}
                      onClick={handleDelete}
                    >
                      ????????????
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </main>
  );
};

ProductsPage.Layout = DashboardLayout;

export default ProductsPage;
