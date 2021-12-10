//Next, React (core node_modules) imports must be placed here

//Styles must be imported here
import styles from "./List.module.scss";

const List = ({ children, ...props }) => {
  return <ul className={styles.container}>{children}</ul>;
};

export default List;
