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
} from "@chakra-ui/react";
import { HiPencilAlt, HiOutlineChevronDown } from "react-icons/hi";
import { useParams } from "react-router-dom";

import api from "../config/api";
import environment from "../config/environment";
import Header from "../layout/Header";

export type RelationParams = {
  id_elem_narr: number | null;
  label: string;
  descricao: string;
  prompt: string;
};

interface ModalRelationProps {
  elemCategory: string;
  elemName: string;
  path: string;
  storyId: number;
  type: string;
  title: string;
  index: number | null;
  value: RelationParams;
  isOpen: boolean;
  onClose: (saved: boolean, value?: RelationParams) => void;
};

const ModalRelation: React.FC<ModalRelationProps> = ({ isOpen, onClose, ...params }) => {
  const { id: elementId } = useParams();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(params.value || {
    id_elem_narr: null,
    label: "",
    descricao: "",
    prompt: "",
  });
  const [prompt, setPrompt] = useState("");
  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    api
      .get(`/${params.path}`, { params: { id_historia: params.storyId } })
      .then((res) => {
        const key = Object.keys(res.data)[0]; 
        setOptions(
          res.data[key].filter((item: any) => item.id_elem_narr !== parseInt(elementId || "")).map((item: any) => ({
            value: item.id_elem_narr,
            label: item.nome,
          })) || []
        );
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

  const saveRelation = async () => {
    if (value.label === "" || value.id_elem_narr === null) {
      toast({
        title: "Atenção",
        description: "Escolha um elemento para a relação",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });

      return;
    }

    setLoading(true);

    try {
      const res = await api.get("/relacao/descricao", { params: {
        categoria_1: params.elemCategory,
        nome_1: params.elemName,
        categoria_2: params.type,
        nome_2: value.label,
        prompt: prompt,
      } });
    
      const valueWithDescription = {
        ...value,
        prompt: res.data.prompt || prompt,
        descricao: res.data.result || prompt,
      };
  
      onClose(true, valueWithDescription);
    } catch (e) {
      toast({
        title: "Erro na geração da descrição",
        description: "Tente novamente mais tarde",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={() => onClose(false)} size="2xl">
      <ModalOverlay
        bg="rgba(0,0,0,0.5)"
        backdropFilter="auto"
        backdropBlur="2px"
      />
      <ModalContent>
        <ModalHeader>
          {params.title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex justify="center" flexWrap="nowrap">
            <Menu>
              <MenuButton
                as={Button}
                borderRadius="xl"
                border="1px solid black"
                w="30%"
                fontWeight={"regular"}
                rightIcon={
                  <HiOutlineChevronDown />
                }
                mr="2"
              >
                <Text isTruncated>{value.label || "Selecione"}</Text>
              </MenuButton>
              <MenuList>
                {options.map((option) => (
                  <MenuItem
                    key={option.value}
                    onClick={() => setValue({
                      id_elem_narr: option.value,
                      label: option.label,
                      descricao: "",
                      prompt: "",
                    })}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <Input
              bg="white"
              border="1px solid black"
              color="black"
              placeholder="Dê uma descrição para a relação"
              ml="2"
              w="full"
              borderRadius="xl"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </Flex>
          <Flex w="full" my="16px">
            <Spacer />
            <Button
              borderRadius="xl"
              bg="#3C6C66"
              color="white"
              mr="2"
              onClick={saveRelation}
              _hover={{ bg: "#36615C", color: "white" }}
              _active={{ bg: "#305651", color: "white" }}
              isLoading={loading}
            >
              {params.index !== null ? "Atualizar" : "Criar"}
            </Button>
            <Button
              borderRadius="xl"
              bg="red.700"
              color="white"
              _hover={{ bg: "red.800", color: "white" }}
              _active={{ bg: "red.900", color: "white" }}
              onClick={() => onClose(false)}
            >
              Cancelar
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalRelation;
