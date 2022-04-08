// Importing the date picker component
import {
  Avatar,
  Breadcrumb,
  Button,
  DatePicker,
  Layout,
  List,
  Menu,
  Spin,
} from "antd";
import Sider from "antd/lib/layout/Sider";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  BookOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
import { useEffect, useState } from "react";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import React from "react";
import { getPosts } from "../utils/supabaseClient";
import { Typography } from "antd";
import { animated, useSpring } from "@react-spring/web";

const { Title } = Typography;

export default function Home() {
  const [posts, setPosts] = useState([]);
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

  useEffect(() => {
    console.log("Posts: ", posts);
  }, [posts]);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const [greetingStatus, setGreeting] = React.useState(false);
  const contentProps = useSpring({
    opacity: greetingStatus ? 1 : 0,
    transform: greetingStatus
      ? "translate3d(0px,0,0)"
      : "translate3d( 500px,0,0)",
  });

  const [postsStatus, setPostsLoaded] = React.useState(false);
  const loadedProps = useSpring({
    opacity: postsStatus ? 1 : 0,
    transform: postsStatus
      ? "translate3d(0px,0,0)"
      : "translate3d( 500px,0,0)",
    width: "50%",
  });

  useEffect(() => setGreeting(true), []);

  useEffect(() => {
    if (posts.length > 0) {
      setPostsLoaded(true);
    }
  }, [posts]);

  return (
    <Layout hasSider style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1,
        }}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<BookOutlined />}>
            Option 2
          </Menu.Item>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <animated.div style={contentProps}>
          <Content>
            <Title style={{ padding: "2% 0 2% 0" }}>Blog</Title>
            {postsStatus ? 
              (<animated.div style={loadedProps}>
                
                <List
                  itemLayout="horizontal"
                  dataSource={posts}
                  renderItem={(item: any) => (
                    <List.Item>
                      <List.Item.Meta
                        title={<a href="https://ant.design">{item.title}</a>}
                        description={item.content}
                      />
                    </List.Item>
                  )}
                />
              </animated.div>)
              : <Spin/> }
          </Content>
        </animated.div>
      </Layout>
    </Layout>
  );
}
