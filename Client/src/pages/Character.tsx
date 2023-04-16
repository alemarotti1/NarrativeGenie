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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spacer,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";
import { HiPencilAlt, HiOutlineChevronDown, HiTrash } from "react-icons/hi";
import { useParams } from "react-router-dom";

import api from "../config/api";
import environment from "../config/environment";
import Header from "../layout/Header";
import ModalList from "../components/ModalList";

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
    };
  };
};

const Character: React.FC = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<CharacterParams | null>(null);
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState(character?.descricao || "");
  const [titleValue, setTitleValue] = useState(character?.nome || "");
  const [backup, setBackup] = useState("");
  const [backupTitle, setBackupTitle] = useState("");
  const [related, setRelated] = useState({
    personagens: ["Chasianna Darkweaver", "Thorfinn Glynkas"],
    lugares: ["Aranthia", "Celestyal City"],
    personalidade: [],
    caracteristicas: [],
  });
  const [modalConfig, setModalConfig] = useState({
    type: "",
    title: "",
    id: null,
    value: ""
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
    api.get(`/personagem/${id}`).then((res) => {
      setCharacter(res.data.character);
      setValue(res.data.character.backstory);
      setTitleValue(res.data.character.nome);
      setRelated(related => ({
        ...related,
        personalidade: res.data.character.personalidade.split(","),
        caracteristicas: res.data.character.descricao.split(","),
      }));
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
    setDisabled(false);
  };

  const handleSave = () => {
    setLoading(true);
    setDisabled(true);

    api.patch(`/personagem/${id}`, {
      nome: titleValue,
      backstory: value,
      personalidade: related.personalidade.join(","),
      descricao: related.caracteristicas.join(","),
    }).then(res => {
      toast({
        title: "Personagem atualizado",
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

  const story = character?.elemento_narrativo.historia;

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay
          bg="rgba(0,0,0,0.5)"
          backdropFilter="auto"
          backdropBlur="2px"
        />
        <ModalContent>
          <ModalHeader>
            Adicionar relação a {character?.nome}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justify="center" flexWrap="nowrap">
              <Menu>
                <MenuButton
                  as={Button}
                  margin="auto"
                  borderRadius="xl"
                  border="1px solid black"
                  fontWeight={"regular"}
                  rightIcon={
                    <HiOutlineChevronDown style={{ marginLeft: "30px" }} />
                  }
                >
                  teste
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    Mundo 1
                  </MenuItem>
                  <MenuItem>
                    Mundo 2
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
            </Flex>
            <Flex w="full" my="16px">
              <Spacer />
              <Button
                borderRadius="xl"
                bg="#3C6C66"
                color="white"
                mr="2"
              >
                Criar
              </Button>
              <Button borderRadius="xl" bg="red.700" color="white" onClick={onClose}>
                Cancelar
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      {isOpenList && (<ModalList
        isOpen
        onClose={closeModalList}
        type={listConfig.type}
        title={listConfig.title}
        index={listConfig.index}
        value={listConfig.value}
      />)}
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
          gridGap={3}
          p="7"
          pt="5"
          pb="10"
          templateAreas={`
                  "main main"
                  "nav footer"
                  "tags tags"`}
          gridTemplateRows={"1fr  auto 2fr"}
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
              src={environment.API_URL + character?.imagem}
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
                <Text color="white">
                  {titleValue}
                </Text>
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
          <GridItem area={"tags"} alignSelf="flex-start" mt="2">
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
                    {v}
                    {!disabled && (
                      <>
                        <Icon
                          as={HiPencilAlt}
                          ml="2"
                          cursor="pointer"
                          _hover={{ color: "orange.700" }}
                          _active={{ color: "orange.800" }}
                          onClick={() => ["personalidade", "caracteristicas"].includes(key) ? openModalList({
                            title: capitalize(key),
                            type: key,
                            index: i,
                            value: v,
                          }) : openModal({
                            title: capitalize(key),
                            type: key,
                            id: null,
                            value: "",
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
                    onClick={() => ["personalidade", "caracteristicas"].includes(key) ? openModalList({
                      title: capitalize(key),
                      type: key,
                      index: null,
                      value: "",
                    }) : openModal({
                      title: capitalize(key),
                      type: key,
                      id: null,
                      value: "",
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

export default Character;
