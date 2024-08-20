import AttachFileIcon from "@mui/icons-material/AttachFile";
import CallIcon from "@mui/icons-material/Call";
import CodeIcon from "@mui/icons-material/Code";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SendIcon from "@mui/icons-material/Send";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import VideocamIcon from "@mui/icons-material/Videocam";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { formatDateTime } from "../../utils/formatDateTime";

import { DeleteOutline } from "@mui/icons-material";
import axios from "axios";
import toast from "react-hot-toast";

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

const fileIcons = {
  pdf: <PictureAsPdfIcon sx={{ color: "#E53935", fontSize: "3.5rem" }} />,
  doc: <DescriptionIcon sx={{ color: "#1976D2", fontSize: "3.5rem" }} />,
  docx: <DescriptionIcon sx={{ color: "#1976D2", fontSize: "3.5rem" }} />,
  xls: <InsertDriveFileIcon sx={{ color: "#4CAF50", fontSize: "3.5rem" }} />,
  xlsx: <InsertDriveFileIcon sx={{ color: "#4CAF50", fontSize: "3.5rem" }} />,
  csv: <InsertDriveFileIcon sx={{ color: "#4CAF50", fontSize: "3.5rem" }} />,
  ppt: <SlideshowIcon sx={{ color: "#FF9800", fontSize: "3.5rem" }} />,
  pptx: <SlideshowIcon sx={{ color: "#FF9800", fontSize: "3.5rem" }} />,
  txt: <TextSnippetIcon sx={{ color: "#9E9E9E", fontSize: "3.5rem" }} />,
  rtf: <TextSnippetIcon sx={{ color: "#9E9E9E", fontSize: "3.5rem" }} />,
  odt: <DescriptionIcon sx={{ color: "#00ACC1", fontSize: "3.5rem" }} />,
  ods: <DescriptionIcon sx={{ color: "#00ACC1", fontSize: "3.5rem" }} />,
  odp: <DescriptionIcon sx={{ color: "#00ACC1", fontSize: "3.5rem" }} />,
  xml: <CodeIcon sx={{ color: "#673AB7", fontSize: "3.5rem" }} />,
  html: <CodeIcon sx={{ color: "#673AB7", fontSize: "3.5rem" }} />,
  css: <CodeIcon sx={{ color: "#673AB7", fontSize: "3.5rem" }} />,
  js: <CodeIcon sx={{ color: "#673AB7", fontSize: "3.5rem" }} />,
  json: <CodeIcon sx={{ color: "#673AB7", fontSize: "3.5rem" }} />,
  zip: <FolderZipIcon sx={{ color: "#FFC107", fontSize: "3.5rem" }} />,
  rar: <FolderZipIcon sx={{ color: "#FFC107", fontSize: "3.5rem" }} />,
};

const IndividualChat = ({ emitEvent, listenToEvent, removeListener }) => {
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const chatEndRef = useRef(null);
  const contactId = useSelector((state) => state.chat.contactId);
  const messagesData = useSelector((state) => state.chat.allMessagesData);
  const userData = useSelector((state) => state.user.user);
  const contactDetails = useSelector((state) => state.chat.contactDetails);

  const fileExtension = selectedFile
    ? selectedFile.name.split(".").pop().toLowerCase()
    : "";

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messagesData]);

  const handleSendMessage = async () => {
    if (newMessage.trim() || selectedFile) {
      if (selectedFile) {
        try {
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
          await axios.put(url, selectedFile, {
            headers: {
              "Content-Type": selectedFile.type,
            },
          });

          const fileUrl = `https://${process.env.REACT_APP_AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;
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
      setSelectedFile(null);
    } else {
      toast.error("Message cannot be empty");
    }
  };

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const triggerFileInput = () => {
    document.getElementById("file-input").click();
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
                            src={message.content}
                            alt="Media"
                            sx={{ maxWidth: "100%", borderRadius: 2 }}
                          />
                        ) : message?.content?.endsWith(".mp4") ? (
                          <Box
                            component="video"
                            src={message.content}
                            controls
                            sx={{ maxWidth: "100%", borderRadius: 2 }}
                          />
                        ) : (
                          <Box display="flex" alignItems="center" mt={1}>
                            {/* PDF */}
                            {message?.content?.endsWith(".pdf") && (
                              <PictureAsPdfIcon
                                sx={{
                                  color: "#E53935",
                                  mr: 1,
                                  fontSize: "3.5rem",
                                }}
                              />
                            )}
                            {/* Word Documents */}
                            {(message?.content?.endsWith(".doc") ||
                              message?.content?.endsWith(".docx")) && (
                              <DescriptionIcon
                                sx={{
                                  color: "#1976D2",
                                  mr: 1,
                                  fontSize: "3.5rem",
                                }}
                              />
                            )}
                            {/* Excel Spreadsheets */}
                            {(message?.content?.endsWith(".xls") ||
                              message?.content?.endsWith(".xlsx") ||
                              message?.content?.endsWith(".csv")) && (
                              <InsertDriveFileIcon
                                sx={{
                                  color: "#4CAF50",
                                  mr: 1,
                                  fontSize: "3.5rem",
                                }}
                              />
                            )}
                            {/* PowerPoint Presentations */}
                            {(message?.content?.endsWith(".ppt") ||
                              message?.content?.endsWith(".pptx")) && (
                              <SlideshowIcon
                                sx={{
                                  color: "#FF9800",
                                  mr: 1,
                                  fontSize: "3.5rem",
                                }}
                              />
                            )}
                            {/* Plain Text and Rich Text */}
                            {(message?.content?.endsWith(".txt") ||
                              message?.content?.endsWith(".rtf")) && (
                              <TextSnippetIcon
                                sx={{
                                  color: "#9E9E9E",
                                  mr: 1,
                                  fontSize: "3.5rem",
                                }}
                              />
                            )}
                            {/* OpenDocument Formats */}
                            {(message?.content?.endsWith(".odt") ||
                              message?.content?.endsWith(".ods") ||
                              message?.content?.endsWith(".odp")) && (
                              <DescriptionIcon
                                sx={{
                                  color: "#00ACC1",
                                  mr: 1,
                                  fontSize: "3.5rem",
                                }}
                              />
                            )}
                            {/* Code Files (XML, HTML, CSS, JS, JSON) */}
                            {(message?.content?.endsWith(".xml") ||
                              message?.content?.endsWith(".html") ||
                              message?.content?.endsWith(".css") ||
                              message?.content?.endsWith(".js") ||
                              message?.content?.endsWith(".json")) && (
                              <CodeIcon
                                sx={{
                                  color: "#673AB7",
                                  mr: 1,
                                  fontSize: "3.5rem",
                                }}
                              />
                            )}
                            {/* Compressed Archives */}
                            {(message?.content?.endsWith(".zip") ||
                              message?.content?.endsWith(".rar")) && (
                              <FolderZipIcon
                                sx={{
                                  color: "#FFC107",
                                  mr: 1,
                                  fontSize: "3.5rem",
                                }}
                              />
                            )}
                            <a
                              href={message.content}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "#1E88E5",
                                  fontSize: "1.5rem",
                                  fontFamily: "Poppins",
                                }}
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
        {selectedFile && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: 2,
              padding: 1,
              borderRadius: 1,
              backgroundColor: "#f0f0f0",
            }}
          >
            {fileIcons[fileExtension] || (
              <InsertDriveFileIcon
                sx={{ color: "#9E9E9E", fontSize: "3.5rem" }}
              />
            )}
            <Box sx={{ ml: 2, flexGrow: 1 }}>
              <Typography variant="body1" sx={{ fontFamily: "Poppins" }}>
                {selectedFile.name}
              </Typography>
            </Box>
            <IconButton onClick={() => setSelectedFile(null)} sx={{ ml: 2 }}>
              <DeleteOutline sx={{ color: "red" }} />
            </IconButton>
          </Box>
        )}

        <ChatInput>
          <input
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.rtf,.odt,.ods,.odp,.xml,.html,.css,.js,.json,.csv,.zip,.rar"
            id="file-input"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
            disabled={!!newMessage}
          />
          <IconButton onClick={triggerFileInput} disabled={!!newMessage}>
            <AttachFileIcon />
          </IconButton>

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
