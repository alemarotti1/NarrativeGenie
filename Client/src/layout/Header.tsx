import React from "react";
import {
  Avatar,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { RiMenuFill } from "react-icons/ri";

import logo from "../assets/logo.png";

const Header: React.FC = () => {
  return (
    <Flex w="full" px="4" py="2" bg="#665c4e" align="center">
      <Image src={logo} alt="logo" h="10" />
      <Spacer />
      <Text color="white">Olá, autor</Text>
      <Avatar ml="4" size="sm" name="Autor" src="https://bit.ly/sage-adebayo" />
      <Menu>
        <MenuButton
          as={IconButton}
          ml="4"
          aria-label="Menu"
          icon={<RiMenuFill />}
          color="white"
          bg="whiteAlpha.200"
          _hover={{ color: "white", bg: "whiteAlpha.300" }}
          _active={{ color: "white", bg: "whiteAlpha.300" }}
        />
        <MenuList>
          <MenuItem>Perfil</MenuItem>
          <MenuItem>Mundos</MenuItem>
          <MenuItem>Configurações</MenuItem>
          <MenuItem>Sair</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Header;
