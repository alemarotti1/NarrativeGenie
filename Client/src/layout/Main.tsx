import React from "react";
import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import bg from "../assets/background.png";

const Main: React.FC = () => {
  return (
    <Flex
      w="100vw"
      h="100vh"
      direction="column"
      bgImage={`url("${bg}")`}
      bgPosition="top"
      bgRepeat="no-repeat"
      bgSize={"cover"}
      overflowY="scroll"
      sx={{
        "&::-webkit-scrollbar": {
          width: "16px",
          borderRadius: "8px",
          backgroundColor: "none",
        },
        "&::-webkit-scrollbar-thumb": {
          borderRadius: "8px",
          backgroundColor: `rgba(0, 0, 0, 0.8)`,
        },
      }}
    >
      <Outlet />
    </Flex>
  );
};

export default Main;
