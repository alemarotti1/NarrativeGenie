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
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { HiOutlineSearch } from "react-icons/hi";
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
  created_at: any;
  updated_at: any;
};

const Worlds: React.FC = () => {
  const [worlds, setWorlds] = useState<WorldParams[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const options = ["Nome", "Mais novo", "Mais antigo", "Última atualização"];
  const [option, setOption] = useState("Nome");
  const [searchString, setSearchString] = useState("");
  const [sort, setSort] = useState("Nome");

  useEffect(() => {
    fetchWorlds();
  }, []);

  const fetchWorlds = () => {
    setLoading(true);
    api
      .get("/historia", { params: { email: "teste@teste.com" } })
      .then((res) => {
        setWorlds(res.data.stories || []);
        setLoading(false);
      })
      .catch((err) => {
        toast({
          title: "Erro no carregamento",
          description: "Tente novamente mais tarde",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const deleteWorld = (id: string) => {
    api
      .delete(`/historia/${id}`)
      .then((res) => {
        fetchWorlds();
      })
      .catch((err) => {
        toast({
          title: "Erro ao apagar",
          description: "Tente novamente mais tarde",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const handleSearch = (e: any) => {
    const value = e.target.value.toLowerCase();
    setSearchString(value);
  };

  const filteredData = (ws: WorldParams[]) => {
    let filteredItems = ws.filter(
      (w) => w.nome.toLowerCase().indexOf(searchString) > -1
    );
    return filteredItems;
  };

  const classification = (sort_by: string) => {
    setSort(sort_by);
  };

  const sortedData = (ws: WorldParams[]) => {
    switch (sort) {
      case "Nome":
        ws = ws.sort(function (a, b) {
          if (a.nome < b.nome) return -1;
          else if (a.nome > b.nome) return 1;
          return 0;
        });
        return ws;
      case "Mais antigo":
        ws = ws.sort(function (a, b) {
          if (a.created_at < b.created_at) return -1;
          else if (a.created_at > b.created_at) return 1;
          return 0;
        });
        return ws;
      case "Mais novo":
        ws = ws.sort(function (a, b) {
          if (a.created_at < b.created_at) return 1;
          else if (a.created_at > b.created_at) return -1;
          return 0;
        });
        return ws;
      case "Última atualização":
        ws = ws.sort(function (a, b) {
          if (a.updated_at < b.updated_at) return 1;
          else if (a.updated_at > b.updated_at) return -1;
          return 0;
        });
        return ws;
    }
  };

  const formattedData = (ws: WorldParams[]) => {
    let newItems: any;

    newItems = filteredData(ws);
    newItems = sortedData(newItems);
    return newItems;
  };

  return (
    <Flex direction={"column"}>
      <Header text="Mundos" href="/worlds" />
      <Flex
        px="4"
        justifyContent={"flex-end"}
        py="1"
        bg="rgba(0,0,0,0.5)"
        align="center"
        mx="20"
        style={{
          borderRadius: "30px",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.8)",
        }}
      >
        <Flex
          w="fit-content"
          alignSelf={"flex-end"}
          borderRadius="3xl"
          justifyContent="flex-end"
        >
          <InputGroup
            bg="gray.200"
            border="1px solid black"
            color="black"
            w="50%"
            ml="2"
            borderRadius="3xl"
            my="auto"
          >
            <Input
              size="sm"
              placeholder="Pesquisar..."
              h="25px"
              borderRadius="3xl"
              onChange={handleSearch}
            />
            <InputRightElement>
              <HiOutlineSearch
                size="20px"
                style={{ marginTop: "-15px", color: "gray" }}
              />
            </InputRightElement>
          </InputGroup>
          <Menu>
            <MenuButton
              as={Button}
              size="sm"
              ml="2"
              pr="7"
              bg="none"
              color="white"
              _hover={{ bg: "#4e4a44" }}
              _active={{ bg: "#4e4a44" }}
              borderRadius="3xl"
              fontWeight={"regular"}
              leftIcon={<BsFilter />}
            >
              {`Ordenar por: ${option}`}
            </MenuButton>
            <MenuList>
              {options.map((op) => (
                <MenuItem
                  bg={option == op ? "gray.200" : "none"}
                  _hover={{ bg: "gray.200" }}
                  onClick={() => {
                    setOption(op);
                    classification(op);
                  }}
                >
                  {op}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {loading ? (
        <Flex w="full" justify="center" py="10">
          <Spinner color="white" size="lg" />
        </Flex>
      ) : (
        <>
          {formattedData(worlds)?.map((world: any) => (
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
                    size="sm"
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
                  size="sm"
                  variant="solid"
                  bg="red.700"
                  textColor="white"
                  fontWeight="regular"
                  borderRadius="3xl"
                  onClick={() => deleteWorld(world.id_historia)}
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
