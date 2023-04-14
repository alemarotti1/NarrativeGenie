import React from "react";
import { Flex, Button } from "@chakra-ui/react";

interface ComponentHandlerProps {
  current: any;
  onEdit: (state: any) => void;
}

const WorldHeader: React.FC<ComponentHandlerProps> = ({ current, onEdit }) => {
  const [tab, setTab] = React.useState("Des");

  const onChangeTabDescricao = () => {
    console.log("teste", tab);
    setTab("Des");
    onEdit("Des");
  };

  const onChangeTabPersonagem = () => {
    console.log("teste", tab);
    setTab("character");
    onEdit("character");
  };

  const onChangeTabLugares = () => {
    console.log("teste", tab);
    setTab("place");
    onEdit("place");
  };

  const onChangeTabObjetos = () => {
    console.log("teste", tab);
    setTab("object");
    onEdit("object");
  };

  return (
    <Flex
      px="4"
      py="3"
      bg="rgba(0,0,0,0.5)"
      align="center"
      mx="20"
      mt="-6"
      mb="6"
      h="50px"
      style={{
        borderRadius: "30px",
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.8)",
      }}
    >
      <Button
        color="white"
        fontWeight="normal"
        onClick={onChangeTabDescricao}
        _hover={{ bg: "rgba(255,255,255, 0.3)" }}
        h="40px"
        borderRadius="3xl"
        bg={tab == "Des" ? "rgba(255,255,255, 0.3)" : "none"}
      >
        Descrição
      </Button>
      <Button
        color="white"
        fontWeight="normal"
        onClick={onChangeTabPersonagem}
        _hover={{ bg: "rgba(255,255,255, 0.3)" }}
        h="40px"
        borderRadius="3xl"
        bg={tab == "character" ? "rgba(255,255,255, 0.3)" : "none"}
      >
        Personagens
      </Button>

      <Button
        color="white"
        bg={tab == "place" ? "rgba(255,255,255, 0.3)" : "none"}
        fontWeight="normal"
        onClick={onChangeTabLugares}
        _hover={{ bg: "rgba(255,255,255, 0.3)" }}
        h="40px"
        borderRadius="3xl"
      >
        Lugares
      </Button>

      <Button
        color="white"
        bg={tab == "object" ? "rgba(255,255,255, 0.3)" : "none"}
        fontWeight="normal"
        onClick={onChangeTabObjetos}
        _hover={{ bg: "rgba(255,255,255, 0.3)" }}
        h="40px"
        borderRadius="3xl"
      >
        Objetos
      </Button>
    </Flex>
  );
};

export default WorldHeader;
