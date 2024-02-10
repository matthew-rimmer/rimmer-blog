// Importing the date picker component
import React from 'react';
import Link from 'next/link';
import {
  Divider, Flex, Heading, VStack,
} from '@chakra-ui/react';
import Head from 'next/head';
import { Post } from '@prisma/client';
import {
  contentMarkupToPreviewMarkup,
  getDisplayDate,
} from '../common/utils/helpers';
import PostPreview from '../common/components/postPreview';
import prisma from '../lib/prisma';

export default function Home({ postsData }: { postsData: Array<Post> }) {
  const posts = postsData;

  return (
    <>
      <Head>
        <title>Blog</title>
        <meta property="og:title" content="Blog" key="title" />
      </Head>
      <VStack paddingTop="2rem" align="center" width="100%">
        <Heading as="h1">Blog</Heading>
        <Heading size="lg" width="100%" textAlign="left">
          Latest Posts
        </Heading>
        <Divider />
        <VStack align="center" width="100%">
          {posts?.length > 0 ? (
            posts.map((item: Post) => (
              <div key={item.id}>
                <Flex
                  gap="10px"
                  flexDirection="column"
                  alignItems="baseline"
                  width="100%"
                  paddingTop="1rem"
                  paddingBottom="1rem"
                >
                  <Heading size="lg">{item.title}</Heading>
                  <Heading size="sm">
                    {getDisplayDate(item.createdAt.toDateString())}
                  </Heading>
                  <PostPreview content={item.content!} />
                  <Link href={`/blog/${item.webTitle}`}>Read more</Link>
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
export async function getServerSideProps() {
  // Fetch data from external API
  // const dataObject = await getPosts();

  const posts = await prisma.post.findMany();

  if (posts) {
    const postsData = posts.map((post: Post) => ({
      ...post,
      content: post?.content && contentMarkupToPreviewMarkup(post.content),
    }));

    // Pass data to the page via props
    return { props: { postsData } };
  }
  return { props: {} };
}
