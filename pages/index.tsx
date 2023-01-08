// Importing the date picker component
import { useEffect, useMemo, useState } from "react";
import React from "react";
import { getPosts, Post } from "../common/utils/supabaseClient";
import Link from "next/link";
import { getDisplayDate } from "../common/utils/helpers";
import { PostPreview } from "../common/components/postPreview";
import { Divider, Flex, Heading, VStack } from "@chakra-ui/react";
import Head from "next/head";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

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
        <Heading size="lg" width={"100%"} textAlign={"left"}>
          Latest Posts
        </Heading>
        <Divider />
        <VStack align={"center"} width={"100%"}>
          {posts?.length > 0 ? (
            posts.map((item: Post) => (
              <div key={item.id}>
                <Flex
                  gap={"10px"}
                  flexDirection="column"
                  alignItems="baseline"
                  width={"100%"}
                  paddingTop={"1rem"}
                  paddingBottom={"1rem"}
                >
                  <Heading size="lg">{item.title}</Heading>
                  <Heading size="sm">{getDisplayDate(item.created_at)}</Heading>
                  <PostPreview content={item.content} />
                  <Link href={`/post/${item.web_title}`}>Read more</Link>
                </Flex>
                <Divider />
              </div>
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

  const rawPostsData = dataObject.data;

  const postsData = rawPostsData.map((post: Post) => {
    const splitString = post.content.split("\n");
    const parsedString: String[] = [];
    for (let index = 0; index < splitString.length; index++) {
      if (
        splitString[index].startsWith("#") ||
        splitString[index + 1].startsWith("--")
      ) {
        break;
      } else {
        parsedString.push(splitString[index]);
      }
    }
    return { ...post, content: parsedString.join("\n") };
  });

  // Pass data to the page via props
  return { props: { postsData } };
}
