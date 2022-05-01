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
      <Title>Blog</Title>
      <SlideInLoading loaded={postsStatus} style={{ width: "100%" }}>
        <List
          itemLayout="horizontal"
          dataSource={posts}
          renderItem={(item: Post) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <>
                    <Link href={`/post/${item.web_title}`}><a style={{fontWeight: "bold"}}>{item.title}</a></Link>
                    {getDisplayDate(item.created_at)}
                  </>
                }
                description={item.content}
              />
            </List.Item>
          )}
        />
      </SlideInLoading>
    </Content>
  );
}
