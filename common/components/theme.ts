import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Roboto', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
  background: "#F3F3EC",
  color: "#314B66",
  styles: {
    global: {
      ul: {
        marginInlineStart: "1rem  ",
      },
      ol: {
        marginInlineStart: "1rem  ",
      },
      a: {
        color: "blue"
      }
    },
  },
});

export default theme;
