// Importing the date picker component
import { List } from "antd";
import { useEffect, useMemo, useState } from "react";
import { Content } from "antd/lib/layout/layout";
import React from "react";
import { getPosts, Post } from "../common/utils/supabaseClient";
import { Typography } from "antd";
import Link from "next/link";
import { SlideInLoading } from "../common/components/slideInLoading";
import { format } from "date-fns";
import { getDisplayDate } from "../common/utils/helpers";
import { marked } from "marked";
import DOMPurify from "dompurify";
import parse, { attributesToProps } from "html-react-parser";
import { Element } from "domhandler/lib/node";
import ReactMarkdown from "react-markdown";
import { Remark, useRemark } from "react-remark";
import { PostPreview } from "../common/components/postPreview";
import Head from "next/head";

const { Title } = Typography;

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
    <Content style={{ overflow: "scroll", overflowX: "hidden" }}>
      <Head>
        <title>Blog</title>
        <meta property="og:title" content="Blog" key="title" />
      </Head>
      <Title>Blog</Title>
      <SlideInLoading loaded={postsStatus} style={{ width: "100%" }}>
        <List
          itemLayout="horizontal"
          dataSource={posts}
          renderItem={(item: Post) => (
            <List.Item
              style={{ flexDirection: "column", alignItems: "baseline" }}
            >
              <List.Item.Meta
                style={{ width: "100%" }}
                title={
                  <>
                    <Link href={`/post/${item.web_title}`}>
                      <a style={{ fontSize: "2rem" }}>{item.title}</a>
                    </Link>
                  </>
                }
                description={getDisplayDate(item.created_at)}
              />
              <PostPreview content={item.content} />
              <Link href={`/post/${item.web_title}`}>
                <a style={{ textDecoration: "underline", paddingTop: "1rem" }}>
                  Read more
                </a>
              </Link>
            </List.Item>
          )}
        />
      </SlideInLoading>
    </Content>
  );
}
