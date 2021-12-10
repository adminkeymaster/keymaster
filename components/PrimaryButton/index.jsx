//Next, React (core node_modules) imports must be placed here
import Link from "next/link";
//Styles must be imported here
import styles from "./PrimaryButton.module.scss";

const PrimaryButton = ({ size, ...props }) => {
  return (
    <button className={styles.container} style={{ fontSize: size ? size : 16 }}>
      {props.children}
    </button>
  );
};

export default PrimaryButton;
