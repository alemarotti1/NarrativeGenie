import React, { useState } from "react";
import {
  Button,
  Flex,
  Image,
  GridItem,
  Grid,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { HiPencilAlt } from "react-icons/hi";

const DescriptionCard: React.FC = () => {
  const [disabled, setDisabled] = useState(true);
  const text =
    "Witunkles é um mundo mágico cheio de maravilhas incríveis e criaturas encantadas. É um lugar onde a magia é tecida no próprio tecido da existência e onde as leis da física às vezes são distorcidas ou quebradas por poderosos feitiços e encantamentos.As paisagens de Witunkles são diversas e de tirar o fôlego, variando de montanhas cobertas de neve a florestas exuberantes e praias ensolaradas. Essas paisagens costumam ser habitadas por criaturas mágicas como dragões, unicórnios, centauros e animais falantes.Em Witunkles, a magia é respeitada e temida, pois pode ser usada para o bem ou para o mal. Existem escolas de magia onde jovens feiticeiros e magos podem aprender a controlar seus poderes, e também existem bruxos das trevas que procuram usar sua magia para propósitos egoístas ou destrutivos.O povo de Witunkles é um grupo diverso, com muitas culturas e costumes diferentes. Eles estão unidos, no entanto, por seu amor compartilhado pela magia e sua reverência pelo mundo natural. Witunkles é um mundo mágico cheio de maravilhas incríveis e criaturas encantadas. É um lugar onde a magia é tecida no próprio tecido da existência e onde as leis da física às vezes são distorcidas ou quebradas por poderosos feitiços e encantamentos.As paisagens de Witunkles são diversas e de tirar o fôlego, variando de montanhas cobertas de neve a florestas exuberantes e praias ensolaradas. Essas paisagens costumam ser habitadas por criaturas mágicas como dragões, unicórnios, centauros e animais falantes.Em Witunkles, a magia é respeitada e temida, pois pode ser usada para o bem ou para o mal. Existem escolas de magia onde jovens feiticeiros e magos podem aprender a controlar seus poderes, e também existem bruxos das trevas que procuram usar sua magia para propósitos egoístas ou destrutivos.O povo de Witunkles é um grupo diverso, com muitas culturas e costumes diferentes. Eles estão unidos, no entanto, por seu amor compartilhado pela magia e sua reverência pelo mundo natural.";
  const [value, setValue] = useState(text);
  const [backup, setBackup] = useState("");

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
      <Flex
        direction={"column"}
        h="fit-content"
        align="center"
        overflow="hidden"
        m="10"
        mr="5"
      >
        <Grid
          //mx="10"
          h="full"
          bg="rgba(255,255,255,0.3)"
          border="none"
          borderRadius="3xl"
          gridGap={3}
          p="7"
          pt="5"
          pb="10"
          templateAreas={`
                  "main main"
                  "nav footer"`}
          gridTemplateRows={"1fr  8fr"}
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

          <GridItem area={"nav"} alignSelf="auto">
            <Image
              alignSelf="auto"
              objectFit="cover"
              borderRadius="2xl"
              src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
              alt="Caffe Latte"
            />
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
        </Grid>
      </Flex>
    </>
  );
};

export default DescriptionCard;
