import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ImagePicker from "../../components/imagePicker";
import {observer} from "mobx-react-lite";
import users, {IUser} from "../../store/users";
import {useParams} from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useEffect, useState} from "react";

const UserView = observer(() => {
  const {id} = useParams();
  const [userInfo, setUserInfo] = useState<IUser | null>();
  const [isVisible, setVisible] = useState<boolean>(true);

  const checkVisible = () => {
    const newVisible =
      !!id ||
      (users.selectedUserId != null && window.innerWidth < 960) ||
      window.innerWidth > 960;
    setVisible(newVisible);
  };

  useEffect(() => {
    window.addEventListener("resize", checkVisible);
    return () => window.removeEventListener("resize", checkVisible);
  }, []);

  useEffect(() => {
    const userId = id || users.selectedUserId;
    const userInfo =
      users.people && userId != null
        ? (users.people[Number(userId)] as any)
        : null;
    setUserInfo(userInfo);
    checkVisible();
  }, [id, users.selectedUserId]);

  const calcAge = (birthday: string | number | Date) => {
    const diff = new Date().getTime() - new Date(birthday).getTime();
    const age_dt = new Date(diff);
    const year = age_dt.getUTCFullYear();
    const age = Math.abs(year - 1970);
    return age;
  };

  const handleBackway = () => {
    users.selectedUserId = null;
  };

  const avatarUrl = userInfo?.avatar
    ? `${process.env.REACT_APP_SERVER_URL}/${userInfo?.avatar?.thumbnail}`
    : "";
  const age = userInfo?.birthday ? calcAge(userInfo.birthday) : null;

  return (
    <Box
      className="userView"
      sx={{
        position: "relative",
        display: isVisible ? "block" : "none",
        flex: 1,
        height: "100%",
      }}
    >
      {userInfo && (
        <AppBar position="absolute" sx={{boxShadow: "none"}}>
          <Toolbar variant="dense" sx={{background: "var(--lightGray)"}}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{mr: 2}}
              onClick={handleBackway}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Назад
            </Typography>
          </Toolbar>
        </AppBar>
      )}
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            width: "100%",
          }}
        >
          {userInfo ? (
            <Box component="form" sx={{mt: 3}}>
              <Grid container spacing={2}>
                <Grid item xs={12} textAlign="center">
                  <ImagePicker disabled url={avatarUrl} />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    disabled
                    name="username"
                    fullWidth
                    id="username"
                    label="Username"
                    value={userInfo?.username}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    disabled
                    fullWidth
                    name="age"
                    label="Age"
                    id="age"
                    value={`${age} лет`}
                  />
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Box sx={{flex: 1, textAlign: "center"}}>
              <Typography variant="h5" color="inherit" component="div">
                Выберите пользователя
              </Typography>
            </Box>
          )}
        </div>
      </Container>
    </Box>
  );
});

export default UserView;
