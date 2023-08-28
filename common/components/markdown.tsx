import { FunctionComponent } from "react";
import ReactMarkdown from "react-markdown";
import {
  Code,
  Heading,
  Text,
} from "@chakra-ui/react";
import {
  ListItem,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";

export const Markdown: FunctionComponent<{ children: string }> = ({
  children,
}) => {
  return (
    <ReactMarkdown
      components={{
        h1: ({ node, ...props }) => <Heading size={"lg"} as="h4" {...props} />,
        h2: ({ node, ...props }) => <Heading size={"md"} as="h5" {...props} />,
        h3: ({ node, ...props }) => <Heading size={"sm"} as="h6" {...props} />,
        p: Text,
        ul: ({ node, ...props }) => {
          // For some reason, props had an ordered prop here which causes an error
          const newProps = { ...props, ordered: null };
          return <UnorderedList {...newProps} />;
        },
        ol: OrderedList,
        li: ({ node, ...props }) => {
          // For some reason, props had an ordered prop here which causes an error
          const newProps = { ...props, ordered: null };
          return <ListItem key={props.key} {...newProps} />;
        },
        a: Link,
        code: ({ node, ...props }) => (
          <Code width={"100%"} overflowX={"auto"} {...props} />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
