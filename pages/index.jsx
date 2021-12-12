import LandingLayout from "@/layouts/Landing";
import Home from "@/views/Landing/Home";
import Feature from "@/views/Landing/Feature";
import Introduction from "@/views/Landing/Introduction";
import About from "@/views/Landing/About";
import Benefits from "@/views/Landing/Benefits";
import News from "@/views/Landing/News";
import Partners from "@/views/Landing/Partners";
import {motion} from "framer-motion";
import styles from "./Root.module.scss";

const RootPage = (props) => {
  return (
    <motion.main       exit={{ opacity: 0 }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    className={styles.container}>
      <Home />
      <News />
      <Introduction />
      <About />
      <Benefits />
      <Feature />
      <Partners />
    </motion.main>
  );
};

RootPage.Layout = LandingLayout;

export default RootPage;
