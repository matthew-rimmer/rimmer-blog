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
} from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
import { useEffect, useState } from "react";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import React from "react";
import { getPosts } from "../utils/supabaseClient";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const data = (await getPosts()).data;
    setPosts(data);
  };

  useEffect(() => {
    console.log("Posts: ", posts);
  }, [posts]);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout hasSider style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
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
        <Content style={{ margin: "0 16px" }}>
          <Spin spinning={posts.length === 0}>
            {posts.length > 0 && (
              <List
                itemLayout="horizontal"
                dataSource={posts}
                renderItem={(item: any) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://joeschmoe.io/api/v1/random" />
                      }
                      title={<a href="https://ant.design">{item.title}</a>}
                      description={item.content}
                    />
                  </List.Item>
                )}
              />
            )}
          </Spin>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
