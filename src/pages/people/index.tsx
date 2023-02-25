import React from "react";
import {Button, Container, Typography} from "@mui/material";

const PeoplePage = () => {
  const bgGradient = [
    "linear-gradient(var(--darkWhiteTransparent), var(--darkWhiteTransparent))",
  ].join(",");

  return (
    <Container
      disableGutters
      component="main"
      maxWidth={false}
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `
          ${bgGradient},
          url(${process.env.PUBLIC_URL + "/static/images/woodman.jpg"})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      People
    </Container>
  );
};

export default PeoplePage;
