import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const ChatContainer = styled(Box)(({ theme }) => ({
  height: "calc(100vh - 100px)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center", // Center content vertically
  alignItems: "center", // Center content horizontally
  textAlign: "center", // Center text
  backgroundColor: "#f5f5f5",
  padding: theme.spacing(2),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const SearchContact = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <DrawerHeader />
      <ChatContainer>
        <Typography variant="h5" sx={{ fontFamily: "Poppins", mb: 2 }}>
          No contact selected
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontFamily: "Poppins", color: "#757575" }}
        >
          To start a chat, please search and add a contact from the sidebar.
        </Typography>
      </ChatContainer>
    </Box>
  );
};

export default SearchContact;
