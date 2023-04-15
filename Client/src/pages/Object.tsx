import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { HiPencilAlt } from "react-icons/hi";
import Header from "../layout/Header";

const ObjectPage: React.FC = () => {
  const [disabled, setDisabled] = useState(true);
  const text =
    "Na terra de Aranthia, vivia um guerreiro chamado Noldorin Glynkas. Ele era conhecido em todo o país por sua coragem, força e determinação inabalável. Noldorin Glynkas vivia em um mundo onde a magia fluía livremente, e as criaturas selvagens eram tão perigosas quanto bonitas. Um dia, Noldorin Glynkas conheceu uma bruxa chamada Chasianna Darkweaver. Ela era uma mulher bonita, com longos cabelos negros e penetrantes olhos verdes. Noldorin ficou imediatamente fascinado por ela e logo eles se apaixonaram. Chasianna era uma bruxa poderosa, temida e respeitada por todos que a conheciam. Ela tinha a habilidade de controlar os elementos, e seus feitiços eram conhecidos por estarem entre os mais poderosos de toda Aranthia. Noldorin e Chasianna se casaram em uma grande cerimônia, cercados por seus amigos e entes queridos. O casamento foi uma ocasião alegre, com música, dança e festa que duraram dias.Na terra de Aranthia, vivia um guerreiro chamado Noldorin Glynkas. Ele era conhecido em todo o país por sua coragem, força e determinação inabalável. Noldorin Glynkas vivia em um mundo onde a magia fluía livremente, e as criaturas selvagens eram tão perigosas quanto bonitas. Um dia, Noldorin Glynkas conheceu uma bruxa chamada Chasianna Darkweaver. Ela era uma mulher bonita, com longos cabelos negros e penetrantes olhos verdes. Noldorin ficou imediatamente fascinado por ela e logo eles se apaixonaram. Chasianna era uma bruxa poderosa, temida e respeitada por todos que a conheciam. Ela tinha a habilidade de controlar os elementos, e seus feitiços eram conhecidos por estarem entre os mais poderosos de toda Aranthia. Noldorin e Chasianna se casaram em uma grande cerimônia, cercados por seus amigos e entes queridos. O casamento foi uma ocasião alegre, com música, dança e festa que duraram dias.";
  const [value, setValue] = useState(text);
  const [TitleValue, setTitleValue] = useState("Noldorin Glynkas");
  const [backup, setBackup] = useState("");

  const related = {
    personagens: ["Chasianna Darkweaver", "Thorfinn Glynkas"],
    lugares: ["Aranthia", "Celestyal City"],
    personalidade: ["temperamental", "corajoso", "determinado"],
    caracteristicas: ["alto", "forte", "olhos pretos"],
  };

  const handleInputChange = (e: any) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

  const handleTitleInputChange = (e: any) => {
    const inputValue = e.target.value;
    setTitleValue(inputValue);
  };
  const capitalize = (string: string) => {
    return <text>{string[0].toUpperCase() + string.substring(1)}</text>;
  };

  const handleEdit = () => {
    setBackup(text);
    setDisabled(false);
  };

  return (
    <>
      <Header text="Witunkles, The Spirit Vales" href="/world" />
      <Flex
        direction={"column"}
        h="fit-content"
        align="center"
        overflow="hidden"
        m="10"
        mr="5"
      >
        <Grid
          h="full"
          bg="rgba(0,0,0,0.4)"
          border="none"
          borderRadius="3xl"
          overflowY={"scroll"}
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
          gridGap={3}
          p="7"
          pt="5"
          pb="10"
          templateAreas={`
                  "main main"
                  "nav title"
                  "nav footer"
                  "tags tags"`}
          gridTemplateRows={"auto  0.5fr 4fr 2fr"}
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
              variant="solid"
              bg="none"
              textColor="white"
              fontWeight="regular"
              borderRadius="3xl"
              onClick={() => (disabled ? handleEdit() : setDisabled(true))}
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
                onClick={() => {
                  setDisabled(true);
                  setValue(backup);
                }}
              >
                Cancelar
              </Button>
            )}
          </GridItem>

          <GridItem area={"nav"} alignSelf="flex-end" alignItems={"flex-end"}>
            <Image
              alignSelf="auto"
              objectFit="cover"
              borderRadius="2xl"
              src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
              alt="Caffe Latte"
            />
          </GridItem>
          <GridItem area={"title"}>
          {disabled ? (
              <>
                <Text py="1" color="white" fontSize={"xl"}>
                  {TitleValue}
                </Text>
              </>
            ) : (
              <>
                <Input
                  value={TitleValue}
                  bg="white"
                  //w="full"
                  onChange={handleTitleInputChange}
                />
              </>
            )}
          </GridItem>
          <GridItem
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
              <>
                <Text py="1" color="white" fontWeight="normal">
                  {value}
                </Text>
              </>
            ) : (
              <>
                <Textarea
                  value={value}
                  bg="white"
                  w="full"
                  maxH="full"
                  h="full"
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
              </>
            )}
          </GridItem>
          <GridItem area={"tags"} alignSelf="flex-start" mt="2">
            {Object.entries(related).map(([key, value]) => (
              <Text color="white" fontSize="xl">
                {capitalize(key)}:{" "}
                {value.map((v) => (
                  <Tag
                    m="2px"
                    fontWeight="bold"
                    fontSize="md"
                    borderRadius="xl"
                    color="orange.600"
                  >
                    {v}
                  </Tag>
                ))}
              </Text>
            ))}
          </GridItem>
        </Grid>
      </Flex>
    </>
  );
};

export default ObjectPage;
