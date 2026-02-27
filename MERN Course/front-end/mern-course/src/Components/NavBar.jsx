import React from "react";
import {
  Button,
  Container,
  Flex,
  Text,
  HStack,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { LuSun } from "react-icons/lu";
import { IoMoon } from "react-icons/io5";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW="1140px" px="4">
      <Flex
        h="16"
        alignItems="center"
        justifyContent="space-between"
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          bgGradient={"linear(to-r, cyan.500, blue.500)"}
          bgClip="text"
          fontSize={{ base: "22px", sm: "28px" }}
          textAlign="center"
          fontWeight="bold"
        >
          <Link to="/">Product Store 🛒</Link>
        </Text>

        <HStack>
          <Link to="/create">
            <Button>
              <CiSquarePlus />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default NavBar;
