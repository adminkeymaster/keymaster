//Next, React (core node_modules) imports must be placed here

//Styles must be imported here
import styles from "./StyledForm.module.scss";

const StyledForm = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className={styles.container}>
      {children}
    </form>
  );
};

export default StyledForm;
