import React from "react";
import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import environment from "../config/environment";
import { CharacterParams, ObjectParams, PlaceParams } from "../pages/Description";

interface CategoriesListProps {
  items: CharacterParams[] | ObjectParams[] | PlaceParams[];
  category: string;
  onDelete: (id: number) => void;
}

const CategoriesList: React.FC<CategoriesListProps> = ({ items, category, onDelete }) => {
  const navigate = useNavigate();

  return (
    <Flex direction={"column"} mb="40px" h="full" >
      {items.map(item => (
        <Grid
          key={item.id_elem_narr}
          mx="10"
          my="7"
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
              src={environment.API_URL + item.imagem}
              alt="Imagem"
            />
          </GridItem>
          <GridItem pl="2" area={"main"} overflow="hidden">
            <Heading color="white" size="md" fontFamily="Fondamento">
              {item.nome}
            </Heading>
            <Text
              py="1"
              color="white"
              maxH="200px"
              fontWeight="normal"
              style={{
                display: "-webkit-box",
                maxWidth: "full",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitLineClamp: "5",
                WebkitBoxOrient: "vertical",
              }}
            >
              {category === "characters" ? (item as CharacterParams).backstory : item.descricao}
            </Text>
          </GridItem>
          <GridItem
            area={"footer"}
            p="0"
            display="flex"
            justifyContent="flex-end"
          >
            <Button
            size="sm"
              variant="solid"
              bg="#3C6C66"
              marginRight="5"
              textColor="white"
              fontWeight="regular"
              borderRadius="3xl"
              onClick={() => navigate(`/${category}/${item.id_elem_narr}`)}
              _hover={{ bg: "#36615C", color: "white" }}
              _active={{ bg: "#305651", color: "white" }}
            >
              Ver mais
            </Button>
            <Button
            size="sm"
              variant="solid"
              bg="red.700"
              textColor="white"
              fontWeight="regular"
              borderRadius="3xl"
              onClick={() => onDelete(item.id_elem_narr)}
              _hover={{ bg: "red.800", color: "white" }}
              _active={{ bg: "red.900", color: "white" }}
            >
              Deletar
            </Button>
          </GridItem>
        </Grid>
      ))}
    </Flex>
  );
};

export default CategoriesList;
