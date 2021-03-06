//Next, React (core node_modules) imports must be placed here
import { motion } from "framer-motion";
//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import LandingLayout from "@/layouts/Landing";
//import VIEWS from '@/views'
import Header from "@/views/Products/Header";
import Store from "@/views/Products/Store";
//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'
import ProductReq from "@/composites/ProductReq";
//import COMPONENT from '@/components'

import styles from "./Products.module.scss";
const ProductsPage = (props) => {
  return (
    <motion.main
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={styles.container}
    >
      <Header />
      <Store />
      <ProductReq />
    </motion.main>
  );
};

ProductsPage.Layout = LandingLayout;

export default ProductsPage;
