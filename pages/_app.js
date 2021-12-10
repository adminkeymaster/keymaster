import { Fragment, forwardRef } from 'react';
// import { Provider } from "next-auth/client";

import ThemeLayout from '@/layouts/Theme';

import { ActiveAnchorContextProvider } from '@/store/ActiveAnchor';
import { ThemeContextProvider } from '@/store/ThemeContext';
import CartContextProvider from '@/store/CartContext';

import '@/sass/app.scss';

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const Layout = Component.Layout ? Component.Layout : Fragment;

  const ForwardedComponent = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({}));

    return <Component {...props} {...pageProps} key={router.route} />;
  });

  ForwardedComponent.displayName = 'ForwardedComponent';

  const LayoutWithRef = () => {
    const componentRef = useRef();
    return (
      <Layout>
        <ForwardedComponent ref={componentRef} />
      </Layout>
    );
  };

  return (
    // <Provider session={session}>
    <CartContextProvider>
      <ActiveAnchorContextProvider>
        <ThemeContextProvider>
          <ThemeLayout>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeLayout>
        </ThemeContextProvider>
      </ActiveAnchorContextProvider>
    </CartContextProvider>

    // </Provider>
  );
};

export default App;
