import React from "react";
import {Box, Button } from "@material-ui/core";
import { DefaultPageContainer } from "../page-container";
import { useLocation } from "react-use";

export default () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <DefaultPageContainer>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100%"
      >
        <Box flex="0 0 auto" my={4} mx={2}>Страница "{pathname}" не найдена</Box>
        <Box flex="0 0 auto">
          <Button color="primary" variant="contained" href="/" size="small">
            На главную
          </Button>
        </Box>
      </Box>
    </DefaultPageContainer>
  );
};
