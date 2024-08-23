import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { LinkedIn } from "@mui/icons-material";
import GitHub from "@mui/icons-material/GitHub";
import logo from "../assests/gc-logo.png";

const logoStyle = {
  width: "140px",
  height: "auto",
};

function Copyright() {
  return (
    <Typography
      sx={{ fontFamily: "Poppins" }}
      variant="body2"
      color="text.secondary"
      mt={1}
    >
      {"Copyright © "}
      <Typography sx={{ fontFamily: "Poppins" }} href="https://mui.com/">
        Group Chat&nbsp;
      </Typography>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: "center", md: "left" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            minWidth: { xs: "100%", sm: "60%" },
          }}
        >
          <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
            <Box sx={{ ml: "-15px" }}>
              <img src={logo} style={logoStyle} alt="logo of sitemark" />
            </Box>
            <Typography
              sx={{ fontFamily: "Poppins" }}
              variant="body2"
              fontWeight={600}
              gutterBottom
            >
              Newsletter
            </Typography>
            <Typography
              sx={{ fontFamily: "Poppins" }}
              variant="body2"
              color="text.secondary"
              mb={2}
            >
              Subscribe to our newsletter for weekly updates and promotions.
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap>
              <TextField
                id="outlined-basic"
                hiddenLabel
                size="small"
                variant="outlined"
                fullWidth
                aria-label="Enter your email address"
                placeholder="Your email address"
                inputProps={{
                  autoComplete: "off",
                  "aria-label": "Enter your email address",
                }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ flexShrink: 0 }}
              >
                Subscribe
              </Button>
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography
            sx={{ fontFamily: "Poppins" }}
            variant="body2"
            fontWeight={600}
          >
            Product
          </Typography>
          <Typography
            sx={{ fontFamily: "Poppins" }}
            color="text.secondary"
            href="#"
          >
            Features
          </Typography>
          <Typography
            sx={{ fontFamily: "Poppins" }}
            color="text.secondary"
            href="#"
          >
            Testimonials
          </Typography>
          <Typography
            sx={{ fontFamily: "Poppins" }}
            color="text.secondary"
            href="#"
          >
            Highlights
          </Typography>
          <Typography
            sx={{ fontFamily: "Poppins" }}
            color="text.secondary"
            href="#"
          >
            Pricing
          </Typography>
          <Typography
            sx={{ fontFamily: "Poppins" }}
            color="text.secondary"
            href="#"
          >
            FAQs
          </Typography>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography
            sx={{ fontFamily: "Poppins" }}
            variant="body2"
            fontWeight={600}
          >
            Company
          </Typography>
          <Typography sx={{ fontFamily: "Poppins" }} color="text.secondary">
            About us
          </Typography>
          <Typography sx={{ fontFamily: "Poppins" }} color="text.secondary">
            Careers
          </Typography>
          <Typography sx={{ fontFamily: "Poppins" }} color="text.secondary">
            Press
          </Typography>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography
            sx={{ fontFamily: "Poppins" }}
            variant="body2"
            fontWeight={600}
          >
            Legal
          </Typography>
          <Typography sx={{ fontFamily: "Poppins" }} color="text.secondary">
            Terms
          </Typography>
          <Typography sx={{ fontFamily: "Poppins" }} color="text.secondary">
            Privacy
          </Typography>
          <Typography sx={{ fontFamily: "Poppins" }} color="text.secondary">
            Contact
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between", // Ensures space between the copyright and icons
          alignItems: "center", // Vertically aligns the items in the center
        }}
      >
        <Copyright />

        <Stack
          direction="row"
          justifyContent="flex-end" // Aligns the icons to the right within the Stack
          spacing={1}
          sx={{
            color: "text.secondary",
          }}
        >
          <IconButton
            color="inherit"
            href="https://github.com/parinit25"
            aria-label="GitHub"
            sx={{ alignSelf: "center" }}
          >
            <GitHub sx={{ fontSize: "3rem" }} />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://www.linkedin.com/in/parinit-singh-a60983287/"
            aria-label="LinkedIn"
            sx={{ alignSelf: "center" }}
          >
            <LinkedIn sx={{ fontSize: "3rem" }} />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://www.Typographyedin.com/company/mui/"
            aria-label="TypographyedIn"
            sx={{ alignSelf: "center" }}
          >
            <Typography sx={{ fontFamily: "Poppins" }} edInIcon />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}
