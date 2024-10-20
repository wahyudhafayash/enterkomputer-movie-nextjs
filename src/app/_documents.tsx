import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <head>
          <title>Enterkomputer Movie</title>
          <link
            rel="icon"
            type="images/png"
            href="https://enterkomputer.com/favicon.ico"
          />
        </head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
