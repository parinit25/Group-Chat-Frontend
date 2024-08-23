import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUserInfoAction,
  userLoginAction,
} from "../../store/actions/asyncAuthActions";

const defaultTheme = createTheme();

export default function LoginMainComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      emailId: data.get("email"),
      password: data.get("password"),
    };
    try {
      const response = await dispatch(userLoginAction(userData));
      if (response?.payload?.data?.accessToken) {
        localStorage.setItem(
          "accessToken",
          response?.payload?.data?.accessToken
        );
      }
      const isSecure = window.location.protocol === "https:";
      const secureFlag = isSecure ? "; Secure" : "";
      if (response?.payload?.data?.refreshToken) {
        document.cookie = `refreshToken=${response?.payload?.data?.refreshToken}; Path=/${secureFlag}`;
      }
      if (response?.payload?.data?.accessToken) {
        await dispatch(getUserInfoAction());
      }
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error(error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              fontFamily: "Poppins",
              fontSize: "2rem",
              fontWeight: "600",
            }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              placeholder="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{
                mr: 2,
                "& .MuiInputBase-input::placeholder": {
                  fontFamily: "Poppins",
                  fontSize: "1.5rem",
                },
                "& .MuiInputBase-input": {
                  fontFamily: "Poppins",
                  fontSize: "1.5rem",
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              placeholder="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={{
                mr: 2,
                "& .MuiInputBase-input::placeholder": {
                  fontFamily: "Poppins",
                  fontSize: "1.5rem",
                },
                "& .MuiInputBase-input": {
                  fontFamily: "Poppins",
                  fontSize: "1.5rem",
                },
              }}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, fontFamily: "Poppins", fontSize: "1.5rem" }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="/reset-password" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link
                  href="/signup"
                  variant="body2"
                  sx={{ fontFamily: "Poppins", fontSize: "1.2rem" }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
