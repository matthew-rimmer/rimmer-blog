import { Layout, Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import {
  BookOutlined,
  MessageOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import React from "react";
import { Typography } from "antd";
import { useRouter } from "next/router";

const { Title } = Typography;
interface pageWrapperProps {
  children: any;
}

export const PageWrapper = (props: pageWrapperProps) => {
  const router = useRouter();

  return (
    <Layout hasSider style={{ height: "100vh" }}>
      <Sider breakpoint="md" collapsedWidth="0">
        <Title level={3} style={{ padding: "1rem 2% 2% 1rem", color: "white" }}>
          Rimmer
        </Title>
        <Menu
          theme="dark"
          defaultSelectedKeys={[router.pathname]}
          mode="inline"
          style={{}}
        >
          <Menu.Item
            onClick={() => router.push("/")}
            key="/"
            icon={<MessageOutlined />}
          >
            Blog
          </Menu.Item>
          <Menu.Item
            onClick={() => router.push("/portfolio")}
            key="/portfolio"
            icon={<BookOutlined />}
          >
            Portfolio
          </Menu.Item>
          <Menu.Item
            style={{ display: "none" }}
            onClick={() => router.push("/contact")}
            key="/contact"
            icon={<PhoneOutlined />}
          >
            Contact
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">{props.children}</Layout>
    </Layout>
  );
};
