import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Spacer,
} from "@chakra-ui/react";
import { HiOutlineChevronDown, HiOutlinePlusCircle } from "react-icons/hi";

import image from "../assets/image.png";
import api from "../config/api";

const categories = ["Personagem", "Lugar", "Objeto"];
const worlds = [
  "Witunkles, The Spirit Vales",
  "Eldlubach, Reach of the Elders",
];

import Header from "../layout/Header";

const Root: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("Categoria");
  const [worlds, setWorlds] = useState<any[]>([]);
  const [world, setWorld] = useState("Mundo");
  const [prompt, setPrompt] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    api.get("/historia", { params: { email: "teste@teste.com" }}).then((res) => {
      setWorlds(res.data.stories.map((story: any) => ({
        value: story.id_historia,
        label: story.nome
      })) || []);
    });
  }, []);

  const handleCategory = (category: string) => {
    setCategory(category);
  };

  const handleCreate = () => {
    setIsLoading(true);
    const id_historia = worlds.find((w: any) => w.label === world)?.value;
    api.post(`/${category.toLowerCase()}`, { gptPrompt: prompt, waifuPrompt: prompt, id_historia }).then(res => {
      alert(`ID do ${category.toLowerCase()}: ` + res.data.id);
      setPrompt("");
      onClose();
      setIsLoading(false);
    });
  };

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
            Selecione a qual mundo esse {category.toLowerCase()} pertence
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            justifyContent="center"
            display="flex"
            flexWrap="nowrap"
            mb="16px"
          >
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
                {world}
              </MenuButton>
              <MenuList>
                {worlds.map((world) => (
                  <MenuItem onClick={() => setWorld(world.label)} key={world.value}>
                    {world.label}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <Spacer />
            <Button
              borderRadius="xl"
              bg="#3C6C66"
              mr="2"
              isLoading={isLoading}
              onClick={handleCreate}
            >
              Criar
            </Button>
            <Button borderRadius="xl" bg="red.700" onClick={onClose}>
              Cancelar
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Header />
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
              {category}
            </MenuButton>
            <MenuList>
              {categories.map((category) => (
                <MenuItem
                  onClick={() => handleCategory(category)}
                  key={category}
                >
                  {category}
                </MenuItem>
              ))}
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
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
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
            onClick={() => onOpen()}
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
