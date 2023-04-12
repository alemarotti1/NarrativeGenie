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
    <Flex direction={"column"} mb="40px" h="full" w="full">
      <Grid
        h="2xl"
        w="9xl"
        mt="10"
        mx="10"
        bg="rgba(0,0,0,0.6)"
        border="none"
        borderRadius="3xl"
        gridGap={3}
        p="5"
        templateAreas={`
                  "nav main"
                  "nav footer"`}
        gridTemplateRows={"96 96"}
        gridTemplateColumns={"1fr 3fr"}
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem area="main" display="flex" justifyContent="flex-end">
          <Button
            variant="solid"
            bg="#3C6C66"
            textColor="white"
            fontWeight="regular"
            borderRadius="3xl"
          >
            <HiPencilAlt style={{ marginRight: "5px" }} />
            Editar
          </Button>
        </GridItem>

        <GridItem area={"nav"} alignSelf="center">
          <Image
            minW="xl"
            h="96"
            margin="auto"
            objectFit="cover"
            borderRadius="2xl"
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Caffe Latte"
          />
        </GridItem>
        <GridItem
          pl="2"
          w="full"
          area={"footer"}
          overflowY="scroll"
          sx={{
            "&::-webkit-scrollbar": {
              width: "16px",
              borderRadius: "8px",
              backgroundColor: `rgba(255, 255, 255, 0.4)`,
            },
            "&::-webkit-scrollbar-thumb": {
              borderRadius: "8px",
              backgroundColor: `rgba(0, 0, 0, 0.8)`,
            },
          }}
        >
          <Heading color="white" size="md">
            Witunkles, The Spirit Vales
          </Heading>
          <Text py="1" color="white">
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
      </Grid>
    </Flex>
  );
};

export default DescriptionCard;
