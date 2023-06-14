import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";
import { Work_Sans } from "next/font/google";

const workSans = Work_Sans({ subsets: ["latin"] });

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  fonts: {
    body: workSans.style.fontFamily,
    heading: workSans.style.fontFamily,
  },
  background: "#F3F3EC",
  color: "#8b2386",
  styles: {
    global: {
      ul: {
        marginInlineStart: "1rem  ",
      },
      ol: {
        marginInlineStart: "1rem  ",
      },
      a: {
        color: "#8b2386",
      },
    },
  },
});

export default theme;
