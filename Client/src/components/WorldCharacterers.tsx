import React from "react";
import {
  Button,
  Flex,
  Heading,
  Input,
  Image,
  InputGroup,
  InputRightElement,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { HiOutlineSearch, HiOutlineFilter } from "react-icons/hi";
import { BsFilter } from "react-icons/bs";

const WorldsCharacterers: React.FC = () => {
  return (
    <Flex direction={"column"} mb="40px">

      <Grid
        mt="10"
        mx="10"
        bg="rgba(0,0,0,0.6)"
        border="none"
        borderRadius="3xl"
        p="5"
        gridGap={3}
        templateAreas={`
                  "nav main"
                  "nav footer"`}
        gridTemplateRows={"1fr 40px"}
        gridTemplateColumns={"200px 1fr"}
        h="250px"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem p="0" area={"nav"}>
          <Image
            w="full"
            h="full"
            margin="auto"
            objectFit="cover"
            borderRadius='full'
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Caffe Latte"
          />
        </GridItem>
        <GridItem pl="2" area={"main"} overflow="hidden">
          <Heading color="white" size="md">
            Noldorin Glynkas
          </Heading>
          <Text
            py="1"
            color="white"
            maxH="200px"
            style={{
              display: "-webkit-box",
              maxWidth: "full",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: "5",
              WebkitBoxOrient: "vertical",
            }}
          >
            História: Na terra de Aranthia, vivia um guerreiro chamado Noldorin Glynkas. Ele era conhecido em todo o país por sua coragem, força e determinação inabalável.
            Noldorin Glynkas vivia em um mundo onde a magia fluía livremente, e as criaturas selvagens eram tão perigosas quanto bonitas.Um dia, Noldorin Glynkas conheceu
            uma bruxa chamada Chasianna Darkweaver. Ela era uma mulher bonita, com longos cabelos negros e penetrantes olhos verdes. Noldorin ficou imediatamente fascinado
            por ela e logo eles se apaixonaram.Chasianna era uma bruxa poderosa, temida e respeitada por todos que a conheciam. Ela tinha a habilidade de controlar os elementos,
            e seus feitiços eram conhecidos por estarem entre os mais poderosos de toda Aranthia. Noldorin e Chasianna se casaram em uma grande cerimônia, cercados por seus amigos
            e entes queridos. O casamento foi uma ocasião alegre, com música, dança e festa que duraram dias.
          </Text>
        </GridItem>
        <GridItem
          area={"footer"}
          p="0"
          display="flex"
          justifyContent="flex-end"
        >
          <Button
            variant="solid"
            bg="#3C6C66"
            marginRight="5"
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
        </GridItem>
      </Grid>

      <Grid
        mt="10"
        mx="10"
        bg="rgba(0,0,0,0.6)"
        border="none"
        borderRadius="3xl"
        p="5"
        gridGap={3}
        templateAreas={`
                  "nav main"
                  "nav footer"`}
        gridTemplateRows={"1fr 40px"}
        gridTemplateColumns={"200px 1fr"}
        h="250px"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem p="0" area={"nav"}>
          <Image
            w="full"
            h="full"
            margin="auto"
            objectFit="cover"
            borderRadius="full"
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Caffe Latte"
          />
        </GridItem>
        <GridItem pl="2" area={"main"} overflow="hidden">
          <Heading color="white" size="md">
            Chasianna Darkweaver 
          </Heading>
          <Text
            py="1"
            color="white"
            maxH="200px"
            style={{
              display: "-webkit-box",
              maxWidth: "full",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: "5",
              WebkitBoxOrient: "vertical",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          </Text>
        </GridItem>
        <GridItem
          area={"footer"}
          p="0"
          display="flex"
          justifyContent="flex-end"
        >
          <Button
            variant="solid"
            bg="#3C6C66"
            marginRight="5"
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
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default WorldsCharacterers;
