import React from "react";
import {Button, Container, Typography} from "@mui/material";

const PeoplePage = () => {
  return (
    <Container
      disableGutters
      component="main"
      maxWidth={false}
      sx={{
        display: "flex",
      }}
    >
      People
    </Container>
  );
};

export default PeoplePage;
