//Next, React (core node_modules) imports must be placed here
import Image from "next/image";
import { useContext } from "react";
import styled from "styled-components";
import { PermMedia } from "@styled-icons/material-outlined/PermMedia";
import { Plus } from "@styled-icons/entypo/Plus";
import { Minus } from "@styled-icons/entypo/Minus";
//import STORE from '@/store'
import { CartContext } from "@/store/CartContext";
//import COMPONENT from '@/components'

import styles from "./ProductCard.module.scss";

const StyledMediaIcon = styled(PermMedia)`
  width: 32%;
  height: 32%;
`;

const StyledPlusIcon = styled(Plus)`
  width: 1.6rem;
  height: 1.6rem;
`;

const StyledMinusIcon = styled(Minus)`
  width: 1.6rem;
  height: 1.6rem;
`;

const ProductCard = ({
  photoLink,
  productName,
  productPrice,
  color,
  hexColor,
  _id,
}) => {
  const { orders, addOrder, deleteOrder } = useContext(CartContext);

  const handleAdd = (e) => {
    addOrder(_id);
  };

  const handleDelete = (e) => {
    deleteOrder(_id);
  };

  return (
    <div className={styles.container} key={_id}>
      <div className={styles.imageContainer}>
        <Image src={photoLink} layout="fill" objectFit="cover" />
        <StyledMediaIcon />
      </div>

      <div className={styles.information}>
        <h2>{productName}</h2>
        <p>Үнэ: {productPrice}₮</p>
        <p className={styles.colorContainer}>
          Өнгө: {color}
          <span
            style={{
              backgroundColor: hexColor,
            }}
          ></span>
        </p>
      </div>
      <div className={styles.actions}>
        <span>
          {orders.find((order) => {
            return order.productID === _id;
          })?.quantity || 0}
        </span>
        <div className={styles.buttons}>
          <button className={styles.cardButton} onClick={handleAdd}>
            <StyledPlusIcon />
          </button>
          <button className={styles.cardButton} onClick={handleDelete}>
            <StyledMinusIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
