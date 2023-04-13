import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Heading,
  Image,
  GridItem,
  Grid,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { HiPencilAlt } from "react-icons/hi";
import { useParams } from 'react-router-dom';

import api from "../config/api";
import environment from "../config/environment";

type WorldParams = {
  id_historia: string;
  nome: string;
  descricao: string;
  path_img_capa: string;
  email_escritor: string;
};

const DescriptionCard: React.FC = () => {
  const { id } = useParams();
  const [world, setWorld] = useState<WorldParams | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/historia/${id}`).then((res) => {
      setWorld(res.data.story);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Flex
        direction={"column"}
        h="100vh"
        w="full"
        align="center"
      >
        <Grid
          mx="10"
          h="fit-content"
          bg="rgba(255,255,255,0.3)"
          border="none"
          borderRadius="3xl"
          columnGap={3}
          p="5"
          px="10"
          pb="10"
          templateAreas={`
                  "main main"
                  "nav footer"`}
          gridTemplateRows={"40px  1fr"}
          gridTemplateColumns={"1fr 3fr"}
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
            >
              <HiPencilAlt style={{ marginRight: "5px" }} />
              Editar
            </Button>
          </GridItem>

          {loading ? (
            <Flex w="full" alignSelf="center" py="10">
              <Spinner color="white" size="lg" />
            </Flex>
          ) : (
            <>
              <GridItem area={"nav"} alignSelf="auto">
                <Image
                  w="full"
                  maxW="400px"
                  h="250px"
                  maxH="400px"
                  alignSelf="auto"
                  objectFit="cover"
                  borderRadius="2xl"
                  src={environment.API_URL + world?.path_img_capa}
                  alt="Imagem do mundo"
                />
              </GridItem>
              <GridItem
                pl="2"
                w="full"
                //maxW="220px"
                h="250px"
                //maxH="400px"
                area={"footer"}
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
              >
                <Text py="1" color="white" fontWeight="normal">
                  {world?.descricao}
                </Text>
              </GridItem>
            </>
          )}
        </Grid>
      </Flex>
    </>
  );
};

export default DescriptionCard;
