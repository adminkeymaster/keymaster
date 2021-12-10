import LandingLayout from "@/layouts/Landing";
import Home from "@/views/Landing/Home";
import Feature from "@/views/Landing/Feature";
import Introduction from "@/views/Landing/Introduction";
import About from "@/views/Landing/About";
import Benefits from "@/views/Landing/Benefits";
import News from "@/views/Landing/News";
import Partners from "@/views/Landing/Partners";
import styles from "./Root.module.scss";

const RootPage = (props) => {
  return (
    <main className={styles.container}>
      <Home />
      <Feature />
      <Introduction />
      <About />
      <Benefits />
      <News />
      <Partners />
    </main>
  );
};

RootPage.Layout = LandingLayout;

export default RootPage;
