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
    setTab("characters");
    onEdit("characters");
  };

  const onChangeTabLugares = () => {
    setTab("places");
    onEdit("places");
  };

  const onChangeTabObjetos = () => {
    setTab("objects");
    onEdit("objects");
  };

  return (
    <Flex
      px="4"
      py="2"
      bg="rgba(0,0,0,0.5)"
      align="center"
      mx="20"
      style={{
        borderRadius: "30px",
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.8)",
      }}
      gap="2"
    >
      <Button
        color="white"
        fontWeight="normal"
        onClick={onChangeTabDescricao}
        _hover={{ bg: "rgba(255,255,255, 0.3)" }}
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
        borderRadius="3xl"
        bg={tab == "characters" ? "rgba(255,255,255, 0.3)" : "none"}
      >
        Personagens
      </Button>

      <Button
        color="white"
        bg={tab == "places" ? "rgba(255,255,255, 0.3)" : "none"}
        fontWeight="normal"
        onClick={onChangeTabLugares}
        _hover={{ bg: "rgba(255,255,255, 0.3)" }}
        borderRadius="3xl"
      >
        Lugares
      </Button>

      <Button
        color="white"
        bg={tab == "objects" ? "rgba(255,255,255, 0.3)" : "none"}
        fontWeight="normal"
        onClick={onChangeTabObjetos}
        _hover={{ bg: "rgba(255,255,255, 0.3)" }}
        borderRadius="3xl"
      >
        Objetos
      </Button>
    </Flex>
  );
};

export default WorldHeader;
