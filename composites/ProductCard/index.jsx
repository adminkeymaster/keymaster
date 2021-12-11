//Next, React (core node_modules) imports must be placed here
import Image from "next/image";
import { useState, useRef, useContext } from "react";
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
  photoLinks,
  productName,
  productPrice,
  hexColor,
  _id,
  ...props
}) => {
  const { orders, addOrder, deleteOrder } = useContext(CartContext);

  const handleAdd = (e) => {
    addOrder(_id);
  };

  const handleDelete = (e) => {
    deleteOrder(_id);
  };

  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();
  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
      console.log("clicked")
    }
  };
  return (
    <div className={styles.container} key={_id}>
      {showModal ? (<div onClick={closeModal} ref={modalRef} className={styles.modalBackground}>
        <div className={styles.modalImageContainer} showModal={showModal}>
          <Image
            src={photoLinks[0]}
            layout="fill"
            objectFit="cover"
            alt="product image"
            priority
          />
        </div>
      </div>) : null}
      <div className={styles.imageContainer} onClick={() => setShowModal(prev => !prev)}>
        <Image
          src={photoLinks[0]}
          layout="fill"
          objectFit="cover"
          alt="product image"
        />
        <StyledMediaIcon />
      </div>

      <div className={styles.information}>
        <h2>{productName}</h2>
        <p>Үнэ: {productPrice}₮</p>
        <p className={styles.colorContainer}>
          Өнгө: {hexColor.map((color, index) => {
              return (
                <span
                  key={index}
                  style={{
                    backgroundColor: color,
                  }}
                ></span>
              );
            })}
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
