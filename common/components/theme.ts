import { extendTheme } from "@chakra-ui/react";

import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
  list: {
    // this will style the MenuList component
    py: "4",
    borderRadius: "xl",
    border: "2px",
    borderColor: "white",
    bg: "#3d658d",
  },
  item: {
    // this will style the MenuItem and MenuItemOption components
    color: "gray.200",
    _hover: {
      bg: "#314B66",
    },
    _focus: {
      bg: "#314B66",
    },
  },
});
// export the base styles in the component theme
const menuTheme = defineMultiStyleConfig({ baseStyle });

const theme = extendTheme({
  fonts: {
    heading: `'Roboto', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
  background: "#F3F3EC",
  color: "#314B66",
  components: {
    Menu: menuTheme,
  },
  styles: {
    global: {
      ul: {
        marginInlineStart: "1rem  ",
      },
      ol: {
        marginInlineStart: "1rem  ",
      },
      a: {
        color: "blue",
      },
    },
  },
});

export default theme;
