import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Image,
  GridItem,
  Grid,
  Text,
  Textarea,
  Tag,
  Input,
  useToast,
  Box,
} from "@chakra-ui/react";
import { HiPencilAlt } from "react-icons/hi";
import { TbMoneybag } from "react-icons/tb";
import { MdOutlineLocalHospital, MdOutlineWaterDrop } from "react-icons/md";
import { BsShieldShaded } from "react-icons/bs";
import { useParams } from "react-router-dom";

import api from "../config/api";
import environment from "../config/environment";
import Header from "../layout/Header";

type PlaceParams = {
  id_elem_narr: number;
  nome: string;
  descricao: string;
  imagem: string;
  riqueza: number;
  saude: number;
  seguranca: number;
  agua: number;
  elemento_narrativo: {
    historia: {
      id_historia: number;
      nome: string;
    };
  };
};

const Place: React.FC = () => {
  const { id } = useParams();
  const [place, setPlace] = useState<PlaceParams | null>(null);
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState(place?.descricao || "");
  const [titleValue, setTitleValue] = useState(place?.nome || "");
  const [backup, setBackup] = useState("");
  const toast = useToast();

  useEffect(() => {
    api
      .get(`/lugar/${id}`)
      .then((res) => {
        setPlace(res.data.place);
        setValue(res.data.place.descricao);
        setTitleValue(res.data.place.nome);
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
  }, []);

  const related = {
    personagens: ["Chasianna Darkweaver", "Thorfinn Glynkas"],
    lugares: ["Aranthia", "Celestyal City"],
    personalidade: ["temperamental", "corajoso", "determinado"],
    caracteristicas: ["alto", "forte", "olhos pretos"],
  };

  const handleInputChange = (e: any) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

  const handleTitleInputChange = (e: any) => {
    const inputValue = e.target.value;
    setTitleValue(inputValue);
  };
  const capitalize = (string: string) => {
    return <text>{string[0].toUpperCase() + string.substring(1)}</text>;
  };

  const handleEdit = () => {
    setBackup(value);
    setDisabled(false);
  };

  const story = place?.elemento_narrativo.historia;

  return (
    <>
      <Header
        text={story?.nome || "Carregando..."}
        href={`/worlds/${story?.id_historia}`}
      />
      <Flex
        direction={"column"}
        h="fit-content"
        align="center"
        overflow="hidden"
        m="10"
        mr="5"
      >
        <Grid
          w="full"
          h="full"
          bg="rgba(0,0,0,0.4)"
          border="none"
          borderRadius="3xl"
          overflowY={"scroll"}
          sx={{
            "&::-webkit-scrollbar": {
              width: "16px",
              borderRadius: "8px",
              backgroundColor: "none",
            },
            "&::-webkit-scrollbar-thumb": {
              borderRadius: "8px",
              backgroundColor: `rgba(0, 0, 0, 0.8)`,
            },
          }}
          gridGap={3}
          p="7"
          pt="5"
          pb="10"
          templateAreas={`
                  "main main"
                  "nav footer"
                  "tags tags"
                  "relations relations"`}
          gridTemplateRows={"1fr  auto 1fr 2fr"}
          gridTemplateColumns={"1fr 3fr"}
          color="blackAlpha.700"
          fontWeight="bold"
        >
          <GridItem
            area="main"
            display="flex"
            alignItems="flex-end"
            justifyContent="flex-end"
            gap="2"
          >
            <Button
              size="sm"
              variant="solid"
              bg="none"
              textColor="white"
              fontWeight="regular"
              borderRadius="3xl"
              onClick={() => (disabled ? handleEdit() : setDisabled(true))}
              _hover={{ bg: "whiteAlpha.200" }}
              _active={{ bg: "whiteAlpha.300" }}
            >
              <HiPencilAlt style={{ marginRight: "5px" }} />
              {disabled ? "Editar" : "Salvar"}
            </Button>
            {disabled ? (
              <></>
            ) : (
              <Button
                size="sm"
                variant="solid"
                bg="none"
                textColor="white"
                fontWeight="regular"
                borderRadius="3xl"
                onClick={() => {
                  setDisabled(true);
                  setValue(backup);
                }}
                _hover={{ bg: "whiteAlpha.200" }}
                _active={{ bg: "whiteAlpha.300" }}
              >
                Cancelar
              </Button>
            )}
          </GridItem>

          <GridItem area={"nav"} alignSelf="auto">
            <Image
              alignSelf="auto"
              objectFit="cover"
              borderRadius="2xl"
              src={environment.API_URL + place?.imagem}
              alt="Lugar"
            />
          </GridItem>
          <GridItem
            area={"footer"}
            overflowY={disabled ? "scroll" : "hidden"}
            sx={{
              "&::-webkit-scrollbar": {
                width: "16px",
                borderRadius: "8px",
                backgroundColor: "none",
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "8px",
                backgroundColor: `rgba(0, 0, 0, 0.8)`,
              },
            }}
          >
            {disabled ? (
              <>
                <Text color="white">{titleValue}</Text>
                <Text color="white" fontWeight="normal">
                  {value}
                </Text>
              </>
            ) : (
              <>
                <Input
                  size="sm"
                  mb="1"
                  value={titleValue}
                  bg="white"
                  w="full"
                  onChange={handleTitleInputChange}
                />
                <Textarea
                  size="sm"
                  value={value}
                  bg="white"
                  w="full"
                  maxH="87%"
                  h="full"
                  onChange={handleInputChange}
                  overflowY="scroll"
                  sx={{
                    "&::-webkit-scrollbar": {
                      width: "16px",
                      borderRadius: "8px",
                      backgroundColor: "none",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      borderRadius: "8px",
                      backgroundColor: `rgba(0, 0, 0, 0.8)`,
                    },
                  }}
                />
              </>
            )}
          </GridItem>
          <GridItem
            area={"tags"}
            alignSelf="flex-start"
            mt="2"
            display={"flex"}
          >
            <Flex alignItems={"center"} mr="5">
              <Text
                color="white"
                fontSize="xl"
                w="fit-content"
                bg="yellow.500"
                borderRadius={"full"}
                p="5px"
              >
                <TbMoneybag />
              </Text>
              {new Array(place?.riqueza || 0).fill(0).map((_, i) => (
                <Box
                  w="15px"
                  key={i}
                  h="15px"
                  borderRadius="sm"
                  bg="yellow.700"
                  ml="3px"
                ></Box>
              ))}
            </Flex>
            <Flex alignItems={"center"} mr="5">
              <Text
                color="white"
                fontSize="xl"
                w="fit-content"
                bg="red.500"
                borderRadius={"full"}
                p="5px"
              >
                <MdOutlineLocalHospital />
              </Text>
              {new Array(place?.saude || 0).fill(0).map((_, i) => (
                <Box
                  w="15px"
                  key={i}
                  h="15px"
                  borderRadius="sm"
                  bg="red.700"
                  ml="3px"
                ></Box>
              ))}
            </Flex>
            <Flex alignItems={"center"} mr="5">
              <Text
                color="white"
                fontSize="xl"
                w="fit-content"
                bg="green.500"
                borderRadius={"full"}
                p="5px"
              >
                <BsShieldShaded />
              </Text>
              {new Array(place?.seguranca || 0).fill(0).map((_, i) => (
                <Box
                  w="15px"
                  key={i}
                  h="15px"
                  borderRadius="sm"
                  bg="green.700"
                  ml="3px"
                ></Box>
              ))}
            </Flex>
            <Flex alignItems={"center"} mr="5">
              <Text
                color="white"
                fontSize="xl"
                w="fit-content"
                bg="blue.500"
                borderRadius={"full"}
                p="5px"
              >
                <MdOutlineWaterDrop />
              </Text>
              {new Array(place?.agua || 0).fill(0).map((_, i) => (
                <Box
                  w="15px"
                  key={i}
                  h="15px"
                  borderRadius="sm"
                  bg="blue.700"
                  ml="3px"
                ></Box>
              ))}
            </Flex>
          </GridItem>
          <GridItem area={"relations"} alignSelf="flex-start" mt="2">
            {Object.entries(related).map(([key, value]) => (
              <Text color="white" fontSize="md">
                {capitalize(key)}:{" "}
                {value.map((v) => (
                  <Tag
                    m="2px"
                    fontWeight="bold"
                    fontSize="sm"
                    borderRadius="xl"
                    color="orange.600"
                  >
                    {v}
                  </Tag>
                ))}
              </Text>
            ))}
          </GridItem>
        </Grid>
      </Flex>
    </>
  );
};

export default Place;
