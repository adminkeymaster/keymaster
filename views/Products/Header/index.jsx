//Next, React (core node_modules) imports must be placed here
import Image from "next/image";
//import STORE from '@/store'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from "./Header.module.scss";

const Header = (props) => {
  return <header className={styles.container}>
    <Image src="/productcover.svg" layout="fill" objectFit="cover"></Image>
  </header>;
};

export default Header;
