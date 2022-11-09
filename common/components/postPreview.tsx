import { useEffect, useState } from "react";
import { Remark } from "react-remark";

interface PostPreviewProps {
  content: string;
}

export const PostPreview = (props: PostPreviewProps) => {
  const [parsedContent, setParsedContent] = useState("");

  useEffect(() => {
    {
      const splitString = props.content.split("\n");
      const parsedString: String[] = [];
      for (let index = 0; index < splitString.length; index++) {
        if (
          splitString[index].startsWith("#") ||
          splitString[index + 1].startsWith("--")
        ) {
          break;
        } else {
          parsedString.push(splitString[index]);
        }
      }
      setParsedContent(parsedString.join("\n"));
    }
  }, []);

  return (
    <Remark rehypeReactOptions={{ components: { img: () => <></> } }}>
      {parsedContent}
    </Remark>
  );
};
