//Next, React (core node_modules) imports must be placed here
import Link from 'next/link';
import styled from "styled-components";
import { Upload } from "@styled-icons/heroicons-outline/Upload";
//import STORE from '@/store'

import styles from "./SendVideoHome.module.scss";

const StyledUploadIcon = styled(Upload)`
  width: 2.4rem;
  height: 2.4rem;
`;
const SendVideoHome = (props) => {
	return (
			<button className={styles.button}><StyledUploadIcon /><p>Бичлэг илгээх</p></button>
	)
};

export default SendVideoHome;
