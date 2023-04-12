import React from "react";
import { Flex, Button } from "@chakra-ui/react";

interface ComponentHandlerProps {
  current: any;
  onEdit: (state: any) => void;
}

const WorldHeader: React.FC<ComponentHandlerProps> = ({ current, onEdit }) => {
  const [tab, setTab] = React.useState("");

  const onChangeTabDescricao = () => {
    setTab("Des");
    onEdit(tab);
  };

  const onChangeTabPersonagem = () => {
    setTab("Per");
    onEdit(tab);
  };

  const onChangeTabLugares = () => {
    setTab("Lug");
    onEdit(tab);
  };

  const onChangeTabObjetos = () => {
    setTab("Obj");
    onEdit(tab);
  };

  return (
    <Flex
      px="4"
      py="3"
      bg="rgba(0,0,0,0.7)"
      align="center"
      mx="10"
      my="10"
      style={{
        borderRadius: "30px",
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.7)",
      }}
    >
      <Button
        color="white"
        fontSize="2xl"
        fontFamily={"Fondamento"}
        fontWeight="regular"
        onClick={onChangeTabDescricao}
      >
        Descrição
      </Button>

      <Button
        color="white"
        fontSize="2xl"
        fontFamily={"Fondamento"}
        fontWeight="regular"
        onClick={onChangeTabPersonagem}
      >
        Personagem
      </Button>

      <Button
        color="white"
        fontSize="2xl"
        fontFamily={"Fondamento"}
        fontWeight="regular"
        onClick={onChangeTabLugares}
      >
        Lugares
      </Button>

      <Button
        color="white"
        fontSize="2xl"
        fontFamily={"Fondamento"}
        fontWeight="regular"
        onClick={onChangeTabObjetos}
      >
        Lugares
      </Button>
    </Flex>
  );
};

export default WorldHeader;
