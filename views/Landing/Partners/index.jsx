//Next, React (core node_modules) imports must be placed here
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
//import STORE from '@/store'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from './Partners.module.scss'

const Partners = (props) => {
	const { ref, inView } = useInView({
		threshold: 0.1,
		triggerOnce: true,
	  });
	  const animation = useAnimation();
	  useEffect(() => {
		if (inView) {
		  animation.start("visible");
		} else {
		  animation.start("hidden");
		}
	  }, [animation, inView]);
	
	  const container = {
		visible: {
		  opacity: 1,
		  transition: { duration: 1, staggerChildren: 0.3 },
		},
		hidden: {
		  opacity: 0,
		},
	  };
	  const children = {
		visible: {
		  y: 0,
		  opacity: 1,
		  transition: { duration: 1, ease: "easeInOut" },
		},
		hidden: {
		  y: 100,
		  opacity: 0,
		},
	  };
	 return (
		 <motion.div initial="hidden"
		 animate={animation} variants={container} ref={ref} className={styles.container}>
			      <motion.h2 variants={children}>Хамтрагч Байгууллагууд</motion.h2>
      <motion.div
      variants={children} className={styles.partnerships}>
        <div className={styles.logo}>
          <Image layout="fill" objectFit="contain" src="/mastermind.png" />
        </div>
      </motion.div>
		</motion.div>
	)
};

export default Partners;
