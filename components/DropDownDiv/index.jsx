import { useState } from "react";

import styles from "./DropDownDiv.module.scss";

const DropDownDiv = ({ children, className, as, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={
        className ? `${className} ${styles.container}` : `${styles.container}`
      }
      onClick={handleClick}
    >
      {as && as}
      {isOpen && children}
    </div>
  );
};

export default DropDownDiv;
