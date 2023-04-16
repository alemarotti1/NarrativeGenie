import React, { useState } from "react";
import {
  Flex,
  Button,
  InputGroup,
  Input,
  InputRightElement,
  Spacer,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Divider,
} from "@chakra-ui/react";
import { HiOutlineSearch } from "react-icons/hi";
import { BsFilter } from "react-icons/bs";

interface ComponentHandlerProps {
  current: any;
  onEdit: (state: any) => void;
  searchString: (data: string) => void;
  classification: (data: string) => void;
}

const WorldHeader: React.FC<ComponentHandlerProps> = ({
  current,
  onEdit,
  searchString,
  classification,
}) => {
  const [tab, setTab] = React.useState("Des");
  const options = ["Nome", "Mais novo", "Mais antigo", "Última atualização"];
  const [option, setOption] = useState("Nome");

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

  const handleSearch = (e: any) => {
    const value = e.target.value;
    searchString(value);
  };

  return (
    <Flex
      px="4"
      py="1"
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
        size="sm"
        fontWeight="normal"
        onClick={onChangeTabDescricao}
        _hover={{ bg: "rgba(255,255,255, 0.3)" }}
        borderRadius="3xl"
        bg={tab == "Des" ? "rgba(255,255,255, 0.3)" : "none"}
      >
        Descrição
      </Button>
      <Button
        size="sm"
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
        size="sm"
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
        size="sm"
        color="white"
        bg={tab == "objects" ? "rgba(255,255,255, 0.3)" : "none"}
        fontWeight="normal"
        onClick={onChangeTabObjetos}
        _hover={{ bg: "rgba(255,255,255, 0.3)" }}
        borderRadius="3xl"
      >
        Objetos
      </Button>

      {tab == "Des" ? (
        <></>
      ) : (
        <>
          <Spacer />
          <Flex
            w="fit-content"
            alignSelf={"flex-end"}
            borderRadius="3xl"
            justifyContent="flex-end"
          >
            <InputGroup
              bg="gray.200"
              border="1px solid black"
              color="black"
              w="50%"
              ml="2"
              borderRadius="3xl"
              my="auto"
            >
              <Input
                size="sm"
                placeholder="Pesquisar..."
                h="25px"
                borderRadius="3xl"
                onChange={handleSearch}
              />
              <InputRightElement>
                <HiOutlineSearch
                  size="20px"
                  style={{ marginTop: "-15px", color: "gray" }}
                />
              </InputRightElement>
            </InputGroup>
            <Menu>
              <MenuButton
                as={Button}
                size="sm"
                ml="2"
                pr="7"
                bg="none"
                color="white"
                _hover={{ bg: "#4e4a44" }}
                _active={{ bg: "#4e4a44" }}
                borderRadius="3xl"
                fontWeight={"regular"}
                leftIcon={<BsFilter />}
              >
                {`Ordenar por: ${option}`}
              </MenuButton>
              <MenuList>
                {options.map((op) => (
                  <MenuItem
                    bg={option == op ? "gray.200" : "none"}
                    _hover={{ bg: "gray.200" }}
                    onClick={() => {
                      setOption(op);
                      classification(op);
                    }}
                  >
                    {op}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default WorldHeader;
