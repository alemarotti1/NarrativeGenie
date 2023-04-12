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
  Heading,
} from "@chakra-ui/react";
import { RiMenuFill } from "react-icons/ri";

import logo from "../assets/logo_img.svg";
import avatar from "../assets/avatar.png";

const Header: React.FC = () => {
  return (
    <Flex
      px="4"
      py="3"
      bg="rgba(0,0,0,0.7)"
      align="center"
      mx="10"
      my="10"
      style={{
        borderRadius: "30px",
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.7)",
      }}
    >
      <Image src={logo} alt="logo" h="20" />
      <Heading
        pl="4"
        fontSize="70px"
        textColor="white"
        fontFamily="Fondamento"
        fontWeight="regular"
      >
        Narrative Genie
      </Heading>
      <Spacer />
      <Text
        color="white"
        fontSize="2xl"
        fontFamily={"Fondamento"}
        fontWeight="regular"
      >
        Olá, autor
      </Text>
      <Avatar ml="4" size="md" name="Autor" src={avatar} />
      <Menu>
        <MenuButton
          as={IconButton}
          ml="2"
          aria-label="Menu"
          icon={<RiMenuFill size="25px" />}
          color="white"
          bg="none"
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
