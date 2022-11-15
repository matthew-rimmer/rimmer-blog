import { useState } from "react";
import React from "react";
import { useRouter } from "next/router";
import { Heading } from "@chakra-ui/react";
import { Button, IconButton } from "@chakra-ui/react";
import { NavBar } from "./navbar";

interface pageWrapperProps {
  children: any;
}

export const PageWrapper = (props: pageWrapperProps) => {
  const router = useRouter();

  return (
    <div>
      <NavBar>
        <Button
          onClick={() => router.push("/")}
          key="/"
          aria-label={""}
          bg={"transparent"}
          fontSize={"lg"}
          fontWeight={"light"}
        >
          Blog
        </Button>
        <Button
          onClick={() => router.push("/portfolio")}
          key="/portfolio"
          aria-label={""}
          bg={"transparent"}
          fontSize={"lg"}
          fontWeight={"light"}
        >
          Portfolio
        </Button>
        <Button
          bg={"transparent"}
          onClick={() => router.push("/contact")}
          key="/contact"
          aria-label={""}
          fontSize={"lg"}
          fontWeight={"light"}
        >
          Contact
        </Button>
      </NavBar>
      <div className="site-layout">
        <div style={{ width: "80%", margin: "auto" }}>{props.children}</div>
      </div>
    </div>
  );
};
