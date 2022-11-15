import { Box, Stack, HStack, Heading, Button, Center } from "@chakra-ui/react";
import { useState } from "react";

export const NavBar = (props: any) => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  return (
    <Box
      height={"100%"}
      bg={"#3d658d"}
      fontWeight={"light"}
      textColor={"#f6f7f5"}
    >
      <div
        style={{
          padding: "1% 18% 1% 18%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Center>
          <Heading size={"lg"} fontWeight={"light"} textAlign={"center"}>
            Rimmer
          </Heading>
        </Center>
        <HStack spacing={"8"}>{props.children}</HStack>
      </div>
    </Box>
  );
};

/*<div style={{}}>

        </div>

        */
