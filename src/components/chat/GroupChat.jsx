import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import InfoIcon from "@mui/icons-material/Info";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PeopleIcon from "@mui/icons-material/People";
import SendIcon from "@mui/icons-material/Send";
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
import { GroupInfoDialog } from "./GroupInfoDialog";
import { GroupMembersDialog } from "./GroupMembersDialog";
import {
  getGroupMessagesAction,
  getParticularGroupAction,
  sendGroupMessagesAction,
} from "../../store/actions/asyncGroupActions";
import {
  getAllMessageAction,
  getParticularContactAction,
} from "../../store/actions/asyncChatActions";
import { formatDateTime } from "../../utils/formatDateTime";

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
  const sendGroupMessages = () => {
    emitEvent("sendGroupMessage", {
      senderId: userData.id,
      groupId: groupId,
      message: groupMessage,
    });
    setGroupMessage("");
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

  //For setting group messages
  const handleGroupMessagesInput = (event) => {
    setGroupMessage(event.target.value);
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
                    <Typography
                      variant="body1"
                      sx={{ fontFamily: "Poppins", fontSize: "1.5rem" }}
                    >
                      {message?.message}
                    </Typography>
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

        <ChatInput>
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
