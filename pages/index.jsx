import Head from "next/head";
import LandingLayout from "@/layouts/Landing";
import Home from "@/views/Landing/Home";
import Feature from "@/views/Landing/Feature";
import Introduction from "@/views/Landing/Introduction";
import About from "@/views/Landing/About";
import Benefits from "@/views/Landing/Benefits";
import News from "@/views/Landing/News";
import Partners from "@/views/Landing/Partners";
import { motion } from "framer-motion";
import styles from "./Root.module.scss";

const RootPage = (props) => {
  return (
    <motion.main
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={styles.container}
    >
      <Head>
        {/* GENERAL */}
        <title>Keymaster</title>
        <meta name="title" content="Keymaster" />
        <meta name="description" content="Ухаанаа уралдуул" />

        {/* FACEBOOK */}
        <meta property="og:url" content="https://keymaster.mn" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Keymaster" />
        <meta property="og:description" content="Ухаанаа уралдуул" />
        <meta property="og:image" content="https://keymaster.mn/_next/" />

        {/* TWITTER */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="keymaster.mn" />
        <meta property="twitter:url" content="https://keymaster.mn/" />
        <meta name="twitter:title" content="Keymaster" />
        <meta name="twitter:description" content="Ухаанаа уралдуул" />
        <meta name="twitter:image" content="https://keymaster.mn/_next/" />
      </Head>
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
