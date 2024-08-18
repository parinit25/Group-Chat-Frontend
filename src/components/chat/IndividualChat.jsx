import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import CallIcon from "@mui/icons-material/Call";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import VideocamIcon from "@mui/icons-material/Videocam";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { formatDateTime } from "../../utils/formatDateTime";
import axios from "axios";

const ChatContainer = styled(Box)(({ theme }) => ({
  height: "calc(100vh - 100px)",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
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
  backgroundImage: "url(/path/to/background-image.png)",
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

const IndividualChat = ({ emitEvent, listenToEvent, removeListener }) => {
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // State to hold selected file
  const chatEndRef = useRef(null); // Reference to the end of the chat list

  const contactId = useSelector((state) => state.chat.contactId);
  const messagesData = useSelector((state) => state.chat.allMessagesData);
  const userData = useSelector((state) => state.user.user);
  const contactDetails = useSelector((state) => state.chat.contactDetails);

  // Scroll to the bottom when the component mounts or messagesData changes
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messagesData]);

  const handleSendMessage = async () => {
    if (newMessage.trim() || selectedFile) {
      if (selectedFile) {
        try {
          // Step 1: Request a presigned URL from the backend
          const { data } = await axios.post(
            "http://localhost:3000/generate-presigned-url",
            {
              fileName: selectedFile.name,
              fileType: selectedFile.type,
              senderId: userData.id,
              receiverId: contactId,
              chatType: "individual",
            }
          );

          const { url, key } = data;
          // Step 2: Upload the file to S3 using the presigned URL
          await axios.put(url, selectedFile, {
            headers: {
              "Content-Type": selectedFile.type,
            },
          });

          const fileUrl = `https://${process.env.REACT_APP_AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;
          // Step 3: Notify the server about the file upload
          emitEvent("sendFile", {
            fileUrl,
            senderId: userData.id,
            receiverId: contactId,
            chatType: "individual",
          });
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      } else {
        const payload = {
          senderId: userData.id,
          receiverId: contactId,
          content: newMessage,
          type: "text",
        };
        emitEvent("sendMessage", payload);
      }
      setNewMessage("");
      setSelectedFile(null); // Reset file after sending
    }
  };

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const isInputDisabled = !!selectedFile || !!newMessage;

  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <DrawerHeader />
      <ChatContainer>
        <ChatHeader>
          <Avatar sx={{ mr: 2 }} />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ fontFamily: "Poppins" }}>
              {contactDetails?.firstName} {contactDetails?.lastName}
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
            {messagesData?.messages?.map((message) => (
              <CSSTransition
                key={message?.id}
                timeout={500}
                classNames="message"
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      message?.senderId === userData?.id
                        ? "flex-end"
                        : "flex-start",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "70%",
                      padding: 2,
                      borderRadius: 2,
                      backgroundColor:
                        message?.senderId === userData?.id ? "#DCF8C6" : "#fff",
                      boxShadow: 1,
                    }}
                  >
                    {message?.type === "media" && (
                      <>
                        {message?.content?.endsWith(".jpg") ||
                        message?.content?.endsWith(".png") ? (
                          <Box
                            component="img"
                            src={message.content} // Using content for image URL
                            alt="Media"
                            sx={{ maxWidth: "100%", borderRadius: 2 }}
                          />
                        ) : message?.content?.endsWith(".mp4") ? (
                          <Box
                            component="video"
                            src={message.content} // Using content for video URL
                            controls
                            sx={{ maxWidth: "100%", borderRadius: 2 }}
                          />
                        ) : (
                          <Box mt={1}>
                            <a
                              href={message.content} // Using content for file URL
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Typography
                                variant="body2"
                                sx={{ color: "#1E88E5" }}
                              >
                                Download File
                              </Typography>
                            </a>
                          </Box>
                        )}
                      </>
                    )}
                    {message?.type === "text" && (
                      <Typography
                        sx={{ fontFamily: "Poppins", fontSize: "1.5rem" }}
                      >
                        {message?.content}
                      </Typography>
                    )}
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: "1rem",
                        float: "right",
                      }}
                    >
                      {formatDateTime(message?.createdAt)}
                    </Typography>
                  </Box>
                </Box>
              </CSSTransition>
            ))}
          </TransitionGroup>
          <div ref={chatEndRef} />
        </ChatMessageList>
        <ChatInput>
          <Tooltip
            title={
              selectedFile && newMessage
                ? "Please remove the file before writing a message."
                : newMessage && selectedFile
                ? "Please clear the message before selecting a file."
                : ""
            }
            arrow
            disableHoverListener={!selectedFile && !newMessage}
          >
            <label htmlFor="file-input">
              <input
                accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                id="file-input"
                type="file"
                onChange={handleFileChange}
                disabled={!!newMessage}
              />
            </label>
          </Tooltip>

          <TextField
            placeholder="Message"
            variant="outlined"
            size="small"
            fullWidth
            value={newMessage}
            onChange={handleInputChange}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !selectedFile) {
                handleSendMessage();
                e.preventDefault();
              }
            }}
            disabled={!!selectedFile}
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
          <IconButton onClick={handleSendMessage}>
            <SendIcon />
          </IconButton>
        </ChatInput>
      </ChatContainer>
    </Box>
  );
};

export default IndividualChat;
