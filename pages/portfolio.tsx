import { Typography } from "antd";
import { Content } from "antd/lib/layout/layout";
import Head from "next/head";

const { Title } = Typography;

export default function Portfolio() {
  return (
    <Content>
      <Head>
        <title>Portfolio</title>
        <meta property="og:title" content="Portfolio" key="title" />
      </Head>
      <Title>Portfolio</Title>
    </Content>
  );
}
