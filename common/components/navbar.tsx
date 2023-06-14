import {
  Box,
  Stack,
  HStack,
  Heading,
  Button,
  Center,
  useMediaQuery,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Phi } from "../constants";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export const NavBar = ({ routes }: { routes: any[] }) => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const [desktopView] = useMediaQuery("(min-width: 768px)");

  const router = useRouter();

  return (
    <Box
      role="navigation"
      width={"100%"}
      justifyContent={"center"}
      height={`64px`}
      display={"flex"}
    >
      <Box
        display={"flex"}
        width={desktopView ? "750px" : "95%"}
        alignItems="center"
        justifyContent="space-between"
      >
        <Center>
          <Text
            onClick={() => router.push("/")}
            cursor={"pointer"}
            fontSize={"24px"}
            fontWeight={"semibold"}
            textAlign={"center"}
          >
            Rimmer
          </Text>
        </Center>
        {desktopView ? (
          <HStack spacing={"7"}>
            {routes.map((route) => (
              <Button
                onClick={() => router.push(route.path)}
                key={route.path}
                fontSize={"md"}
              >
                {route.title}
              </Button>
            ))}
          </HStack>
        ) : (
          <Menu>
            <MenuButton as={IconButton} icon={<HamburgerIcon boxSize={6} />} />
            <MenuList>
              {routes.map((route) => (
                <MenuItem
                  key={route.title}
                  onClick={() => router.push(route.path)}
                >
                  {route.title}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        )}
      </Box>
    </Box>
  );
};
