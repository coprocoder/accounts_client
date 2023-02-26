import React, {useRef, useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {FormControl, FormLabel, Radio, RadioGroup} from "@mui/material";
import ImagePicker from "./imagePicker";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {ISignError, onSignError} from "../signin/errHandler";
import {useNavigate} from "react-router-dom";

export default function SignUp() {
  const imageFileRef = useRef<any>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ISignError | null>(null);

  const handleImageSelect = (e: any) => {
    const file = e.target.files[0];
    imageFileRef.current = file;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    let formData = new FormData(event.currentTarget);
    let avatarFile;

    // Upload file avatar
    if (imageFileRef.current) {
      const formImg = new FormData();
      formImg.append("image", imageFileRef.current);
      const imgRes = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/files/upload_img",
        formImg,
        {method: "POST"}
      );
      avatarFile = imgRes.data[0];
    }

    // Upload personal data form
    let formObj = Object.fromEntries(formData);
    if (avatarFile)
      formObj.avatar = {
        path: avatarFile?.path,
        thumbnail: avatarFile?.thumbnail,
      } as any;

    axios
      .post(process.env.REACT_APP_SERVER_URL + "/auth/signup", formObj)
      .then((res) => {
        setError(null);
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
          Регистрация
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
          <Grid container spacing={2}>
            {/* AVATAR */}
            <Grid item xs={12} textAlign="center">
              <ImagePicker onChange={handleImageSelect} />
            </Grid>

            {/* PERSONAL DATA */}
            <Grid item xs={12}>
              <TextField
                name="username"
                required
                fullWidth
                id="username"
                label="Имя пользователя"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="password"
                label="Пароль"
                name="password"
                type="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="date"
                label="День рождения"
                name="birthday"
                type="date"
                defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel id="demo-radio-buttons-group-label">Пол</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="gender"
                  defaultValue="not_specified"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Женский"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Мужской"
                  />
                  <FormControlLabel
                    value="not_specified"
                    control={<Radio />}
                    label="Не указано"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
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
            Создать
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Уже есть аккаунт? Авторизуйтесь
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 10,
          display: "flex",
          flexDirection: "column",
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
        Регистрация
      </Backdrop>
    </Container>
  );
}
