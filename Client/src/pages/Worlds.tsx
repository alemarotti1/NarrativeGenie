import React, { useState, useEffect } from "react";
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
  Spinner,
} from "@chakra-ui/react";
import { HiOutlineSearch, HiOutlineFilter } from "react-icons/hi";
import { BsFilter } from "react-icons/bs";
import { Link } from "react-router-dom";

import api from "../config/api";
import environment from "../config/environment";
import Header from "../layout/Header";

type WorldParams = {
  id_historia: string;
  nome: string;
  descricao: string;
  path_img_capa: string;
  email_escritor: string;
};

const Worlds: React.FC = () => {
  const [worlds, setWorlds] = useState<WorldParams[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/historia", { params: { email: "teste@teste.com" }}).then((res) => {
      setWorlds(res.data.stories || []);
      setLoading(false);
    });
  }, []);

  return (
    <Flex direction={"column"} mb="40px">
      <Header text="Mundos" href="/worlds" />
      <Flex
        w="fit-content"
        alignSelf={"flex-end"}
        px="6"
        py="1"
        borderRadius="3xl"
        mx="10"
        mt="-6"
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

      {loading ? (
        <Flex w="full" alignSelf="center" py="10">
          <Spinner color="white" size="lg" />
        </Flex>
      ) : (
        <>
          {worlds.map(world => (
            <Grid
              key={world.id_historia}
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
                  src={environment.API_URL + world.path_img_capa}
                  alt="Imagem do mundo"
                />
              </GridItem>
              <GridItem pl="2" area={"main"} overflow="hidden">
                <Heading color="white" size="md">
                  {world.nome}
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
                  {world.descricao}
                </Text>
              </GridItem>
              <GridItem
                area={"footer"}
                p="0"
                display="flex"
                justifyContent="flex-end"
              >
                <Link to={`/worlds/${world.id_historia}`}>
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
                </Link>
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
          ))}
        </>
      )}
    </Flex>
  );
};

export default Worlds;
