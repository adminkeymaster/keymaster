//Next, React (core node_modules) imports must be placed here
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
            message: "Бүтээгдэхүүнийг амжилттай устгалаа.",
            success: true,
          });
        }
      })
      .catch((err) => {
        setNotification({
          ...notification,
          message: "Бүтээгдэхүүн устгах үед алдаа гарлаа",
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
        <h1 className={styles.heading}>Бүтээгдэхүүн</h1>
        <Link href="/dashboard/products/create">
          <a className={styles.link}>Бүтээгдэхүүн Нэмэх</a>
        </Link>
      </div>
      <div className={styles.table}>
        <div className={styles.tableHead}>
          <div className={`${styles.tableHeadCol} ${styles.tableImage}`}>
            Зураг
          </div>
          <div className={`${styles.tableHeadCol} ${styles.tableTitle}`}>
            Нэр
          </div>
          <div className={`${styles.tableHeadCol} ${styles.tableColor}`}>
            Өнгө
          </div>

          <div className={`${styles.tableHeadCol} ${styles.tableType}`}>
            Төрөл
          </div>

          <div className={`${styles.tableHeadCol} ${styles.tablePrice}`}>
            Үнэ
          </div>

          <div className={`${styles.tableHeadCol} ${styles.tableAction}`}>
            Засах
          </div>
          <div className={`${styles.tableBodyCol} ${styles.tableAction}`}>
            Устгах
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
                      src={product.photoLink}
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
                    {product.color}
                  </div>

                  <div className={`${styles.tableBodyCol} ${styles.tableType}`}>
                    {product.type}
                  </div>

                  <div
                    className={`${styles.tableBodyCol} ${styles.tablePrice}`}
                  >
                    {product.productPrice}₮
                  </div>
                  <div
                    className={`${styles.tableBodyCol} ${styles.tableAction}`}
                  >
                    <Link href={`/dashboard/products/${product._id}`}>
                      <a className={styles.tableLink}>Засах</a>
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
                      Устгах
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
