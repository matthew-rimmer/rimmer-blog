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
      height={`calc(100vh / ${Phi}/8)`}
      bg={"#3d658d"}
      fontWeight={"light"}
      textColor={"#f6f7f5"}
    >
      <div
        style={{
          alignItems: "center",
          height: "100%",
          padding: desktopView
            ? `0 calc((100% - (100% / ${Phi}))/2)`
            : `0 calc((100% - (100% / ${Phi / 1.5}))/2)`,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Center>
          <Heading size={"lg"} fontWeight={"light"} textAlign={"center"}>
            Rimmer
          </Heading>
        </Center>
        {desktopView ? (
          <HStack spacing={"8"}>
            {routes.map((route) => (
              <Button
                bg={"transparent"}
                onClick={() => router.push(route.path)}
                key={route.path}
                aria-label={""}
                fontSize={"md"}
                fontWeight={"light"}
              >
                {route.title}
              </Button>
            ))}
          </HStack>
        ) : (
          <Menu>
            <MenuButton
              as={IconButton}
              background={"none"}
              icon={<HamburgerIcon boxSize={6} />}
              aria-label={""}
            />
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
      </div>
    </Box>
  );
};
