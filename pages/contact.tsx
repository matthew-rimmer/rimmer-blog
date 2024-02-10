import Head from 'next/head';
import { Heading } from '@chakra-ui/react';

export default function Contact() {
  return (
    <div>
      <Head>
        <title>Contact</title>
        <meta property="og:title" content="Contact" key="title" />
      </Head>
      <Heading>Contact</Heading>
    </div>
  );
}
