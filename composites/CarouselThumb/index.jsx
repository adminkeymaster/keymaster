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
				<Image className={styles.emblaSlideThumbnail} width={200} height={200} src="/5pink.png" layout="responsive" alt="A cool cat." />
			</button>
		</div>
	)
};

export default CarouselThumb;
