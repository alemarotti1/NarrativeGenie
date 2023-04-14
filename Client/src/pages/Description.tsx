import React, { useState } from "react";
import { Flex, Button } from "@chakra-ui/react";
import DescriptionCard from "../components/DescriptionCard";
import WorldHeader from "../components/WorldHeader";
import CategoriesList from "../components/CategoriesList";
import Header from "../layout/Header";

const Description: React.FC = () => {
  const [current, setCurrent] = useState("Des");
  const onEdit = (newCurrent: any) => {
    setCurrent(newCurrent);
  };

  const chooseTab = () => {
    if (current === "Des") {
      return <DescriptionCard />;
    } else {
      return <CategoriesList category={current} />;
    }
  };

  return (
    <Flex
      direction={"column"}
      h="full"
      w="full"
      alignSelf={"center"}
    >
      <Header text="Witunkles, The Spirit Vales" href="/world" />
      <WorldHeader current={current} onEdit={onEdit} />
      {chooseTab()}
    </Flex>
  );
};

export default Description;
