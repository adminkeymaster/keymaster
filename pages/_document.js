import Document, { Html, Head, Main, NextScript } from "next/document";

class AppDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* IMPORTING TYPOGRAPHY */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;1,300;1,400&family=Open+Sans:ital,wght@0,300;0,500;1,300;1,500&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
