/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable global-require */
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { Helmet } from 'react-helmet';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../common/components/theme';
import PageWrapper from '../common/components/pageWrapper';

function MyApp({ Component, pageProps }: AppProps) {
  // TODO: Fix weird static thing

  if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
    const ReactDOM = require('react-dom');
    const axe = require('@axe-core/react');
    axe(React, ReactDOM, 1000);
  }

  return (
    <>
      <Helmet>
        <html lang="en" />
      </Helmet>
      <ChakraProvider theme={theme}>
        <PageWrapper>
          <Component {...pageProps} />
        </PageWrapper>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
