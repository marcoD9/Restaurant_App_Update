import { Outlet } from "react-router-dom";
import Navigation from "./Navigation.tsx";
import { Box } from "@chakra-ui/react";

export const Root = () => {
  return (
    <Box>
      <Box position="sticky" top="0" width="100%" zIndex="10" bg="gray.100">
        <Navigation />
      </Box>
      <Outlet />
    </Box>
  );
};
