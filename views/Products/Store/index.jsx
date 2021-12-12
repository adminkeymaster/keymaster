/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
//Next, React (core node_modules) imports must be placed here\
import Image from "next/image";
import {
  useState,
  useEffect,
  // useContext
} from "react";
import axios from "axios";
//import STORE from '@/store'

//import COMPOSITES from '@/composites'
import Carousel from "@/composites/Carousel";
//import COMPONENT from '@/components'

import styles from "./Store.module.scss";
// import { CartContext } from "@/store/CartContext";

const Store = (props) => {
  const [isFetched, setIsFetched] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get("/api/product", { signal: controller.signal })
      .then(({ data }) => {
        setProducts(data.data);
        setIsFetched(true);
      })
      .catch((err) => {
        console.log("/products fetch abort", err);
      });

    return () => controller.abort();
  }, []);
  return (
    <div className={styles.container}>
      {/* <div className={styles.feature}>
        <div className={styles.imageContainer}>
          <Image
            src="/KeymasterPack.png"
            layout="fill"
            objectFit="cover"
            alt="product image"
            priority
          />
        </div>
        <div className={styles.information}>
          <div className={styles.featureHeading}>
            <h2>Кимастер Багц</h2>
            <p>Өнгө: Олон төрөл</p>
            <p>Үнэ: 60'000₮</p>
          </div>
          <ul className={styles.featureList}>
            <li>Металл хайрцаг</li>
            <li>6 ширхэг төмөр иш</li>
            <li>Хурд хэмжих цагтай дэвсгэр</li>
            <li>Хайрцагт суурьлуулах суурь</li>
            <li>
              Хайрцаг нь өөрөө босгож тавиад тоглоомуудаа байршуулах шийдэлтэй
            </li>
          </ul>
        </div>
      </div> */}
      <div className={styles.products}>
        {isFetched &&
          products.map((product) => {
            return (
              <Carousel
                key={product._id}
                _id={product._id}
                photoLinks={product.photoLinks}
                productName={product.productName}
                productPrice={product.productPrice}
                color={product.color}
                hexColor={product.hexColor}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Store;
