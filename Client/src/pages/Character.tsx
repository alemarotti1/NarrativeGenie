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
} from "@chakra-ui/react";
import { HiPencilAlt } from "react-icons/hi";
import { useParams } from 'react-router-dom';

import api from "../config/api";
import environment from "../config/environment";
import Header from "../layout/Header";

type CharacterParams = {
  id_elem_narr: number;
  nome: string;
  descricao: string;
  backstory: string;
  personalidade: string;
  especie: string;
  imagem: string;
  elemento_narrativo: {
    historia: {
      id_historia: number;
      nome: string;
    }
  }
};

const Character: React.FC = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<CharacterParams | null>(null);
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState(character?.backstory || "");
  const [titleValue, setTitleValue] = useState(character?.nome || "");
  const [backup, setBackup] = useState("");
  const toast = useToast();

  useEffect(() => {
    api.get(`/personagem/${id}`).then((res) => {
      setCharacter(res.data.character);
      setValue(res.data.character.backstory);
      setTitleValue(res.data.character.nome);
      setLoading(false);
    }).catch(err => {
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

  const story = character?.elemento_narrativo.historia;

  return (
    <>
      <Header text={story?.nome || "Carregando..."} href={`/worlds/${story?.id_historia}`} />
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
          gridGap={4}
          p="7"
          pt="5"
          pb="10"
          templateAreas={`
                  "main main"
                  "nav title"
                  "nav footer"
                  "tags tags"`}
          gridTemplateRows={"auto  0.5fr 4fr 2fr"}
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

          <GridItem area={"nav"} alignSelf="flex-end" alignItems={"flex-end"}>
            <Image
              alignSelf="auto"
              objectFit="cover"
              borderRadius="2xl"
              src={environment.API_URL + character?.imagem}
              alt="Lugar"
            />
          </GridItem>
          <GridItem area={"title"}>
          {disabled ? (
              <>
                <Text py="1" color="white" fontSize={"2xl"}>
                  {titleValue}
                </Text>
              </>
            ) : (
              <>
                <Input
                  value={titleValue}
                  bg="whiteAlpha.600"
                  border="0"
                  color="black"
                  fontWeight="bold"
                  //w="full"
                  onChange={handleTitleInputChange}
                />
              </>
            )}
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
                <Text py="1" color="white" fontWeight="normal">
                  {value}
                </Text>
              </>
            ) : (
              <>
                <Textarea
                  value={value}
                  bg="whiteAlpha.600"
                  border="0"
                  color="black"
                  resize="none"
                  w="full"
                  maxH="full"
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
          <GridItem area={"tags"} alignSelf="flex-start" mt="2">
            {Object.entries(related).map(([key, value]) => (
              <Text color="white" fontSize="xl">
                {capitalize(key)}:{" "}
                {value.map((v) => (
                  <Tag
                    m="2px"
                    fontWeight="bold"
                    fontSize="md"
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

export default Character;
