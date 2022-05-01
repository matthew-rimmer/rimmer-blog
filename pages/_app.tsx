import "antd/dist/antd.css";
import "../styles/globals.css";
import "../styles/antd.less";
import type { AppProps } from "next/app";
import { PageWrapper } from "../common/components/pageWrapper";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
    const ReactDOM = require("react-dom");
    const axe = require("@axe-core/react");
    axe.default(React, ReactDOM, 1000);
  }

  return (
    <PageWrapper>
      <Component {...pageProps} />
    </PageWrapper>
  );
}

export default MyApp;
