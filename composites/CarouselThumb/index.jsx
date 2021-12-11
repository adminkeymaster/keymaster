//Next, React (core node_modules) imports must be placed here
import Image from 'next/image';
//import STORE from '@/store'

//import COMPONENT from '@/components'

import styles from './CarouselThumb.module.scss'

const CarouselThumb = (selected, onClick, imgSrc) => {
	return (
		<div
			className={`${styles.emblaSlide} ${styles.emblaSlideThumb} ${selected ? `${styles.isSelected}` : ""
				}`}
		>
			<button
				onClick={onClick}
				className={`${styles.emblaSlideInner} ${styles.emblaSlideInnerThumb}`}
				type="button"
			>
					<div className={styles.image}>
						<Image src="/AboutCover.jpg" width={"100%"} height={"100%"} layout="responsive" objectFit="cover" alt="Poor internet connection" />
					</div>
			</button>
		</div>
	)
};

export default CarouselThumb;
