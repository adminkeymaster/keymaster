import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion"
import styles from "./DropDownDiv.module.scss";

const DropDownDiv = ({ children, className, as, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  const animation = useAnimation();
  useEffect(() => {
    if (isOpen) {
      animation.start("visible");
    } else {
      animation.start("hidden");
    }
  }, [animation, isOpen]);

  const open = {
    visible: {
      height: "max-content",
      transition: { duration: 0.2 },
    },
    hidden: {
      height: 0,
    },
  };
  const openChildren = {
    visible: {
      opacity: 1,
      transition: { duration: 0.2, delay: 0.2 },
    },
    hidden: {
      opacity: 0,
    },
  }

  return (
    <div
      className={
        className ? `${className} ${styles.container}` : `${styles.container}`
      }
      onClick={handleClick}
    >
      {as && as}
      <motion.div initial="hidden"
        animate={animation}
        variants={open} >{isOpen && <motion.div initial="hidden" animate="visible" variants={openChildren} >{children}</motion.div>}</motion.div>
    </div>
  );
};

export default DropDownDiv;
