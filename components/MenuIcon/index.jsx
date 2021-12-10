//Next, React (core node_modules) imports must be placed here
import styled from "styled-components";
import { Menu } from "@styled-icons/evaicons-solid/Menu";
//import STORE from '@/store'

import styles from "./MenuIcon.module.scss";

const StyledMenuIcon = styled(Menu)`
  width: 4.8rem;
  height: 4.8rem;
`;

const MenuIcon = ({ handler, ...props }) => {
  return (
    <button className={styles.container} onClick={handler}>
      <StyledMenuIcon />
    </button>
  );
};

export default MenuIcon;
