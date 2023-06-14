import { useState } from "react";
import React from "react";
import { useRouter } from "next/router";
import { Heading } from "@chakra-ui/react";
import { Button, IconButton } from "@chakra-ui/react";
import { NavBar } from "./navbar";
import { Phi } from "../constants";
import styled from "styled-components";

interface pageWrapperProps {
  children: any;
}

export const PageWrapper = (props: pageWrapperProps) => {
  return (
    <div style={{ width: "100vw", overflowX: "hidden" }}>
      <NavBar
        routes={[
          {
            path: "/",
            title: "Blog",
          },
          /* TODO: Finish routes
          {
            path: "/portfolio",
            title: "Portfolio",
          },
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
        <SiteLayout>{props.children}</SiteLayout>
      </div>
    </div>
  );
};

const SiteLayout = styled.div`
  width: 750px;
  margin: auto;
  min-height: 100%;

  @media (max-width: 768px) {
    width: 95%;
  }
`;
