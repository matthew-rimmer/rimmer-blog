import Head from 'next/head';
import { Heading, VStack, Text } from '@chakra-ui/react';

export default function Contact() {
  return (
    <div>
      <Head>
        <title>404 - Not Found</title>
        <meta property="og:title" content="Contact" key="title" />
      </Head>
      <VStack>
        <Heading>404</Heading>
        <Text>Oops! Page not found</Text>
      </VStack>
    </div>
  );
}
