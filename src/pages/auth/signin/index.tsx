import React, {useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import users from "../../../store/users";
import {ISignError, onSignError} from "./errHandler";
import {useNavigate} from "react-router-dom";

export default function SignIn() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ISignError | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let formObj = Object.fromEntries(formData);

    setLoading(true);
    axios
      .post(process.env.REACT_APP_SERVER_URL + "/auth/signin", formObj)
      .then((res) => {
        const {token, account} = res.data;
        users.token = token;
        users.account = account;
        localStorage.setItem("token", token);
        localStorage.setItem("account", JSON.stringify(account));
        navigate("/");
      })
      .catch((e) => {
        console.error("SignUp error", e);
        const errConf = onSignError(e) as ISignError;
        setError(errConf);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        py: window.innerWidth < 960 ? 2 : 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Авторизация
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email или имя"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {error && (
            <Alert sx={{mt: 1}} severity="error" variant="outlined">
              <AlertTitle>{error.title}</AlertTitle>
              {error.text}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 2, mb: 2}}
          >
            Войти
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Нет аккаунта? Зарегистрируйтесь"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: "flex",
          flexDirection: "column",
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
        Авторизация
      </Backdrop>
    </Container>
  );
}
