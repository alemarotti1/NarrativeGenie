import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Image,
  GridItem,
  Grid,
  Text,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import { HiPencilAlt } from "react-icons/hi";
import { useParams } from 'react-router-dom';

import api from "../config/api";
import environment from "../config/environment";
import { WorldParams } from "../pages/Description";

interface DescriptionCardProps {
  world: WorldParams;
};

const DescriptionCard: React.FC<DescriptionCardProps> = ({ world }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState(world?.descricao || "");
  const [backup, setBackup] = useState("");

  const handleInputChange = (e: any) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

  const handleEdit = () => {
    setBackup(value);
    setDisabled(false);
  };

  return (
    <>
      <Flex
        direction={"column"}
        h="fit-content"
        overflow="hidden"
        mx="10"
        my="7"
        mr="9"
      >
        <Grid
          h="full"
          bg="rgba(255,255,255,0.2)"
          border="none"
          borderRadius="3xl"
          gridGap={3}
          p="7"
          pt="4"
          templateAreas={`
                  "main main"
                  "nav footer"`}
          gridTemplateRows={"1fr  auto"}
          gridTemplateColumns={"1fr 3fr"}
          color="blackAlpha.700"
          fontWeight="bold"
        >
          <GridItem
            area="main"
            display="flex"
            alignItems="flex-end"
            justifyContent="flex-end"
          >
            <Button
              size="sm"
              variant="solid"
              bg="none"
              textColor="white"
              fontWeight="regular"
              borderRadius="3xl"
              onClick={() => (disabled ? handleEdit() : setDisabled(true))}
              _hover={{ bg: "blackAlpha.200" }}
              _active={{ bg: "blackAlpha.300" }}
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
                }}
              >
                Cancelar
              </Button>
            )}
          </GridItem>

          {loading ? (
            <Flex w="full" justify="center" py="10">
              <Spinner color="white" size="lg" />
            </Flex>
          ) : (
            <>
              <GridItem area={"nav"} alignSelf="auto">
                <Image
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
                <Text py="1" color="white" fontWeight="normal">
                  {value}
                </Text>
              ) : (
                <Textarea
                  value={value}
                  bg="white"
                  maxH="full"
                  h="full"
                  w="full"
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
              )}
              </GridItem>
            </>
          )}
        </Grid>
      </Flex>
    </>
  );
};

export default DescriptionCard;
