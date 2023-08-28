import {
  Box,
  Grid,
  Heading,
  VStack,
  SimpleGrid,
  Spacer,
  Flex,
  Text,
  Card,
  LinkOverlay,
} from "@chakra-ui/react";
import { PortfolioItem } from "@prisma/client";
import Head from "next/head";
import Image from "next/image";
import prisma from "../lib/prisma";
import NextLink from 'next/link'

export default function Portfolio({
  itemData,
}: {
  itemData: Array<PortfolioItem>;
}) {
  return (
    <>
      <Head>
        <title>Portfolio</title>
        <meta property="og:title" content="Portfolio" key="title" />
      </Head>
      <VStack paddingTop={"2rem"} align={"center"} width={"100%"}>
        <Heading as="h1">Portfolio</Heading>
        <SimpleGrid
          columns={[1, 2]}
          width="100%"
          spacing="40px"
          justifyItems="center"
        >
          {itemData.map((item, index) => (
            <Card key={index} gap={2}>
              <LinkOverlay as={NextLink} href={`/portfolio/${item.webTitle}`}>
                <Image
                  src={item.imageUrl}
                  width={300}
                  height={250}
                  alt="Picture from picsum"
                />
                <Heading padding={3}>
                  {item.title}
                </Heading>
              </LinkOverlay>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>
    </>
  );
}

// This gets called on every request
export async function getServerSideProps(context: any) {
  // Fetch data from external API

  const items = await prisma?.portfolioItem.findMany();

  if (items) {
    return { props: { itemData: items } };
  }
  console.error("No response :((");
  return { props: {} };
}
