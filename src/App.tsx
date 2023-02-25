import React, {useEffect} from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import loadable from "@loadable/component";
import {Backdrop, CircularProgress} from "@mui/material";

import "./App.scss";
import "./Text.scss";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import * as colors from "@mui/material/colors";
import users from "./store/users";
import AppWrapper from "./components/appWrapper";

const Waiter = () => (
  <Backdrop
    sx={{color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}}
    open={true}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
);

const HomePage = loadable(() => import("./pages/home"), {
  fallback: <Waiter />,
});

const AccountPage = loadable(() => import("./pages/account"), {
  fallback: <Waiter />,
});

const PeoplePage = loadable(() => import("./pages/people"), {
  fallback: <Waiter />,
});

const theme = createTheme({
  palette: {
    primary: {
      light: colors.brown[300],
      main: colors.brown[500],
      dark: colors.brown[700],
      contrastText: "#fff",
    },
    secondary: {
      light: colors.blueGrey[300],
      main: colors.blueGrey[500],
      dark: colors.blueGrey[700],
      contrastText: "#000",
    },
  },
});

function App() {
  useEffect(() => {
    users.token = localStorage.getItem("token") as any;
    users.account = localStorage.getItem("account") as any;
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppWrapper>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:id" element={<PeoplePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </AppWrapper>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
