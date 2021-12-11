//Next, React (core node_modules) imports must be placed here
import Image from "next/image";
import { useState, useEffect, useCallback, useRef, useContext } from "react";
import styled from "styled-components";
import useEmblaCarousel from "embla-carousel-react";
import CarouselThumb from "@/composites/CarouselThumb";
import { Plus } from "@styled-icons/entypo/Plus";
import { Minus } from "@styled-icons/entypo/Minus";
//import STORE from '@/store'
import { CartContext } from "@/store/CartContext";
//import COMPONENT from '@/components'

import styles from "./Carousel.module.scss";

const StyledPlusIcon = styled(Plus)`
  width: 1.6rem;
  height: 1.6rem;
`;

const StyledMinusIcon = styled(Minus)`
  width: 1.6rem;
  height: 1.6rem;
`;
const Carousel = ({
  slides,
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

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainViewportRef, embla] = useEmblaCarousel({ skipSnaps: false });
  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: "keepSnaps",
    selectedClass: "",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!embla || !emblaThumbs) return;
      if (emblaThumbs.clickAllowed()) embla.scrollTo(index);
    },
    [embla, emblaThumbs]
  );

  const onSelect = useCallback(() => {
    if (!embla || !emblaThumbs) return;
    setSelectedIndex(embla.selectedScrollSnap());
    emblaThumbs.scrollTo(embla.selectedScrollSnap());
  }, [embla, emblaThumbs, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
  }, [embla, onSelect]);

  return (
    <div className={styles.container}>
      <div className={styles.carousel}>
        <div className={styles.embla}>
          <div className={styles.emblaViewport} ref={mainViewportRef}>
            <div className={styles.emblaContainer}>
              {photoLinks.map((photoLink, index) => (
                <div className={styles.emblaSlide} key={index}>
                  <div className={styles.emblaSlideInner}>
                    <div className={styles.image}>
                      <Image
                        width={"100%"}
                        height={"100%"}
                        layout="responsive"
                        objectFit="contain"
                        src={photoLink}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`${styles.embla} ${styles.emblaThumb}`}>
          <div className={styles.emblaViewport} ref={thumbViewportRef}>
            <div
              className={`${styles.emblaContainer} ${styles.emblaContainerThumb}`}
            >
              {photoLinks.map((photoLink, index) => (
                <CarouselThumb
                  onClick={() => onThumbClick(index)}
                  selected={index === selectedIndex}
                  src={photoLink}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.productInfo}>
        <div className={styles.information}>
          <h2>{productName}</h2>
          <p>Үнэ: {productPrice}₮</p>
          <p className={styles.colorContainer}>
            Өнгө:
            {hexColor.map((color, index) => {
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
    </div>
  );
};

export default Carousel;
