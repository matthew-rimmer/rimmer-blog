import "antd/dist/antd.css";
import "../styles/globals.css";
import "../styles/antd.less";
import type { AppProps } from "next/app";
import { PageWrapper } from "../common/components/pageWrapper";
import React from "react";
import { Helmet } from "react-helmet";

function MyApp({ Component, pageProps }: AppProps) {
  if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
    const ReactDOM = require("react-dom");
    const axe = require("@axe-core/react");
    axe(React, ReactDOM, 1000);
  }

  return (
    <>
      <Helmet>
        <html lang="en" />
      </Helmet>
      <PageWrapper>
        <Component {...pageProps} />
      </PageWrapper>
    </>
  );
}

export default MyApp;
