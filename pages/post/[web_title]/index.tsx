import { useRouter } from "next/router";
import { getPostByWebTitle, Post } from "../../../common/utils/supabaseClient";
import { useEffect, useState } from "react";
import {
  getDisplayDate,
  markupToPlainText,
} from "../../../common/utils/helpers";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import { Flex, Heading, Text, VStack } from "@chakra-ui/react";
import style from "../../../styles/markdown.module.css";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";

const PostPage = () => {
  const router = useRouter();
  const { web_title } = router.query;
  const [post, setPost] = useState<Post>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const data = (await getPostByWebTitle(web_title)).data;
      if (data) {
        setPost(data[0]);
        setLoaded(true);
      }
    };
    if (web_title) {
      fetchPost();
    }
  }, [web_title]);

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
          {post?.title}
        </Heading>
        <Heading
          as="h3"
          size="md"
          style={{ marginTop: "10px", paddingTop: 0, paddingBottom: "2  0px" }}
        >
          {post && getDisplayDate(post.created_at)}
        </Heading>
      </VStack>
      <Flex flexDirection={"column"} gap={"10px"} width={"80%"}>
        {post?.content && (
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => <Heading size={"lg"} as="h4" {...props} />,
              h2: ({ node, ...props }) => <Heading size={"md"} as="h5" {...props} />,
              h3: ({ node, ...props }) => <Heading size={"sm"} as="h6" {...props} />,
              p: Text,
              ul: UnorderedList,
              ol: OrderedList,
              li: ListItem,
              a: Link,
            }}
          >
            {post.content}
          </ReactMarkdown>
        )}
      </Flex>
    </VStack>
  );
};

export default PostPage;
