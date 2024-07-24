import CallIcon from "@mui/icons-material/Call";
import MessageIcon from "@mui/icons-material/Message";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import VideocamIcon from "@mui/icons-material/Videocam";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { default as MuiDrawer } from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const initialMessages = [
  {
    id: 1,
    sender: "David Moore",
    message:
      "OMG 😱 do you remember what you did last night at the work night out?",
    time: "18:12",
    type: "received",
    liked: true,
  },
  { id: 2, sender: "You", message: "no haha", time: "18:16", type: "sent" },
  {
    id: 3,
    sender: "You",
    message: "i don't remember anything 😅",
    time: "18:16",
    type: "sent",
  },
];

const ChatContainer = styled(Box)(({ theme }) => ({
  height: "calc(100vh - 100px)", // Adjust this based on your header height
  display: "flex",
  flexDirection: "column",
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const ChatMessageList = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflowY: "auto",
  padding: theme.spacing(2),
  backgroundColor: "#e5e5e5",
  backgroundImage: "url(/path/to/background-image.png)", // Add your background image here
  backgroundRepeat: "repeat",
}));

const ChatInput = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const ChatArea = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMessageObj = {
        id: messages.length + 1,
        sender: "You",
        message: newMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "sent",
      };
      setMessages([...messages, newMessageObj]);
      setNewMessage("");
    }
  };

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      <ChatContainer>
        <ChatHeader>
          <Avatar sx={{ mr: 2 }} />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6">David Moore</Typography>
            <Typography variant="body2" color="textSecondary">
              last seen 5 mins ago
            </Typography>
          </Box>
          <IconButton>
            <CallIcon />
          </IconButton>
          <IconButton>
            <VideocamIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </ChatHeader>
        <ChatMessageList>
          <TransitionGroup>
            {messages.map((msg) => (
              <CSSTransition key={msg.id} timeout={500} classNames="message">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      msg.type === "sent" ? "flex-end" : "flex-start",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "70%",
                      padding: 2,
                      borderRadius: 2,
                      backgroundColor: msg.type === "sent" ? "#DCF8C6" : "#fff",
                      boxShadow: 1,
                    }}
                  >
                    <Typography>{msg.message}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {msg.time}
                    </Typography>
                  </Box>
                </Box>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ChatMessageList>
        <ChatInput>
          <TextField
            placeholder="Message"
            variant="outlined"
            size="small"
            fullWidth
            value={newMessage}
            onChange={handleInputChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
                e.preventDefault();
              }
            }}
            sx={{ mr: 2 }}
            InputProps={{ startAdornment: <MessageIcon /> }}
          />
          <IconButton color="primary" onClick={handleSendMessage}>
            <SendIcon />
          </IconButton>
        </ChatInput>
      </ChatContainer>
    </Box>
  );
};

export default ChatArea;
