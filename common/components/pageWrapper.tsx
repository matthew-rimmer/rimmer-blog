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
          /* 
          {
            path: "/portfolio",
            title: "Portfolio",
          },
          {
            path: "/contact",
            title: "Contact",
          },*/
        ]}
      ></NavBar>
      <div className="site-layout">
        <SiteLayout>{props.children}</SiteLayout>
      </div>
    </div>
  );
};

const SiteLayout = styled.div`
  width: calc(100% / ${Phi});
  margin: auto;

  @media (max-width: 768px) {
    width: calc(100% / ${Phi / 1.5});
  }
`;
