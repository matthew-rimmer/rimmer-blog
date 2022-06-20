import { Typography } from "antd";
import { Content } from "antd/lib/layout/layout";
import Head from "next/head";

const { Title } = Typography;

export default function Contact() {
  return (
    <Content>
      <Head>
        <title>Contact</title>
        <meta property="og:title" content="Contact" key="title" />
      </Head>
      <Title>Contact</Title>
    </Content>
  );
}
