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
  useDisclosure,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import { HiPencilAlt, HiOutlineChevronDown, HiTrash } from "react-icons/hi";
import { TbMoneybag } from "react-icons/tb";
import { MdOutlineLocalHospital, MdOutlineWaterDrop } from "react-icons/md";
import { BsShieldShaded } from "react-icons/bs";
import { useParams } from "react-router-dom";

import api from "../config/api";
import environment from "../config/environment";
import Header from "../layout/Header";
import ModalList from "../components/ModalList";
import ModalRelation, { RelationParams } from "../components/ModalRelation";

type RelatedParams = {
  personagens: RelationParams[],
  lugares: RelationParams[],
  objetos: RelationParams[],
};

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

const relatedKeyToPath: Record<string, string> = {
  personagens: "personagem",
  objetos: "outro",
  lugares: "lugar",
};

const Place: React.FC = () => {
  const { id } = useParams();
  const [place, setPlace] = useState<PlaceParams | null>(null);
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState(place?.descricao || "");
  const [titleValue, setTitleValue] = useState(place?.nome || "");
  const [related, setRelated] = useState<RelatedParams>({
    personagens: [],
    lugares: [],
    objetos: [],
  });
  const [backup, setBackup] = useState("");
  const [backupTitle, setBackupTitle] = useState("");
  const [backupRelated, setBackupRelated] = useState<RelatedParams>({
    personagens: [],
    lugares: [],
    objetos: [],
  });
  const [modalConfig, setModalConfig] = useState({
    type: "",
    title: "",
    index: null,
    value: {
      id_elem_narr: null,
      label: "",
      descricao: "",
      prompt: ""
    }
  });
  const [listConfig, setListConfig] = useState({
    type: "",
    title: "",
    index: null,
    value: ""
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenList, onOpen: onOpenList, onClose: onCloseList } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    api
      .get(`/lugar/${id}`)
      .then((res) => {
        setPlace(res.data.place);
        setValue(res.data.place.descricao);
        setTitleValue(res.data.place.nome);
        const elemento_narrativo = res.data.place.elemento_narrativo;
  
        const personagens1 = elemento_narrativo?.relacao_relacao_id_elem_narr1Toelemento_narrativo?.filter((relacao: any) =>
          relacao.elemento_narrativo_relacao_id_elem_narr2Toelemento_narrativo.tipo === "personagem"
        ).map((relacao: any) => ({
          id_elem_narr: relacao.elemento_narrativo_relacao_id_elem_narr2Toelemento_narrativo.id_elem_narr,
          label: relacao.elemento_narrativo_relacao_id_elem_narr2Toelemento_narrativo["personagem"].nome,
          descricao: relacao.descricao,
          prompt: relacao.prompt,
        })) || [];
  
        const personagens2 = elemento_narrativo?.relacao_relacao_id_elem_narr2Toelemento_narrativo?.filter((relacao: any) =>
          relacao.elemento_narrativo_relacao_id_elem_narr1Toelemento_narrativo.tipo === "personagem"
        ).map((relacao: any) => ({
          id_elem_narr: relacao.elemento_narrativo_relacao_id_elem_narr1Toelemento_narrativo.id_elem_narr,
          label: relacao.elemento_narrativo_relacao_id_elem_narr1Toelemento_narrativo["personagem"].nome,
          descricao: relacao.descricao,
          prompt: relacao.prompt,
        })) || [];
  
        const lugares1 = elemento_narrativo?.relacao_relacao_id_elem_narr1Toelemento_narrativo?.filter((relacao: any) =>
          relacao.elemento_narrativo_relacao_id_elem_narr2Toelemento_narrativo.tipo === "lugar"
        ).map((relacao: any) => ({
          id_elem_narr: relacao.elemento_narrativo_relacao_id_elem_narr2Toelemento_narrativo.id_elem_narr,
          label: relacao.elemento_narrativo_relacao_id_elem_narr2Toelemento_narrativo["lugar"].nome,
          descricao: relacao.descricao,
          prompt: relacao.prompt,
        })) || [];
  
        const lugares2 = elemento_narrativo?.relacao_relacao_id_elem_narr2Toelemento_narrativo?.filter((relacao: any) =>
          relacao.elemento_narrativo_relacao_id_elem_narr1Toelemento_narrativo.tipo === "lugar"
        ).map((relacao: any) => ({
          id_elem_narr: relacao.elemento_narrativo_relacao_id_elem_narr1Toelemento_narrativo.id_elem_narr,
          label: relacao.elemento_narrativo_relacao_id_elem_narr1Toelemento_narrativo["lugar"].nome,
          descricao: relacao.descricao,
          prompt: relacao.prompt,
        })) || [];
  
        const objetos1 = elemento_narrativo?.relacao_relacao_id_elem_narr1Toelemento_narrativo?.filter((relacao: any) =>
          relacao.elemento_narrativo_relacao_id_elem_narr2Toelemento_narrativo.tipo === "outro"
        ).map((relacao: any) => ({
          id_elem_narr: relacao.elemento_narrativo_relacao_id_elem_narr2Toelemento_narrativo.id_elem_narr,
          label: relacao.elemento_narrativo_relacao_id_elem_narr2Toelemento_narrativo["outro"].nome,
          descricao: relacao.descricao,
          prompt: relacao.prompt,
        })) || [];
  
        const objetos2 = elemento_narrativo?.relacao_relacao_id_elem_narr2Toelemento_narrativo?.filter((relacao: any) =>
          relacao.elemento_narrativo_relacao_id_elem_narr1Toelemento_narrativo.tipo === "outro"
        ).map((relacao: any) => ({
          id_elem_narr: relacao.elemento_narrativo_relacao_id_elem_narr1Toelemento_narrativo.id_elem_narr,
          label: relacao.elemento_narrativo_relacao_id_elem_narr1Toelemento_narrativo["outro"].nome,
          descricao: relacao.descricao,
          prompt: relacao.prompt,
        })) || [];
  
        setRelated(related => ({
          ...related,
          personagens: [...personagens1, ...personagens2],
          lugares: [...lugares1, ...lugares2],
          objetos: [...objetos1, ...objetos2],
        }));
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
    setBackupTitle(titleValue);
    setBackupRelated(related);
    setDisabled(false);
  };


  const handleSave = () => {
    setLoading(true);
    setDisabled(true);

    api.patch(`/lugar/${id}`, {
      nome: titleValue,
      descricao: value,
      personagens: related.personagens.map((personagem: any) => ({ ...personagem, nome_relacao: "Relação" })),
      lugares: related.lugares.map((lugar: any) => ({ ...lugar, nome_relacao: "Relação" })),
      objetos: related.objetos.map((objeto: any) => ({ ...objeto, nome_relacao: "Relação" })),
    }).then(res => {
      toast({
        title: "Lugar atualizado",
        description: "As informações foram atualizadas com sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }).catch(err => {
      toast({
        title: "Erro na atualização",
        description: "Tente novamente mais tarde",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }).finally(() => {
      setLoading(false);
    });
  };

  const openModalList = (params: any) => {
    setListConfig({ ...params });

    onOpenList();
  };

  const closeModalList = (saved: boolean, value?: string) => {
    if (saved) {
      setRelated(related => {
        // @ts-ignore
        const newRelated = [...related[listConfig.type]];

        if (listConfig.index !== null) {
          newRelated[listConfig.index] = value;
        } else {
          newRelated.push(value);
        }
        
        return {
          ...related,
          [listConfig.type]: newRelated
        };
      });
    }

    onCloseList();
  };

  const openModal = (params: any) => {
    setModalConfig({ ...params });

    onOpen();
  };

  const closeModal = (saved: boolean, value?: RelationParams) => {
    if (saved) {
      setRelated(related => {
        // @ts-ignore
        const newRelated = [...related[modalConfig.type]];

        if (modalConfig.index !== null) {
          newRelated[modalConfig.index] = value;
        } else {
          newRelated.push(value);
        }
        
        return {
          ...related,
          [modalConfig.type]: newRelated
        };
      });
    }

    onClose();
  };

  const removeRelated = (type: string, index: number) => {
    setRelated(related => {
      // @ts-ignore
      const newRelated = [...related[type]];

      newRelated.splice(index, 1);

      return {
        ...related,
        [type]: newRelated
      };
    });
  };

  const story = place?.elemento_narrativo.historia;

  return (
    <>
      {isOpen && (<ModalRelation
        isOpen
        onClose={closeModal}
        path={relatedKeyToPath[modalConfig.type] || ""}
        storyId={story?.id_historia || 0}
        type={modalConfig.type}
        title={modalConfig.title}
        index={modalConfig.index}
        value={modalConfig.value}
        elemCategory="lugar"
        elemName={place?.nome || "Nome"}
      />)}
      {isOpenList && (<ModalList
        isOpen
        onClose={closeModalList}
        type={listConfig.type}
        title={listConfig.title}
        index={listConfig.index}
        value={listConfig.value}
      />)}
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
              onClick={() => (disabled ? handleEdit() : handleSave())}
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
                  setTitleValue(backupTitle);
                  setRelated(backupRelated);
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
              fallbackSrc="https://demofree.sirv.com/nope-not-here.jpg"
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
                {value.map((v, i) => (
                  <Tag
                    m="2px"
                    fontWeight="bold"
                    fontSize="sm"
                    borderRadius="xl"
                    color="orange.600"
                  >
                    <>
                      <Tooltip hasArrow label={(v as RelationParams).descricao} placement="top">
                        {(v as RelationParams).label}
                      </Tooltip>
                      {!disabled && (
                        <>
                          <Icon
                            as={HiPencilAlt}
                            ml="2"
                            cursor="pointer"
                            _hover={{ color: "orange.700" }}
                            _active={{ color: "orange.800" }}
                            onClick={() => openModal({
                              title: capitalize(key),
                              type: key,
                              index: i,
                              value: v,
                            })}
                          />
                          <Icon
                            as={HiTrash}
                            ml="1"
                            cursor="pointer"
                            _hover={{ color: "orange.700" }}
                            _active={{ color: "orange.800" }}
                            onClick={() => removeRelated(key, i)}
                          />
                        </>
                      )}
                    </>
                  </Tag>
                ))}
                {!disabled && (
                  <Tag
                    m="2px"
                    fontWeight="bold"
                    fontSize="md"
                    borderRadius="xl"
                    color="white"
                    bg="whiteAlpha.600"
                    cursor="pointer"
                    _hover={{ bg: "whiteAlpha.700" }}
                    _active={{ bg: "whiteAlpha.700" }}
                    onClick={() => openModal({
                      title: capitalize(key),
                      type: key,
                      index: null,
                      value: {
                        id_elem_narr: null,
                        label: "",
                        descricao: "",
                        prompt: ""
                      },
                    })}
                  >
                    +
                  </Tag>
                )}
              </Text>
            ))}
          </GridItem>
        </Grid>
      </Flex>
    </>
  );
};

export default Place;
