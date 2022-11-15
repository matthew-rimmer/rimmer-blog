import { Heading } from "@chakra-ui/react";
import Head from "next/head";

export default function Portfolio() {
  return (
    <div>
      <Head>
        <title>Portfolio</title>
        <meta property="og:title" content="Portfolio" key="title" />
      </Head>
      <Heading>Portfolio</Heading>
    </div>
  );
}
