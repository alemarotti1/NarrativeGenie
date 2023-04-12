import React from "react";
import { Flex, Button } from "@chakra-ui/react";

interface ComponentHandlerProps {
  current: any;
  onEdit: (state: any) => void;
}

const WorldHeader: React.FC<ComponentHandlerProps> = ({ current, onEdit }) => {
  const [tab, setTab] = React.useState("");

  const onChangeTabDescricao = () => {
    console.log("teste", tab)
    setTab("Des");
    onEdit("Des");
  };

  const onChangeTabPersonagem = () => {
    console.log("teste", tab)
    setTab("Per");
    onEdit("Per");
  };

  const onChangeTabLugares = () => {
    console.log("teste", tab)
    setTab("Lug");
    onEdit("Lug");
  };

  const onChangeTabObjetos = () => {
    console.log("teste", tab)
    setTab("Obj");
    onEdit("Obj");
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
        bg="none"
        fontWeight="normal"
        onClick={onChangeTabDescricao}
        _hover={{ bg: "rgba(255,255,255, 0.3)" }}
        h="40px"
        borderRadius="3xl"
      >
        Descrição
      </Button>
      <Button
        color="white"
        bg="none"
        fontWeight="normal"
        onClick={onChangeTabPersonagem}
        _hover={{ bg: "rgba(255,255,255, 0.3)" }}
        h="40px"
        borderRadius="3xl"
      >
        Personagens
      </Button>

      <Button
        color="white"
        bg="none"
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
        bg="none"
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
