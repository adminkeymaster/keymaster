//Next, React (core node_modules) imports must be placed here
import Image from "next/image";

//Styles must be imported here
import styles from "./LogoDark.module.scss";

const LogoDark = ({ size, ...props }) => {
  return (
    <div className={styles.container} style={{ fontSize: size }}>
      <Image
        layout="fill"
        objectFit="contain"
        src="/keymasterdark.png"
        alt="Keymaster Logo"
      />
    </div>
  );
};

export default LogoDark;
