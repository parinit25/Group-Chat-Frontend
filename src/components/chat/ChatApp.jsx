import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import { default as MuiDrawer } from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { styled, useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import ChatArea from "./ChatArea";

const drawerWidth = 240;

const messages = [
  {
    id: 1,
    name: "Chatgram",
    message: "Chatgram Web was updated.",
    time: "19:48",
    verified: true,
  },
  {
    id: 2,
    name: "Jessica Drew",
    message: "Ok, see you later",
    time: "18:30",
    seen: true,
  },
  {
    id: 3,
    name: "David Moore",
    message: "You: I don't remember anything 😅",
    time: "18:16",
  },
  // Add more messages as needed
];
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function Sidebar() {
  return (
    <Paper
      elevation={3}
      sx={{
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", padding: 2 }}>
        <Avatar />
        <TextField
          placeholder="Search"
          variant="outlined"
          size="small"
          fullWidth
          sx={{ ml: 2 }}
          InputProps={{ endAdornment: <SearchIcon /> }}
        />
      </Box>
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        {messages.map((msg) => (
          <Box
            key={msg.id}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 2,
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <Avatar sx={{ mr: 2 }}>{msg.name.charAt(0)}</Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle2">{msg.name} </Typography>
              <Typography variant="body2" color="textSecondary">
                {msg.message}
              </Typography>
            </Box>
            <Typography variant="caption" color="textSecondary">
              {msg.time}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

export default function ChatApp() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              //   marginRight: 2,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{
              //   marginRight: 2,
              ...(!open && { display: "none" }),
            }}
            onClick={handleDrawerClose}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Sidebar />
        <Divider />
      </Drawer>
      <ChatArea />
    </Box>
  );
}
