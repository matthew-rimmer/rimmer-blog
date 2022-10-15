import { useRouter } from "next/router";
import {
  getPost,
  getPostByWebTitle,
  getPostContent,
  Post,
  PostContent,
} from "../../../common/utils/supabaseClient";
import { useEffect, useState } from "react";
import { Content } from "antd/lib/layout/layout";
import { SlideInLoading } from "../../../common/components/slideInLoading";
import { Button, Typography } from "antd";
import { getDisplayDate } from "../../../common/utils/helpers";
import { marked } from "marked";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import ReactMarkdown from "react-markdown";
import { LeftOutlined } from "@ant-design/icons";
import Head from "next/head";

const { Title } = Typography;

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
    <Content style={{ overflow: "scroll", overflowX: "hidden" }}>
      <Head>
        <title>{post?.title ? post?.title : "Loading..."}</title>
        <meta property="og:title" content={post?.title} key="title" />
      </Head>
      <Title style={{ marginBottom: 0, paddingBottom: 0 }}>{post?.title}</Title>
      <Title
        style={{ marginTop: "10px", paddingTop: 0, paddingBottom: "2  0px" }}
        level={5}
      >
        {post && getDisplayDate(post.created_at)}
      </Title>
      <SlideInLoading loaded={loaded} style={{ width: "100%" }}>
        {post?.content && <ReactMarkdown>{post.content}</ReactMarkdown>}
      </SlideInLoading>
    </Content>
  );
};

export default PostPage;
