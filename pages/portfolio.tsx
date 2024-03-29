import {
  Box,
  Heading,
  VStack,
  SimpleGrid,
  Card,
  LinkOverlay,
  useColorModeValue,
} from '@chakra-ui/react';
import { PortfolioItem } from '@prisma/client';
import Head from 'next/head';
import Image from 'next/image';
import NextLink from 'next/link';
import ClampLines from 'react-clamp-lines';
import prisma from '../lib/prisma';
import { getFirstParagraph } from '../common/utils/helpers';

export default function Portfolio({
  itemData,
}: {
  itemData: Array<PortfolioItem>;
}) {
  const textColour = useColorModeValue('gray.900', 'gray.100');
  return (
    <>
      <Head>
        <title>Portfolio</title>
        <meta property="og:title" content="Portfolio" key="title" />
      </Head>
      <VStack paddingTop="2rem" align="center" width="100%">
        <Heading as="h1">Portfolio</Heading>
        <SimpleGrid
          columns={[1, 2]}
          width="100%"
          spacing="40px"
          justifyItems="center"
        >
          {itemData.map((item) => (
            <Card key={item.id} gap={2}>
              <LinkOverlay
                color={textColour}
                as={NextLink}
                href={`/portfolio/${item.webTitle}`}
              >
                <Image
                  src={item.imageUrl}
                  width={300}
                  height={250}
                  alt="Picture from picsum"
                />
                <Heading
                  size="lg"
                  paddingLeft={3}
                  paddingRight={3}
                  paddingTop={3}
                >
                  {item.title}
                </Heading>
                <Box padding={3}>
                  <ClampLines
                    text={item.content}
                    id="really-unique-id"
                    lines={3}
                    ellipsis="..."
                    innerElement="p"
                    buttons={false}
                  />
                </Box>
              </LinkOverlay>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>
    </>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  const items = await prisma?.portfolioItem.findMany();

  if (items) {
    const itemData = items.map((portfolioItem: PortfolioItem) => ({
      ...portfolioItem,
      content:
        portfolioItem?.content && getFirstParagraph(portfolioItem.content),
    }));
    return { props: { itemData } };
  }
  return { props: {} };
}
