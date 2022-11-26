import { useState } from "react";
import React from "react";
import { useRouter } from "next/router";
import { Heading } from "@chakra-ui/react";
import { Button, IconButton } from "@chakra-ui/react";
import { NavBar } from "./navbar";
import { Phi } from "../constants";

interface pageWrapperProps {
  children: any;
}

export const PageWrapper = (props: pageWrapperProps) => {
  const router = useRouter();

  return (
    <div style={{ width: "100vw", overflowX: "hidden" }}>
      <NavBar>
        <Button
          onClick={() => router.push("/")}
          key="/"
          aria-label={""}
          bg={"transparent"}
          fontSize={"md"}
          fontWeight={"light"}
        >
          Blog
        </Button>
        <Button
          onClick={() => router.push("/portfolio")}
          key="/portfolio"
          aria-label={""}
          bg={"transparent"}
          fontSize={"md"}
          fontWeight={"light"}
        >
          Portfolio
        </Button>
        <Button
          bg={"transparent"}
          onClick={() => router.push("/contact")}
          key="/contact"
          aria-label={""}
          fontSize={"md"}
          fontWeight={"light"}
        >
          Contact
        </Button>
      </NavBar>
      <div className="site-layout">
        <div style={{ width: `calc(100% / ${Phi})`, margin: "auto" }}>
          {props.children}
        </div>
      </div>
    </div>
  );
};
