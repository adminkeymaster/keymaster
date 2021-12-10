//Next, React (core node_modules) imports must be placed here

import Link from "next/link";

//Styles must be imported here
import styles from "./PrimaryLink.module.scss";

const PrimaryLink = ({ href, children, size, ...props }) => {
  return (
    <Link href={href} style={{ fontSize: size ? size : 16 }}>
      <a className={styles.container}>{children}</a>
    </Link>
  );
};

export default PrimaryLink;
