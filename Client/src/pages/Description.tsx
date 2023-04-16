import React, { useState, useEffect } from "react";
import { Flex, Spinner, useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import api from "../config/api";
import DescriptionCard from "../components/DescriptionCard";
import WorldHeader from "../components/WorldHeader";
import CategoriesList from "../components/CategoriesList";
import Header from "../layout/Header";

export type CharacterParams = {
  id_elem_narr: number;
  nome: string;
  descricao: string;
  backstory: string;
  personalidade: string;
  especie: string;
  imagem: string;
};

export type ObjectParams = {
  id_elem_narr: number;
  nome: string;
  descricao: string;
  imagem: string;
};

export type PlaceParams = {
  id_elem_narr: number;
  nome: string;
  descricao: string;
  riqueza: number;
  saude: number;
  seguranca: number;
  agua: number;
  imagem: string;
};

export type NarrativeElementParams = {
  id_elem_narr: number;
  Historia_id_historia: number;
  tipo: "personagem" | "lugar" | "outro";
  personagem: CharacterParams | null;
  lugar: PlaceParams | null;
  outro: ObjectParams | null;
};

export type WorldParams = {
  id_historia: number;
  nome: string;
  descricao: string;
  path_img_capa: string;
  email_escritor: string;
  elemento_narrativo: NarrativeElementParams[];
};

const Description: React.FC = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [world, setWorld] = useState<WorldParams | null>(null);
  const [current, setCurrent] = useState("Des");
  const toast = useToast();
  const [searchValue, setSearchValue] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetchWorld();
  }, []);

  const fetchWorld = () => {
    setLoading(true);
    api
      .get(`/historia/${id}`)
      .then((res) => {
        setWorld(res.data.story);
        setLoading(false);
      })
      .catch((err) => {
        toast({
          title: "Erro no carregamento",
          description: "Tente novamente mais tarde",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const onEdit = (newCurrent: any) => {
    setCurrent(newCurrent);
  };

  const onDelete = (id: number) => {
    api
      .delete(`/elemento-narrativo/${id}`)
      .then((res) => {
        fetchWorld();
      })
      .catch((err) => {
        toast({
          title: "Erro ao apagar",
          description: "Tente novamente mais tarde",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const chooseTab = () => {
    if (loading) {
      return (
        <Flex w="full" justify="center" py="10">
          <Spinner color="white" size="lg" />
        </Flex>
      );
    } else if (current === "Des") {
      return <DescriptionCard world={world as WorldParams} />;
    } else {
      let items: CharacterParams[] | PlaceParams[] | ObjectParams[] = [];

      if (current === "characters") {
        items = (world?.elemento_narrativo
          .filter((elem) => elem.tipo === "personagem")
          .map((elem) => elem.personagem) || []) as CharacterParams[];
      } else if (current === "places") {
        items = (world?.elemento_narrativo
          .filter((elem) => elem.tipo === "lugar")
          .map((elem) => elem.lugar) || []) as PlaceParams[];
      } else if (current === "objects") {
        items = (world?.elemento_narrativo
          .filter((elem) => elem.tipo === "outro")
          .map((elem) => elem.outro) || []) as ObjectParams[];
      }

      return (
        <CategoriesList
          category={current}
          items={formattedData(items)}
          onDelete={onDelete}
        />
      );
    }
  };

  const searchString = (data: string) => {
    setSearchValue(data.toLowerCase());
  };

  const classification = (data: string) => {
    setSort(data);
  };

  const filteredData = (
    items: CharacterParams[] | PlaceParams[] | ObjectParams[]
  ) => {
    let filteredItems = items.filter((i) => i.nome.toLowerCase().indexOf(searchValue) > -1);

    return filteredItems;
  };

  const sortedData = (
    items: CharacterParams[] | PlaceParams[] | ObjectParams[]
  ) => {
    switch (sort) {
      case "Nome":
        items = items.sort(function (a, b) {
          if (a.nome < b.nome) return -1;
          if (a.nome > b.nome) return 1;
          return 0;
        });
        return items;
      case "Mais antigo":
        return items;
      case "Mais novo":
        return items;
      case "Última atualização":
        return items;
    }
    return items;
  };

  const formattedData = (
    items: CharacterParams[] | PlaceParams[] | ObjectParams[]
  ) => {
    let newItems: any;

    newItems = filteredData(items);
    newItems = sortedData(newItems);
    return newItems;
  };

  return (
    <Flex direction={"column"} h="full" w="full" alignSelf={"center"}>
      <Header text={world?.nome || "Carregando..."} href="/worlds" />
      <WorldHeader
        current={current}
        onEdit={onEdit}
        searchString={searchString}
        classification={classification}
      />
      {chooseTab()}
    </Flex>
  );
};

export default Description;
