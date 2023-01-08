import {
  Code,
  Heading,
  Link,
  ListItem,
  OrderedList,
  UnorderedList,
  Text,
} from "@chakra-ui/react";
import sl from "date-fns/esm/locale/sl/index.js";
import React from "react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

type postPreviewProps = {
  content: string;
  parsedContent?: string;
};

export const PostPreview = ({ content }: postPreviewProps) => {
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
        li: ({ node, index, ...props }) => {
          // For some reason, props had an ordered prop here which causes an error
          const newProps = { ...props, ordered: null };
          return <ListItem key={props.key} {...newProps} />;
        },
        a: Link,
        code: ({ node, ...props }) => (
          <Code width={"100%"} overflowX={"auto"} {...props} />
        ),
        img: React.Fragment,
      }}
    >
      {content!}
    </ReactMarkdown>
  );
};
