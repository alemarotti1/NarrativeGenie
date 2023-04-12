import React from "react";
import {
  Button,
  Flex,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Image,
} from "@chakra-ui/react";
import { HiOutlineChevronDown, HiOutlinePlusCircle } from "react-icons/hi";
import image from "../assets/image.png";

const Root: React.FC = () => {
  return (
    <>
      <Flex
        w="60%"
        maxWidth={"1000px"}
        m="auto"
        px="1"
        py="7"
        direction="column"
        align="center"
        justify="center"
        bg="rgba(255,255,255,0.2)"
        borderRadius="30px"
        boxShadow="0px 10px 30px rgba(0, 0, 0, 0.5)"
      >
        <Heading as="h1" color="white" fontWeight={"regular"}>
          O que vamos criar hoje?
        </Heading>
        <Flex mt="4" mb="4" w="container.md" maxW="full">
          <Menu>
            <MenuButton
              as={Button}
              borderRadius="xl"
              border="1px solid black"
              w="25%"
              fontWeight={"regular"}
              rightIcon={
                <HiOutlineChevronDown style={{ marginLeft: "30px" }} />
              }
            >
              Categoria
            </MenuButton>
            <MenuList>
              <MenuItem>Personagem</MenuItem>
              <MenuItem>Lugar</MenuItem>
              <MenuItem>Objeto</MenuItem>
              <MenuDivider />
              <MenuItem>
                <HiOutlinePlusCircle style={{ marginRight: "5px" }} />
                Adicionar nova
              </MenuItem>
            </MenuList>
          </Menu>
          <Input
            bg="white"
            border="1px solid black"
            color="black"
            placeholder="Digite o que você deseja criar..."
            ml="2"
            w="full"
            borderRadius="xl"
          />
          <Button
            ml="2"
            w="15%"
            bg="black"
            color="white"
            _hover={{ bg: "#4e4a44" }}
            _active={{ bg: "#4e4a44" }}
            borderRadius="xl"
            fontWeight={"regular"}
          >
            Criar
          </Button>
        </Flex>
      </Flex>
      <Image src={image} w="lg" marginX="auto" marginBottom="3" />
    </>
  );
};

export default Root;
