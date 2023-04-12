import React from "react";
import {
  Button,
  Flex,
  Heading,
  Image,
  GridItem,
  Grid,
  Text,
} from "@chakra-ui/react";
import { HiPencilAlt } from "react-icons/hi";

const DescriptionCard: React.FC = () => {
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

          <GridItem area={"nav"} alignSelf="auto">
            <Image
              w="full"
              maxW="400px"
              h="250px"
              maxH="400px"
              alignSelf="auto"
              objectFit="cover"
              borderRadius="2xl"
              src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
              alt="Caffe Latte"
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
              Witunkles é um mundo mágico cheio de maravilhas incríveis e
              criaturas encantadas. É um lugar onde a magia é tecida no próprio
              tecido da existência e onde as leis da física às vezes são
              distorcidas ou quebradas por poderosos feitiços e
              encantamentos.As paisagens de Witunkles são diversas e de tirar o
              fôlego, variando de montanhas cobertas de neve a florestas
              exuberantes e praias ensolaradas. Essas paisagens costumam ser
              habitadas por criaturas mágicas como dragões, unicórnios,
              centauros e animais falantes.Em Witunkles, a magia é respeitada e
              temida, pois pode ser usada para o bem ou para o mal. Existem
              escolas de magia onde jovens feiticeiros e magos podem aprender a
              controlar seus poderes, e também existem bruxos das trevas que
              procuram usar sua magia para propósitos egoístas ou destrutivos.O
              povo de Witunkles é um grupo diverso, com muitas culturas e
              costumes diferentes. Eles estão unidos, no entanto, por seu amor
              compartilhado pela magia e sua reverência pelo mundo natural.
              Witunkles é um mundo mágico cheio de maravilhas incríveis e
              criaturas encantadas. É um lugar onde a magia é tecida no próprio
              tecido da existência e onde as leis da física às vezes são
              distorcidas ou quebradas por poderosos feitiços e
              encantamentos.As paisagens de Witunkles são diversas e de tirar o
              fôlego, variando de montanhas cobertas de neve a florestas
              exuberantes e praias ensolaradas. Essas paisagens costumam ser
              habitadas por criaturas mágicas como dragões, unicórnios,
              centauros e animais falantes.Em Witunkles, a magia é respeitada e
              temida, pois pode ser usada para o bem ou para o mal. Existem
              escolas de magia onde jovens feiticeiros e magos podem aprender a
              controlar seus poderes, e também existem bruxos das trevas que
              procuram usar sua magia para propósitos egoístas ou destrutivos.O
              povo de Witunkles é um grupo diverso, com muitas culturas e
              costumes diferentes. Eles estão unidos, no entanto, por seu amor
              compartilhado pela magia e sua reverência pelo mundo natural.
            </Text>
          </GridItem>
        </Grid>
      </Flex>
    </>
  );
};

export default DescriptionCard;
