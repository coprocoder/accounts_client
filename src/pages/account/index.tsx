import React, {useEffect, useRef, useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {ISignError, onSignError} from "../auth/signin/errHandler";
import ImagePicker from "../../components/imagePicker";
import users, {IUser, UserPart} from "../../store/users";
import {useNavigate} from "react-router-dom";

const AccountPage = () => {
  const navigate = useNavigate();
  const imageFileRef = useRef<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ISignError | null>(null);

  const [accountInfo, setAccountInfo] = useState<UserPart | null>(
    users.account
  );

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/account", {
        headers: {auth: users.token},
      })
      .then((res) => {
        const accountInfo = res.data;
        setAccountInfo(accountInfo);
        localStorage.setItem("account", JSON.stringify(accountInfo));
        users.account = accountInfo;
      });
  }, []);

  const handleImageSelect = (e: any) => {
    const file = e.target.files[0];
    imageFileRef.current = file;
  };

  const handleLogout = () => {
    users.token = null;
    users.account = null;
    localStorage.removeItem("token");
    localStorage.removeItem("token");
    navigate("/");
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
    if (avatarFile) {
      formObj.avatar = {
        path: avatarFile?.path,
        thumbnail: avatarFile?.thumbnail,
      } as any;
    }

    axios
      .put(process.env.REACT_APP_SERVER_URL + "/account", formObj, {
        headers: {
          auth: users.token,
        },
      })
      .then((res) => {
        setError(null);

        const prevInfo = users.account as any;
        const newInfo = {...prevInfo, ...formObj};
        users.account = newInfo;
        localStorage.setItem("account", JSON.stringify(newInfo));
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
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={12} textAlign="center">
              <ImagePicker
                url={
                  accountInfo?.avatar
                    ? process.env.REACT_APP_SERVER_URL +
                      "/" +
                      accountInfo?.avatar?.thumbnail
                    : null
                }
                onChange={handleImageSelect}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="username"
                fullWidth
                id="username"
                label="Имя пользователя"
                autoFocus
                value={accountInfo?.username}
                onChange={(e) => {
                  const {value: username} = e.target;
                  setAccountInfo({...accountInfo, username});
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="new-password"
                value={accountInfo?.password}
                onChange={(e) => {
                  const {value: password} = e.target;
                  setAccountInfo({...accountInfo, password});
                }}
              />
            </Grid>
          </Grid>
          {error && (
            <Alert sx={{mt: 2}} severity="error" variant="outlined">
              <AlertTitle>{error.title}</AlertTitle>
              {error.text}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 4, mb: 2}}
          >
            Save
          </Button>
        </Box>
        <Button
          fullWidth
          variant="outlined"
          sx={{mb: 2}}
          onClick={handleLogout}
        >
          Logout
        </Button>
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
        Обновление данных
      </Backdrop>
    </Container>
  );
};

export default AccountPage;
