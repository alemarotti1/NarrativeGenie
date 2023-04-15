import React from "react";
import {
  Button,
  Flex,
  Heading,
  Input,
  Image,
  InputGroup,
  InputRightElement,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { HiOutlineSearch, HiOutlineFilter } from "react-icons/hi";
import { BsFilter } from "react-icons/bs";

import Header from "../layout/Header";
import { useNavigate } from "react-router-dom";

const Worlds: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Flex direction={"column"}>
      <Header text="Mundos" href="/worlds" />
      <Flex
        w="fit-content"
        alignSelf={"flex-end"}
        px="6"
        py="1"
        borderRadius="3xl"
        mx="10"
        bg="rgba(0,0,0,0.4)"
        justifyContent="flex-end"
      >
        <InputGroup
          bg="gray.200"
          border="1px solid black"
          color="black"
          h="25px"
          w="50%"
          ml="2"
          borderRadius="3xl"
          my="auto"
        >
          <Input placeholder="Pesquisar..." h="25px" borderRadius="3xl"></Input>
          <InputRightElement>
            <HiOutlineSearch
              size="20px"
              style={{ marginTop: "-15px", color: "gray" }}
            />
          </InputRightElement>
        </InputGroup>

        <Button
          ml="2"
          bg="none"
          color="white"
          _hover={{ bg: "#4e4a44" }}
          _active={{ bg: "#4e4a44" }}
          borderRadius="3xl"
          fontWeight={"regular"}
        >
          <BsFilter style={{ marginRight: "5px" }} />
          Classificar
        </Button>

        <Button
          ml="2"
          bg="none"
          color="white"
          _hover={{ bg: "#4e4a44" }}
          _active={{ bg: "#4e4a44" }}
          borderRadius="3xl"
          fontWeight={"regular"}
        >
          <HiOutlineFilter style={{ marginRight: "5px" }} />
          Filtrar
        </Button>
      </Flex>

      <Grid
        mt="10"
        mx="10"
        bg="rgba(0,0,0,0.6)"
        border="none"
        borderRadius="3xl"
        p="5"
        gridGap={3}
        templateAreas={`
                  "nav main"
                  "nav footer"`}
        gridTemplateRows={"1fr 40px"}
        gridTemplateColumns={"200px 1fr"}
        h="250px"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem p="0" area={"nav"}>
          <Image
            w="full"
            h="full"
            margin="auto"
            objectFit="cover"
            borderRadius="2xl"
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Caffe Latte"
          />
        </GridItem>
        <GridItem pl="2" area={"main"} overflow="hidden">
          <Heading color="white" size="md">
            Witunkles, The Spirit Vales
          </Heading>
          <Text
            py="1"
            color="white"
            fontWeight="normal"
            maxH="200px"
            style={{
              display: "-webkit-box",
              maxWidth: "full",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: "5",
              WebkitBoxOrient: "vertical",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          </Text>
        </GridItem>
        <GridItem
          area={"footer"}
          p="0"
          display="flex"
          justifyContent="flex-end"
        >
          <Button
            variant="solid"
            bg="#3C6C66"
            textColor="white"
            fontWeight="regular"
            borderRadius="3xl"
            mr="2"
            onClick={() => navigate("/world")}
          >
            Ver mais
          </Button>
          <Button
            variant="solid"
            bg="red.700"
            textColor="white"
            fontWeight="regular"
            borderRadius="3xl"
          >
            Deletar
          </Button>
        </GridItem>
      </Grid>

      <Grid
        mt="10"
        mx="10"
        bg="rgba(0,0,0,0.6)"
        border="none"
        borderRadius="3xl"
        p="5"
        gridGap={3}
        templateAreas={`
                  "nav main"
                  "nav footer"`}
        gridTemplateRows={"1fr 40px"}
        gridTemplateColumns={"200px 1fr"}
        h="250px"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem p="0" area={"nav"}>
          <Image
            w="full"
            h="full"
            margin="auto"
            objectFit="cover"
            borderRadius="2xl"
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Caffe Latte"
          />
        </GridItem>
        <GridItem pl="2" area={"main"} overflow="hidden">
          <Heading color="white" size="md">
            Witunkles, The Spirit Vales
          </Heading>
          <Text
            py="1"
            color="white"
            maxH="200px"
            fontWeight="normal"
            style={{
              display: "-webkit-box",
              maxWidth: "full",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: "5",
              WebkitBoxOrient: "vertical",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          </Text>
        </GridItem>
        <GridItem
          area={"footer"}
          p="0"
          display="flex"
          justifyContent="flex-end"
        >
          <Button
            variant="solid"
            bg="#3C6C66"
            textColor="white"
            fontWeight="regular"
            borderRadius="3xl"
            mr="2"
          >
            Ver mais
          </Button>
          <Button
            variant="solid"
            bg="red.700"
            textColor="white"
            fontWeight="regular"
            borderRadius="3xl"
          >
            Deletar
          </Button>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Worlds;
