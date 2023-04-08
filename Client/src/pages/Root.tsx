import React from "react";
import { Button, Flex, Heading, Input, Select } from "@chakra-ui/react";

const Root: React.FC = () => {
  return (
    <Flex flex="1" w="full" direction="column" align="center" justify="center">
      <Heading as="h1" color="#665d4e">
        O que vamos criar hoje?
      </Heading>
      <Flex mt="4" mx="4" w="container.md" maxW="full">
        <Select
          bg="#d9d9d9"
          borderColor="#d9d9d9"
          color="black"
          defaultValue="character"
          w="auto"
          borderRadius="xl"
        >
          <option value="character">Personagem</option>
          <option value="place">Lugar</option>
          <option value="object">Objeto</option>
        </Select>
        <Input
          bg="#d9d9d9"
          borderColor="#d9d9d9"
          color="black"
          placeholder="Digite o que você deseja que seja criado..."
          ml="2"
          w="full"
          borderRadius="xl"
        />
        <Button
          ml="2"
          bg="#665d4e"
          color="white"
          _hover={{ bg: "#4e4a44" }}
          _active={{ bg: "#4e4a44" }}
          borderRadius="xl"
        >
          Criar
        </Button>
      </Flex>
    </Flex>
  );
};

export default Root;
