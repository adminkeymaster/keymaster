//Next, React (core node_modules) imports must be placed here
import Link from "next/link";
import { useRouter } from "next/router";

import { useState, useEffect } from "react";

//import STORE from '@/store'

//import COMPONENT from '@/components'
import SidePanel from "@/composites/SidePanel";
import Menu from "@/composites/Menu";
import Logo from "@/components/Logo";
import MenuIcon from "@/components/MenuIcon";

import styles from "./Navbar.module.scss";

const Navbar = (props) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { route } = useRouter();

  const handleNavigation = () => {
    console.log(menuIsOpen);
  };

  return (
    <>
      <header className={styles.container}>
        <nav className={styles.nav}>
          <Link href="/">
            <a>
              <Logo size={8} />
            </a>
          </Link>

          <Menu onClick={props.onClick} />

          <MenuIcon handler={handleNavigation} isOpen={menuIsOpen} />
        </nav>
      </header>
      <SidePanel handler={handleNavigation} isOpen={menuIsOpen} />
    </>
  );
};

export default Navbar;
