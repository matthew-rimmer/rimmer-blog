import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  getDisplayDate,
  markupToPlainText,
} from "../../../common/utils/helpers";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import ErrorPage from "next/error";
import {
  Code,
  Flex,
  Heading,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import style from "../../../styles/markdown.module.css";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import prisma from "../../../lib/prisma";
import { PortfolioItem } from "@prisma/client";

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
      <Flex flexDirection={"column"} gap={"10px"} width={"100%"}>
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => (
              <Heading size={"lg"} as="h4" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <Heading size={"md"} as="h5" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <Heading size={"sm"} as="h6" {...props} />
            ),
            p: Text,
            ul: ({ node, ...props }) => {
              // For some reason, props had an ordered prop here which causes an error
              const newProps = { ...props, ordered: null };
              return <UnorderedList {...newProps} />;
            },
            ol: OrderedList,
            li: ({ node, ...props }) => {
              // For some reason, props had an ordered prop here which causes an error
              const newProps = { ...props, ordered: null };
              return <ListItem key={props.key} {...newProps} />;
            },
            a: Link,
            code: ({ node, ...props }) => (
              <Code width={"100%"} overflowX={"auto"} {...props} />
            ),
          }}
        >
          {post?.content!}
        </ReactMarkdown>
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
