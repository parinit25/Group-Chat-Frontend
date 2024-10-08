import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch } from "react-redux";
import { userSignupAction } from "../../store/actions/asyncAuthActions";

const defaultTheme = createTheme();

export default function SignupMainComponent() {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      password: data.get("password"),
      emailId: data.get("email"),
      phoneNumber: data.get("phoneNumber"),
    };
    dispatch(userSignupAction(userData));
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
            <LockOutlinedIcon />
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  placeholder="First Name"
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  placeholder="Last Name"
                  name="lastName"
                  autoComplete="family-name"
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  placeholder="Email Address"
                  name="email"
                  autoComplete="email"
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  placeholder="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  placeholder="Phone Number"
                  type="tel"
                  id="phoneNumber"
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
                  // autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, fontFamily: "Poppins", fontSize: "1.5rem" }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="/login"
                  variant="body2"
                  sx={{ fontFamily: "Poppins", fontSize: "1.2rem" }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
