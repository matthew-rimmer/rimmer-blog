import { useRouter } from "next/router";
import { getPostByWebTitle, Post } from "../../../common/utils/supabaseClient";
import { useEffect, useState } from "react";
import {
  getDisplayDate,
  markupToPlainText,
} from "../../../common/utils/helpers";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import { Code, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import style from "../../../styles/markdown.module.css";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostPage = ({ postData }: { postData: Post[] }) => {
  if (!postData) {
    return <p>No post :c</p>;
  }
  const post = postData[0];
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
          as="h2"
          size="2xl"
          style={{ marginBottom: 0, paddingBottom: 0 }}
        >
          {post?.title || <Skeleton width={"100px"} />}
        </Heading>
        <Heading
          as="h3"
          size="md"
          style={{ marginTop: "10px", paddingTop: 0, paddingBottom: "2  0px" }}
        >
          {post ? (
            getDisplayDate(post.created_at)
          ) : (
            <Skeleton width={"150px"} />
          )}
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
            ul: UnorderedList,
            ol: OrderedList,
            li: ListItem,
            a: Link,
            code: ({ node, ...props }) => (
              <Code width={"100%"} overflowX={"auto"} {...props} />
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </Flex>
    </VStack>
  );
};

export default PostPage;

// This gets called on every request
export async function getServerSideProps(context: any) {
  const { web_title } = context.query;
  // Fetch data from external API
  const dataObject = await getPostByWebTitle(web_title);

  const postData = dataObject.data;

  // Pass data to the page via props
  return { props: { postData } };
}
