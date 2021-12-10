//Next, React (core node_modules) imports must be placed here

import Link from "next/link";

//Styles must be imported here
import styles from "./SecondaryLink.module.scss";

const PrimaryLink = (props) => {
  return (
    <Link href={props.href}>
      <a className={styles.container}>{props.children}</a>
    </Link>
  );
};

export default PrimaryLink;
