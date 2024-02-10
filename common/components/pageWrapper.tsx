import React from 'react';
import { Phi } from '../constants';
import NavBar from './navbar';

interface PageWrapperProps {
  children: any;
}

function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div style={{ width: '100vw', overflowX: 'hidden' }}>
      <NavBar
        routes={[
          {
            path: '/',
            title: 'Blog',
          },

          {
            path: '/portfolio',
            title: 'Portfolio',
          },
          /* TODO: Finish routes
          {
            path: "/contact",
            title: "Contact",
          },
          */
        ]}
      />
      <div
        className="site-layout"
        role="main"
        style={{ minHeight: `calc(100vh - (100vh / ${Phi}/8))` }}
      >
        <div className="site-layout">{children}</div>
      </div>
    </div>
  );
}

export default PageWrapper;
