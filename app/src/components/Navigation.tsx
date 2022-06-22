import { React } from "react";
import {
  Box,
  Flex,
  //   Avatar,
  Link,
  Button,
  //   Menu,
  //   MenuButton,
  //   MenuList,
  //   MenuItem,
  //   MenuDivider,
  //   useDisclosure,
  useColorModeValue,
  Stack,
  HStack,
  useColorMode,
  //   Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const Links = [
  "Home",
  "Draw",
  "mapstuff",
  "template_one",
  "template_two",
  "template_three",
  "template_diag"
];
const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"/" + children}
  >
    {children}
  </Link>
);

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          {/* Make Logo Clickable + image ye?*/}
          <Box>Healers Adjust</Box>

          {/* 
          Updated Links array to add more pages/links to navbar
          */}
          <HStack
            as={"nav"}
            spacing={55}
            display={{ base: "none", md: "flex" }}
          >
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </HStack>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={20}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
