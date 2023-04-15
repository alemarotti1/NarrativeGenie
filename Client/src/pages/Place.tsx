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
} from "@chakra-ui/react";
import { HiPencilAlt } from "react-icons/hi";
import { useParams } from 'react-router-dom';

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
    }
  }
};

const Place: React.FC = () => {
  const { id } = useParams();
  const [place, setPlace] = useState<PlaceParams | null>(null);
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState(place?.descricao || "");
  const [TitleValue, setTitleValue] = useState("Noldorin Glynkas");
  const [backup, setBackup] = useState("");

  useEffect(() => {
    api.get(`/lugar/${id}`).then((res) => {
      setPlace(res.data.place);
      setValue(res.data.place.descricao);
      setLoading(false);
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
          >
            <Button
              variant="solid"
              bg="none"
              textColor="white"
              fontWeight="regular"
              borderRadius="3xl"
              onClick={() => (disabled ? handleEdit() : setDisabled(true))}
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
              src={environment.API_URL + place?.imagem}
              alt="Lugar"
            />
          </GridItem>
          <GridItem area={"title"}>
          {disabled ? (
              <>
                <Text py="1" color="white" fontSize={"xl"}>
                  {TitleValue}
                </Text>
              </>
            ) : (
              <>
                <Input
                  value={TitleValue}
                  bg="white"
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
                <Text color="white" fontSize="xl">
                  {place?.nome}
                </Text>
                <Text py="1" color="white" fontWeight="normal">
                  {value}
                </Text>
              </>
            ) : (
              <>
                <Textarea
                  value={value}
                  bg="white"
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

export default Place;
