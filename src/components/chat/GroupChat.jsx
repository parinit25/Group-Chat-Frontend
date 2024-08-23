import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import InfoIcon from "@mui/icons-material/Info";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PeopleIcon from "@mui/icons-material/People";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  getAllMessageAction,
  getParticularContactAction,
} from "../../store/actions/asyncChatActions";
import {
  getGroupMessagesAction,
  getParticularGroupAction,
} from "../../store/actions/asyncGroupActions";
import { formatDateTime } from "../../utils/formatDateTime";
import { GroupInfoDialog } from "./GroupInfoDialog";
import { GroupMembersDialog } from "./GroupMembersDialog";
import toast from "react-hot-toast";
import axios from "axios";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CallIcon from "@mui/icons-material/Call";
import CodeIcon from "@mui/icons-material/Code";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SendIcon from "@mui/icons-material/Send";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import VideocamIcon from "@mui/icons-material/Videocam";
import { DeleteOutline } from "@mui/icons-material";
const ITEM_HEIGHT = 48;

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

const GroupChat = ({ emitEvent, listenToEvent, removeListener }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [membersDialog, setMembersDialog] = useState(false);
  const [infoDialog, setInfoDialog] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const chatEndRef = useRef(null);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [groupMessage, setGroupMessage] = useState("");
  const dispatch = useDispatch();
  const contactId = useSelector((state) => state.chat.contactId);
  const userData = useSelector((state) => state.user.user);
  const chatAreaState = useSelector((state) => state.chat.chatAreaState);
  const groupId = useSelector((state) => state.group.groupId);
  const groupDetails = useSelector((state) => state.group.groupDetails);
  const groupMessages = useSelector((state) => state.group.groupMessages);
  const [selectedFile, setSelectedFile] = useState(null);

  const fileExtension = selectedFile
    ? selectedFile.name.split(".").pop().toLowerCase()
    : "";
  // For fetching individual contact messages
  useEffect(() => {
    if (contactId && chatAreaState === "individual") {
      dispatch(getAllMessageAction(contactId));
    }
  }, [contactId, dispatch]);

  // For fetching particular group
  useEffect(() => {
    if (groupId && chatAreaState === "group") {
      dispatch(getParticularGroupAction(groupId));
      dispatch(getGroupMessagesAction(groupId));
    }
  }, [groupId]);

  useEffect(() => {
    if (chatAreaState === "group") {
      emitEvent("joinGroup", { groupId });
      listenToEvent("receiveGroupMessage", (message) => {
        console.log("Group message received", message);
        dispatch(getParticularGroupAction(groupId));
        dispatch(getGroupMessagesAction(groupId));
      });
      return () => {
        removeListener("receiveGroupMessage");
      };
    }
  }, [
    userData,
    chatAreaState,
    contactId,
    groupId,
    dispatch,
    emitEvent,
    listenToEvent,
    removeListener,
  ]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [groupMessages]);

  const senderColors = {};

  const getSenderColor = (senderId) => {
    if (!senderColors[senderId]) {
      senderColors[senderId] = `hsl(${Math.random() * 360}, 70%, 50%)`; // Random color generation
    }
    return senderColors[senderId];
  };

  // For fetching particular contact
  useEffect(() => {
    if (contactId) {
      dispatch(getParticularContactAction(contactId));
    }
  }, [contactId, dispatch]);

  // For sending group messages
  const sendGroupMessages = async () => {
    if (groupMessage.trim() || selectedFile) {
      if (selectedFile) {
        try {
          const { data } = await axios.post(
            "https://group-chat-sharpener.twilightparadox.com/generate-presigned-url",
            {
              fileName: selectedFile.name,
              fileType: selectedFile.type,
              senderId: userData.id,
              groupId: groupId,
              chatType: "group",
            }
          );
          const { url, key } = data;
          await axios.put(url, selectedFile, {
            headers: {
              "Content-Type": selectedFile.type,
              Authorization: undefined,
            },
          });

          const fileUrl = `https://${process.env.REACT_APP_AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;
          emitEvent("sendFile", {
            fileUrl,
            senderId: userData.id,
            groupId: groupId,
            chatType: "group",
          });
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      } else {
        emitEvent("sendGroupMessage", {
          senderId: userData.id,
          groupId: groupId,
          content: groupMessage,
        });
      }
      setGroupMessage("");
      setSelectedFile(null);
    } else {
      toast.error("Message cannot be empty");
    }
  };

  const handleMembersDialogOpen = () => {
    setMembersDialog(true);
  };
  const handleMembersDialogClose = () => {
    setMembersDialog(false);
  };

  const handleInfoDialogOpen = () => {
    setInfoDialog(true);
  };
  const handleInfoDialogClose = () => {
    setInfoDialog(false);
  };

  const handleGroupMessagesInput = (event) => {
    setGroupMessage(event.target.value);
  };

  const triggerFileInput = () => {
    document.getElementById("file-input").click();
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />

      <ChatContainer>
        <ChatHeader>
          <Avatar sx={{ mr: 2 }} />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ fontFamily: "Poppins" }}>
              {groupDetails?.group?.name}
            </Typography>
          </Box>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
              },
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                handleInfoDialogOpen();
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <InfoIcon sx={{ fontSize: "2rem" }} /> <> Info</>
              </Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                handleMembersDialogOpen();
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "1 rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <PeopleIcon sx={{ fontSize: "2rem" }} /> <>Members</>
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  color: "red",
                }}
              >
                <ExitToAppIcon sx={{ fontSize: "2rem" }} /> <> Leave Group </>
              </Typography>
            </MenuItem>
          </Menu>
          {membersDialog && (
            <GroupMembersDialog
              membersDialog={membersDialog}
              onClose={handleMembersDialogClose}
            />
          )}

          {infoDialog && (
            <GroupInfoDialog
              infoDialog={infoDialog}
              onCloseInfo={handleInfoDialogClose}
            />
          )}
        </ChatHeader>
        <ChatMessageList>
          <TransitionGroup>
            {groupMessages?.map((message) => (
              <CSSTransition key={message?.id} timeout={500} classNames="fade">
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
                        message?.senderId === userData?.id
                          ? "#dcf8c6"
                          : "#ffffff",
                      boxShadow: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: getSenderColor(message?.senderId),
                        // fontWeight: "bold",
                        fontFamily: "Poppins",
                        fontSize: "1rem",
                      }}
                    >
                      {message?.senderName}
                    </Typography>
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
                            {message?.content?.endsWith(".pdf") && (
                              <PictureAsPdfIcon
                                sx={{
                                  color: "#E53935",
                                  mr: 1,
                                  fontSize: "3.5rem",
                                }}
                              />
                            )}

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
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: "1rem",
                        color: "grey",
                        display: "block",
                        textAlign: "right",
                        mt: 0.5,
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
            disabled={!!groupMessage}
          />
          <IconButton onClick={triggerFileInput} disabled={!!groupMessage}>
            <AttachFileIcon />
          </IconButton>

          <TextField
            placeholder="Message"
            variant="outlined"
            size="small"
            fullWidth
            value={groupMessage}
            onChange={handleGroupMessagesInput}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendGroupMessages();
                e.preventDefault();
              }
            }}
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
          <IconButton onClick={sendGroupMessages}>
            <SendIcon />
          </IconButton>
        </ChatInput>
      </ChatContainer>
    </Box>
  );
};

export default GroupChat;
