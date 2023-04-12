import React, { useState } from "react";
import { Flex, Button } from "@chakra-ui/react";
import DescriptionCard from "../components/DescriptionCard";
import WorldHeader from "../components/WorldHeader";



const Description: React.FC = () => {
  const [current, setCurrent] = useState("Des");
  const onEdit = (newCurrent: any) => {
    setCurrent(newCurrent);
  }

const chooseTab = () =>{
  if(current === "Des"){
    return <DescriptionCard />
  }else {
    return <Button> Funfou</Button>
  }
};

  return (
    <Flex direction={"column"} h="full" w="full" mb="40px" alignSelf={"center"} overflowY={"hidden"}>
      <WorldHeader current={current} onEdit={onEdit}/>
      {chooseTab()}
    </Flex>
  );
};

export default Description;
