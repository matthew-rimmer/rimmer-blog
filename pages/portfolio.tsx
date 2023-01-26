import {
  Box,
  Grid,
  Heading,
  VStack,
  SimpleGrid,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import Head from "next/head";

export default function Portfolio() {
  return (
    <>
      <Head>
        <title>Portfolio</title>
        <meta property="og:title" content="Portfolio" key="title" />
      </Head>
      <VStack paddingTop={"2rem"} align={"center"} width={"100%"}>
        <Heading>Portfolio</Heading>
        <SimpleGrid
          columns={[1, 2, 3]}
          width="100%"
          spacing="40px"
          justifyItems="center"
        >
          {Array(10).map((_, index) => (
            <Box key={index} w="150px" h="150px" bg="gray.200">
              <Flex height="100%" flexDir="column">
                <Spacer />
                <Heading>Item ${index}</Heading>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </>
  );
}
