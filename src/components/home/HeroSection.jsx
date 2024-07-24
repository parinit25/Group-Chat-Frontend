import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";
import logo from "../assests/hero-section-final.png";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  const chatPageHandler = () => {
    navigate("/chat");
  };
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        minHeight: "70vh",
        backgroundImage:
          theme.palette.mode === "light" ? `url(${logo})` : `url(${logo})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              fontSize: "6rem",
              color: "white",
              fontFamily: "Poppins",
            }}
          >
            Stay connnected, Always
          </Typography>
          <Typography
            textAlign="center"
            color="white"
            sx={{
              alignSelf: "center",
              width: { sm: "100%", md: "80%" },
              fontFamily: "Poppins",
              fontSize: "2rem",
            }}
          >
            Connecting people through intuitive and simple chat experiences.
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ee4444",
              fontFamily: "Poppins",
              fontSize: "2rem",
            }}
            onClick={chatPageHandler}
          >
            Get Started
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
