import { markupToPlainText } from "../../../common/utils/helpers";
import Head from "next/head";
import ErrorPage from "next/error";
import { Flex, Heading, useColorMode, VStack } from "@chakra-ui/react";
import prisma from "../../../lib/prisma";
import { PortfolioItem } from "@prisma/client";
import { Markdown } from "../../../common/components/markdown";

const PostPage = ({ postData }: { postData: PortfolioItem }) => {
  const { colorMode } = useColorMode();
  if (!postData) {
    return (
      <ErrorPage
        statusCode={404}
        withDarkMode={colorMode === "dark" ? true : false}
      />
    );
  }

  const post = postData;
  return (
    <VStack>
      <Head>
        <title>{post?.title ? post?.title : "Loading..."}</title>
        <meta property="og:Heading" content={post?.title} key="Heading" />
        <meta
          name="description"
          content={markupToPlainText(post?.content || "")}
        />
      </Head>
      <VStack paddingTop={"2rem"} align={"center"}>
        <Heading
          as="h1"
          size="2xl"
          style={{ marginBottom: 0, paddingBottom: 0 }}
        >
          {post && post?.title}
        </Heading>
      </VStack>
      <Flex
        paddingBottom={"2rem"}
        flexDirection={"column"}
        gap={"10px"}
        width={"100%"}
      >
        <Markdown>{post?.content}</Markdown>
      </Flex>
    </VStack>
  );
};

export default PostPage;

// This gets called on every request
export async function getServerSideProps(context: any) {
  const { web_title } = context.query;

  if (!web_title) {
    return {
      notFound: true,
    };
  }
  // Fetch data from external API
  const postData = await prisma.portfolioItem.findFirstOrThrow({
    where: { webTitle: web_title },
  });
  // Pass data to the page via props
  return { props: { postData: postData || null } };
}
