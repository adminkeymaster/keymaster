//Next, React (core node_modules) imports must be placed here
import Image from "next/image"
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import CarouselThumb from '@/composites/CarouselThumb';
//import STORE from '@/store'

//import COMPONENT from '@/components'

import styles from './Carousel.module.scss'

const Carousel = ({slides}) => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [mainViewportRef, embla] = useEmblaCarousel({ skipSnaps: false });
	const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
	  containScroll: "keepSnaps",
	  selectedClass: "",
	  dragFree: true
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
			<div className={styles.embla}>
        <div className={styles.emblaViewport} ref={mainViewportRef}>
          <div className={styles.emblaContainer}>
            {slides.map((index) => (
              <div className={styles.emblaSlide} key={index}>
                <div className={styles.emblaSlideInner}>
					<div className={styles.image}>
                  <Image
                    className={styles.emblaSlideImg}
                    src="/5pink.png"
                    alt="image"
					layout="fill"
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
          <div className={`${styles.emblaContainer} ${styles.emblaContainerThumb}`}>
            {slides.map((index) => (
              <CarouselThumb
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                imgSrc={"/5pink.png"}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
		</div>
	)
};

export default Carousel;
