// Importing the date picker component
import { useEffect, useMemo, useState } from "react";
import React from "react";
import { getPosts, Post } from "../common/utils/supabaseClient";
import Link from "next/link";
import { getDisplayDate } from "../common/utils/helpers";
import { PostPreview } from "../common/components/postPreview";
import { Flex, Heading, VStack } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const data = (await getPosts()).data;
    if (data) {
      setPosts(data);
    }
  };

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const [postsStatus, setPostsLoaded] = React.useState(false);

  useMemo(() => {
    if (posts.length > 0) {
      setPostsLoaded(true);
    }
  }, [posts]);

  return (
    <>
      <Head>
        <title>Blog</title>
        <meta property="og:title" content="Blog" key="title" />
      </Head>
      <VStack paddingTop={"2rem"} align={"center"}>
        <Heading>Blog</Heading>
        <VStack paddingTop={"2rem"} align={"center"} width={"80%"}>
          {posts.map((item: Post) => (
            <Flex gap={"10px"} flexDirection="column" alignItems="baseline">
              <Heading>{item.title}</Heading>
              <PostPreview content={item.content} />
              <Link href={`/post/${item.web_title}`}>Read more</Link>
            </Flex>
          ))}
        </VStack>
      </VStack>
    </>
  );
}
