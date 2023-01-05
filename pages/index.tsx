// Importing the date picker component
import { useEffect, useMemo, useState } from "react";
import React from "react";
import { getPosts, Post } from "../common/utils/supabaseClient";
import Link from "next/link";
import { getDisplayDate } from "../common/utils/helpers";
import { PostPreview } from "../common/components/postPreview";
import { Flex, Heading, VStack } from "@chakra-ui/react";
import Head from "next/head";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Home({ postsData }: { postsData: Array<Post> }) {
  const posts = postsData;

  const [collapsed, setCollapsed] = useState(true);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <Head>
        <title>Blog</title>
        <meta property="og:title" content="Blog" key="title" />
      </Head>
      <VStack paddingTop={"2rem"} align={"center"} width={"100%"}>
        <Heading>Blog</Heading>
        <VStack paddingTop={"2rem"} align={"center"} width={"100%"}>
          {posts.length > 0 ? (
            posts.map((item: Post) => (
              <Flex
                key={item.id}
                gap={"10px"}
                flexDirection="column"
                alignItems="baseline"
                width={"100%"}
              >
                <Heading>{item.title}</Heading>
                <PostPreview content={item.content} />
                <Link href={`/post/${item.web_title}`}>Read more</Link>
              </Flex>
            ))
          ) : (
            <p>No posts :c</p>
          )}
        </VStack>
      </VStack>
    </>
  );
}

// This gets called on every request
export async function getServerSideProps(context: any) {
  // Fetch data from external API
  const dataObject = await getPosts();

  const postsData = dataObject.data;

  // Pass data to the page via props
  return { props: { postsData } };
}
