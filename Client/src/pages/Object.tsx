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
} from "@chakra-ui/react";
import { HiPencilAlt } from "react-icons/hi";
import Header from "../layout/Header";

const ObjectPage: React.FC = () => {
  const [disabled, setDisabled] = useState(true);
  const text =
    "Na terra de Aranthia, vivia um guerreiro chamado Noldorin Glynkas. Ele era conhecido em todo o país por sua coragem, força e determinação inabalável. Noldorin Glynkas vivia em um mundo onde a magia fluía livremente, e as criaturas selvagens eram tão perigosas quanto bonitas. Um dia, Noldorin Glynkas conheceu uma bruxa chamada Chasianna Darkweaver. Ela era uma mulher bonita, com longos cabelos negros e penetrantes olhos verdes. Noldorin ficou imediatamente fascinado por ela e logo eles se apaixonaram. Chasianna era uma bruxa poderosa, temida e respeitada por todos que a conheciam. Ela tinha a habilidade de controlar os elementos, e seus feitiços eram conhecidos por estarem entre os mais poderosos de toda Aranthia. Noldorin e Chasianna se casaram em uma grande cerimônia, cercados por seus amigos e entes queridos. O casamento foi uma ocasião alegre, com música, dança e festa que duraram dias.Na terra de Aranthia, vivia um guerreiro chamado Noldorin Glynkas. Ele era conhecido em todo o país por sua coragem, força e determinação inabalável. Noldorin Glynkas vivia em um mundo onde a magia fluía livremente, e as criaturas selvagens eram tão perigosas quanto bonitas. Um dia, Noldorin Glynkas conheceu uma bruxa chamada Chasianna Darkweaver. Ela era uma mulher bonita, com longos cabelos negros e penetrantes olhos verdes. Noldorin ficou imediatamente fascinado por ela e logo eles se apaixonaram. Chasianna era uma bruxa poderosa, temida e respeitada por todos que a conheciam. Ela tinha a habilidade de controlar os elementos, e seus feitiços eram conhecidos por estarem entre os mais poderosos de toda Aranthia. Noldorin e Chasianna se casaram em uma grande cerimônia, cercados por seus amigos e entes queridos. O casamento foi uma ocasião alegre, com música, dança e festa que duraram dias.";
  const [value, setValue] = useState(text);
  const [backup, setBackup] = useState("");

  const related = {
    personagens: ["Chasianna Darkweaver", "Thorfinn Glynkas"],
    lugares: ["Aranthia", "Celestyal City"],
    personalidade: ["temperamental", "corajoso", "determinado"],
  };

  const handleInputChange = (e: any) => {
    const inputValue = e.target.value;
    setValue(inputValue);
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
        bg="rgba(0,0,0,0.3)"
        border="none"
        borderRadius="3xl"
        mx="10"
      >
        <Grid
          columnGap={1}
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

          <GridItem area={"nav"} alignSelf="auto">
            <Image
              maxW="400px"
              w="250px"
              h="250px"
              maxH="400px"
              alignSelf="auto"
              mx="auto"
              objectFit="cover"
              borderRadius="200px"
              src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
              alt="Caffe Latte"
            />
          </GridItem>
          <GridItem
            w="full"
            h="250px"
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
            {disabled ? (
              <>
                <Text color="white" fontSize="xl">
                  Noldorin Glynkas
                </Text>
                <Text py="1" color="white" fontWeight="normal">
                  {value}
                </Text>
              </>
            ) : (
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
            )}
          </GridItem>
        </Grid>
        <Flex alignSelf="flex-start" px="40px" direction="column" mb="20px">
          {Object.entries(related).map(([key, value]) => (
            <Text color="white" fontSize="xl">
              {key}: {value.map((v) => <Tag m="1px" borderRadius="xl" color="orange.500">{v}</Tag>)}
            </Text>
          ))}
        </Flex>
      </Flex>
    </>
  );
};

export default ObjectPage;
