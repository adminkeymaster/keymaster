//Next, React (core node_modules) imports must be placed here

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
    <main className={styles.container}>
      <Header />
      <Store />
      <ProductReq />
    </main>
  );
};

ProductsPage.Layout = LandingLayout;

export default ProductsPage;
