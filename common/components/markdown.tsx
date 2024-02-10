/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/function-component-definition */
import { FunctionComponent } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Code,
  Heading,
  Text,
  ListItem,
  OrderedList,
  UnorderedList,
  Link,
} from '@chakra-ui/react';

const Markdown: FunctionComponent<{ children: string }> = ({ children }) => (
  <ReactMarkdown
    components={{
      h1: ({ node, ...props }) => <Heading size="lg" as="h4" {...props} />,
      h2: ({ node, ...props }) => <Heading size="md" as="h5" {...props} />,
      h3: ({ node, ...props }) => <Heading size="sm" as="h6" {...props} />,
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
        <Code width="100%" overflowX="auto" {...props} />
      ),
    }}
  >
    {children}
  </ReactMarkdown>
);

export default Markdown;
