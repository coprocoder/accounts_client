import React from "react";
import {Container, Typography} from "@mui/material";
import SignIn from "../auth/signin";
import users from "../../store/users";
import {observer} from "mobx-react-lite";

const HomePage = observer(() => {
  let token = users.token;
  console.log({token});
  return token ? <HomeIntro /> : <SignIn />;
});

const HomeIntro = () => {
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
        Создаём интерьер вашей мечты
      </Typography>
      <Typography
        variant="h5"
        align="center"
        color="text.secondary"
        component="p"
      >
        Студия Username
      </Typography>
    </Container>
  );
};

export default HomePage;
