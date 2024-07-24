import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import card1 from "../assests/card-1.png";
import card2 from "../assests/card-2.png";
import { Box } from "@mui/material";

export default function Features() {
  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <div>
            <Typography
              component="h2"
              variant="h4"
              color="text.primary"
              sx={{
                fontFamily: "Poppins",
                fontSize: "3.5rem",
              }}
            >
              Seamless Communication
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mb: { xs: 2, sm: 4 },
                fontFamily: "Poppins",
                fontSize: "2rem",
              }}
            >
              Connect with anyone, anytime.
            </Typography>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box>
            {" "}
            <img src={card1} style={{ width: "100%", height: "auto" }} />
            <Typography sx={{ fontFamily: "Poppins", fontSize: "2rem" }}>
              Message Individuals
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ fontFamily: "Poppins", fontSize: "1.5rem" }}
            >
              Send and receive messages from different people effortlessly.
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box>
            <img src={card2} style={{ width: "100%", height: "auto" }} />
            <Typography sx={{ fontFamily: "Poppins", fontSize: "2rem" }}>
              Create Groups
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ fontFamily: "Poppins", fontSize: "1.5rem" }}
            >
              Form groups and add users by searching their names.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
