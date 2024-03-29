import Head from 'next/head';
import ErrorPage from 'next/error';
import {
  Flex, Heading, useColorMode, VStack,
} from '@chakra-ui/react';
import { Post } from '@prisma/client';
import prisma from '../../../lib/prisma';
import {
  getDisplayDate,
  markupToPlainText,
} from '../../../common/utils/helpers';
import Markdown from '../../../common/components/markdown';

function PostPage({ postData }: { postData: Post }) {
  const { colorMode } = useColorMode();
  if (!postData) {
    return <ErrorPage statusCode={404} withDarkMode={colorMode === 'dark'} />;
  }

  const post = postData;
  return (
    <VStack>
      <Head>
        <title>{post?.title ? post?.title : 'Loading...'}</title>
        <meta property="og:Heading" content={post?.title} key="Heading" />
        <meta
          name="description"
          content={markupToPlainText(post?.content || '')}
        />
      </Head>
      <VStack paddingTop="2rem" align="center">
        <Heading
          as="h1"
          size="2xl"
          style={{ marginBottom: 0, paddingBottom: 0 }}
        >
          {post && post?.title}
        </Heading>
        <Heading
          as="h3"
          size="md"
          style={{ marginTop: '10px', paddingTop: 0, paddingBottom: '2  0px' }}
        >
          {post && getDisplayDate(post?.createdAt.toDateString())}
        </Heading>
      </VStack>
      <Flex flexDirection="column" paddingBottom="2rem" gap="10px" width="100%">
        <Markdown>{post?.content!}</Markdown>
      </Flex>
    </VStack>
  );
}

export default PostPage;

// This gets called on every request
export async function getServerSideProps(context: any) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { web_title } = context.query;

  if (!web_title) {
    return {
      notFound: true,
    };
  }
  // Fetch data from external API
  const postData = await prisma.post.findFirstOrThrow({
    where: { webTitle: web_title },
  });
  // Pass data to the page via props
  return { props: { postData: postData || null } };
}
