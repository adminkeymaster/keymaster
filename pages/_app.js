import { Fragment } from "react";
import { SessionProvider } from "next-auth/react";

import ThemeLayout from "@/layouts/Theme";

import { ActiveAnchorContextProvider } from "@/store/ActiveAnchor";
import { ThemeContextProvider } from "@/store/ThemeContext";
import CartContextProvider from "@/store/CartContext";

import "@/sass/app.scss";

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const Layout = Component.Layout ? Component.Layout : Fragment;

  return (
    <SessionProvider session={session}>
      <CartContextProvider>
        <ActiveAnchorContextProvider>
          <ThemeContextProvider>
            <ThemeLayout>
              <Layout>
                {/* <Component {...pageProps} /> */}
              </Layout>
            </ThemeLayout>
          </ThemeContextProvider>
        </ActiveAnchorContextProvider>
      </CartContextProvider>
    </SessionProvider>
  );
};

export default App;
