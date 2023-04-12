import React from "react";
import {
  Button,
  Flex,
  Heading,
  Input,
  Image,
  InputGroup,
  InputRightElement,
  Card,
  Stack,
  CardBody,
  Text,
  CardFooter,
} from "@chakra-ui/react";
import { HiOutlineSearch, HiOutlineFilter } from "react-icons/hi";
import { BsFilter } from "react-icons/bs";

const Worlds: React.FC = () => {
  return (
    <Flex direction={"column"} mb="40px">
      <Flex
        w="fit-content"
        alignSelf={"flex-end"}
        px="6"
        py="1"
        borderRadius="3xl"
        mx="10"
        mt="-6"
        bg="rgba(0,0,0,0.4)"
        justifyContent="flex-end"
      >
        <InputGroup
          bg="gray.200"
          border="1px solid black"
          color="black"
          h="25px"
          w="50%"
          ml="2"
          borderRadius="3xl"
          my="auto"
        >
          <Input placeholder="Pesquisar..." h="25px" borderRadius="3xl"></Input>
          <InputRightElement>
            <HiOutlineSearch
              size="20px"
              style={{ marginTop: "-15px", color: "gray" }}
            />
          </InputRightElement>
        </InputGroup>

        <Button
          ml="2"
          bg="none"
          color="white"
          _hover={{ bg: "#4e4a44" }}
          _active={{ bg: "#4e4a44" }}
          borderRadius="3xl"
          fontWeight={"regular"}
        >
          <BsFilter style={{ marginRight: "5px" }} />
          Classificar
        </Button>

        <Button
          ml="2"
          bg="none"
          color="white"
          _hover={{ bg: "#4e4a44" }}
          _active={{ bg: "#4e4a44" }}
          borderRadius="3xl"
          fontWeight={"regular"}
        >
          <HiOutlineFilter style={{ marginRight: "5px" }} />
          Filtrar
        </Button>
      </Flex>

      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        mt="10"
        mx="10"
        bg="rgba(0,0,0,0.6)"
        border="none"
        borderRadius="3xl"
        p="5"
        minH="250px"
      >
        <Image
          objectFit="cover"
          borderRadius="2xl"
          w="200px"
          h="200px"
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="Caffe Latte"
        />

        <Stack>
          <CardBody px="4" py="0">
            <Heading color="white" size="md">
              Witunkles, The Spirit Vales
            </Heading>

            <Text py="1" color="white" overflow="hidden">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum...
            </Text>
          </CardBody>

          <CardFooter justifyContent="flex-end">
            <Button
              variant="solid"
              bg="#3C6C66"
              textColor="white"
              fontWeight="regular"
              borderRadius="3xl"
            >
              Ver mais
            </Button>
            <Button
              variant="solid"
              bg="red.700"
              textColor="white"
              fontWeight="regular"
              borderRadius="3xl"
            >
              Deletar
            </Button>
          </CardFooter>
        </Stack>
      </Card>

      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        mt="10"
        mx="10"
        bg="rgba(0,0,0,0.6)"
        border="none"
        borderRadius="3xl"
        p="5"
        minH="250px"
      >
        <Image
          objectFit="cover"
          borderRadius="2xl"
          w="200px"
          h="200px"
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="Caffe Latte"
        />

        <Stack>
          <CardBody px="4" py="0">
            <Heading color="white" size="md">
              Witunkles, The Spirit Vales
            </Heading>

            <Text py="1" color="white" overflow="hidden">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum...
            </Text>
          </CardBody>

          <CardFooter justifyContent="flex-end">
            <Button
              variant="solid"
              bg="#3C6C66"
              textColor="white"
              fontWeight="regular"
              borderRadius="3xl"
            >
              Ver mais
            </Button>
            <Button
              variant="solid"
              bg="red.700"
              textColor="white"
              fontWeight="regular"
              borderRadius="3xl"
            >
              Deletar
            </Button>
          </CardFooter>
        </Stack>
      </Card>

      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        mt="10"
        mx="10"
        bg="rgba(0,0,0,0.6)"
        border="none"
        borderRadius="3xl"
        p="5"
        minH="250px"
      >
        <Image
          objectFit="cover"
          borderRadius="2xl"
          w="200px"
          h="200px"
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="Caffe Latte"
        />

        <Stack>
          <CardBody px="4" py="0">
            <Heading color="white" size="md">
              Witunkles, The Spirit Vales
            </Heading>

            <Text py="1" color="white" overflow="hidden">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum...
            </Text>
          </CardBody>

          <CardFooter justifyContent="flex-end">
            <Button
              variant="solid"
              bg="#3C6C66"
              textColor="white"
              fontWeight="regular"
              borderRadius="3xl"
            >
              Ver mais
            </Button>
            <Button
              variant="solid"
              bg="red.700"
              textColor="white"
              fontWeight="regular"
              borderRadius="3xl"
            >
              Deletar
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </Flex>
  );
};

export default Worlds;
