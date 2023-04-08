import React from "react";
import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import Header from "./Header";

const Main: React.FC = () => {
  return (
    <Flex w="100vw" h="100vh" overflow="hidden" bg="#bfbbb9" direction="column">
      <Header />
      <Outlet />
    </Flex>
  );
};

export default Main;
