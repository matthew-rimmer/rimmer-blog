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
import { Typography } from "antd";
import { getDisplayDate } from "../../../common/utils/helpers";

const { Title } = Typography;

const PostPage = () => {
  const router = useRouter();
  const { web_title } = router.query;
  const [post, setPost] = useState<Post>();
  const [content, setContent] = useState<Array<PostContent>>();
  const [loaded, setLoaded] = useState(false);

  const fetchPost = async () => {
    console.log("Query: ", web_title);
    const data = (await getPostByWebTitle(web_title)).data;
    if (data) {
      console.log("Data ", data);
      setPost(data[0]);
      const content = (await getPostContent(data[0].id))
        .data as Array<PostContent>;
      if (content) {
        console.log(content);
        setContent(content.sort());
      }
      setLoaded(true);
    }
  };

  useEffect(() => {
    if (web_title) {
      fetchPost();
    }
  }, [web_title]);

  return (
    <Content style={{ overflow: "scroll", overflowX: "hidden" }}>
      <Title style={{ marginBottom: 0, paddingBottom: 0 }}>{post?.title}</Title>
      <Title
        style={{ marginTop: "10px", paddingTop: 0, paddingBottom: "2  0px" }}
        level={5}
      >
        {post && getDisplayDate(post.created_at)}
      </Title>
      <SlideInLoading loaded={loaded} style={{ width: "100%" }}>
        {content &&
          content.map((element) => {
            switch (element.type) {
              case "image":
                return <img src={element.content}></img>;
                break;
              case "text":
                return <p>{element.content}</p>;
                break;

              default:
                break;
            }
          })}
      </SlideInLoading>
    </Content>
  );
};

export default PostPage;
