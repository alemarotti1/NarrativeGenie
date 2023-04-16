import React, { useState } from "react";
import {
  Button,
  Flex,
  Input,
  Image,
  Grid,
  GridItem,
  Text,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { HiPencilAlt } from "react-icons/hi";

import avatar from "../assets/avatar.png";

import Header from "../layout/Header";

const Profile: React.FC = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [disabled, setDisabled] = useState(true);
  const [username, setUsername] = useState("Username");
  const [email, setEmail] = useState("user@email.com");
  const [password, setPassword] = useState("lalala");

  const handleNameChange = (e: any) => {
    const inputValue = e.target.value;
    setUsername(inputValue);
  };

  const handleEmailChange = (e: any) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
  };

  const handlePasswordChange = (e: any) => {
    const inputValue = e.target.value;
    setPassword(inputValue);
  };
  return (
    <>
      <Header text="Perfil" href="/profile" />
      <Grid
        mx="10"
        my="7"
        h="fit-content"
        bg="rgba(255,255,255,0.3)"
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
              value={username}
              maxW="xl"
              onChange={handleNameChange}
              bg="white"
              disabled={disabled}
              _disabled={{
                bg: "none",
                border: "none",
                fontSize: "xl",
                color: "white",
              }}
            />
          </Flex>
          <Flex align="center">
            <Text p="3" color="white" fontSize="xl">
              Email:
            </Text>

            <Input
              value={email}
              bg="white"
              maxW="xl"
              onChange={handleEmailChange}
              disabled={disabled}
              _disabled={{
                bg: "none",
                border: "none",
                fontSize: "xl",
                color: "white",
              }}
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
                bg="white"
                value={password}
                disabled={disabled}
                onChange={handlePasswordChange}
                _disabled={{
                  bg: "none",
                  border: "none",
                  fontSize: "xl",
                  color: "white",
                }}
              />
              <InputRightElement width="4.5rem">
                <Button borderRadius="3xl" h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Esconder" : "Mostrar"}
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
