import React, { useState } from "react";
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
  Grid,
  GridItem,
  Text,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import {
  HiOutlineChevronDown,
  HiOutlinePlusCircle,
  HiPencilAlt,
} from "react-icons/hi";

import avatar from "../assets/avatar.png";

import Header from "../layout/Header";

const Profile: React.FC = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [disabled, setDisabled] = useState(true);

  return (
    <>
      <Header text="Perfil" href="/profile" />
      <Grid
        mx="10"
        h="fit-content"
        bg="rgba(255,255,255,0.2)"
        border="none"
        borderRadius="3xl"
        columnGap={6}
        p="5"
        px="10"
        pb="10"
        templateAreas={`
                  "main main"
                  "nav footer"`}
        gridTemplateRows={"40px  1fr"}
        gridTemplateColumns={"200px 1fr"}
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem area="main" display="flex" justifyContent="flex-end">
          <Button
            variant="solid"
            bg="none"
            textColor="white"
            fontWeight="regular"
            borderRadius="3xl"
            onClick={() => (disabled ? setDisabled(false) : setDisabled(true))}
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
              onClick={() => setDisabled(true)}
            >
              Cancelar
            </Button>
          )}
        </GridItem>

        <GridItem area={"nav"} alignSelf="auto">
          <Image
            w="full"
            alignSelf="auto"
            objectFit="cover"
            borderRadius="2xl"
            src={avatar}
            alt="Caffe Latte"
          />
        </GridItem>
        <GridItem pl="2" w="full" area={"footer"} margin="auto">
          <Flex align="center">
            <Text p="3" color="white" fontSize="xl">
              Nome:
            </Text>
            <Input
              placeholder="Username"
              bg="white"
              maxW="xl"
              disabled={disabled}
            />
          </Flex>
          <Flex align="center">
            <Text p="3" color="white" fontSize="xl">
              Email:
            </Text>
            <Input
              placeholder="User@email.com"
              bg="white"
              maxW="xl"
              disabled={disabled}
            />
          </Flex>
          <Flex align="center">
            <Text p="3" color="white" fontSize="xl">
              Senha:
            </Text>
            <InputGroup maxW="xl" borderRadius="xl">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="******"
                disabled={disabled}
                bg="white"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
};

export default Profile;
