import {
  Box,
  Stack,
  HStack,
  Heading,
  Button,
  Center,
  useMediaQuery,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { Phi } from "../constants";
import { HamburgerIcon } from "@chakra-ui/icons";

export const NavBar = (props: any) => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  return (
    <Box
      height={`calc(100vh / ${Phi}/8)`}
      bg={"#3d658d"}
      fontWeight={"light"}
      textColor={"#f6f7f5"}
    >
      <div
        style={{
          alignItems: "center",
          height: "100%",
          padding: `0 calc((100% - (100% / ${Phi}))/2)`,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Center>
          <Heading size={"lg"} fontWeight={"light"} textAlign={"center"}>
            Rimmer
          </Heading>
        </Center>
        {isLargerThan800 ? (
          <HStack spacing={"8"}>{props.children}</HStack>
        ) : (
          <IconButton background ={"none"} icon={<HamburgerIcon />} aria-label={""} />
        )}
      </div>
    </Box>
  );
};
