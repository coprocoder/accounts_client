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
        {
          method: "POST",
        }
      );
      avatarFile = imgRes.data[0];
      console.log({avatarFile});
    }

    // Upload personal data form
    let formObj = Object.fromEntries(formData);
    if (avatarFile)
      formObj.avatar = {
        path: avatarFile?.path,
        thumbnail: avatarFile?.thumbnail,
      } as any;

    console.log({formObj});

    axios
      .post(process.env.REACT_APP_SERVER_URL + "/auth/signup", formObj)
      .then((res) => {
        console.log({res});
        setError(null);
        navigate("/");
      })
      .catch((e) => {
        console.error("SignUp error", e);
        onSignError(e);
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
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
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
                label="Username"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="birthday"
                id="date"
                label="Birthday"
                type="date"
                defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* GENDER */}
            <Grid item xs={12}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="gender"
                  defaultValue="other"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          {error && (
            <Alert severity="error" variant="outlined">
              <AlertTitle>{error.title}</AlertTitle>
              {error.text}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Backdrop
        sx={{color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}
