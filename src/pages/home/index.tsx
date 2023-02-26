import React from "react";
import {Container, Typography} from "@mui/material";
import SignIn from "../auth/signin";
import users from "../../store/users";
import {observer} from "mobx-react-lite";

const HomePage = observer(() => {
  let token = users.token;
  return token ? <HomeIntro /> : <SignIn />;
});

const HomeIntro = () => {
  return (
    <Container
      disableGutters
      component="main"
      maxWidth={false}
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100%",
      }}
    >
      <HomeIntroBody />
    </Container>
  );
};

const HomeIntroBody = () => {
  return (
    <Container
      disableGutters
      maxWidth="sm"
      component="main"
      sx={{
        py: 6,
        px: 2,
        textAlign: "center",
      }}
    >
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
        sx={{
          fontWeight: "bold",
        }}
      >
        Тестовое задание
      </Typography>
      <Typography
        variant="h5"
        align="center"
        color="text.secondary"
        component="p"
      >
        @coprocoder
      </Typography>
    </Container>
  );
};

export default HomePage;
