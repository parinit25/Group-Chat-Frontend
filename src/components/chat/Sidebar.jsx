import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  ClickAwayListener,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addContactAction,
  getAllContactsAction,
  searchContactAction,
} from "../../store/actions/asyncChatActions";
import { getAllGroupsAction } from "../../store/actions/asyncGroupActions";
import {
  changeChatAreaState,
  changeContactId,
} from "../../store/reducers/chatReducer";
import { changeGroupId } from "../../store/reducers/groupReducer";
import CreateGroup from "./CreateGroup";

function Sidebar({ open }) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [createGroupOpen, setCreateGroupOpen] = useState(false);
  const [isCreateGroupClicked, setIsCreateGroupClicked] = useState(false);
  const searchData = useSelector((state) => state.chat.searchData);
  const userContacts = useSelector((state) => state.chat.userContacts);
  const groupsData = useSelector((state) => state.group.groups);

  useEffect(() => {
    if (searchParams) {
      dispatch(searchContactAction(searchParams));
    }
  }, [searchParams]);

  useEffect(() => {
    dispatch(getAllContactsAction());
  }, []);

  useEffect(() => {
    dispatch(getAllGroupsAction());
  }, []);

  const changeContactIdHandler = (id) => {
    dispatch(changeContactId(id));
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchParams(value);
    setDropdownOpen(!!value);
  };

  const handleClickAway = () => {
    setDropdownOpen(false);
  };

  const addUserContactHandler = (contactId) => {
    const contact = { contactId };
    dispatch(addContactAction(contact));
  };

  const getButtonState = (searchedContact) => {
    const contacts = userContacts;
    let isExistingContact = contacts.findIndex(
      (contact) => contact.id === searchedContact.id
    );
    if (isExistingContact !== -1) {
      return (
        <Button size="small" variant="outlined" color="success">
          Already Added
        </Button>
      );
    } else {
      return (
        <Button
          size="small"
          variant="contained"
          onClick={() => addUserContactHandler(searchedContact.id)}
        >
          +Add
        </Button>
      );
    }
  };

  const handleCreateGroupOpen = () => {
    setCreateGroupOpen(true);
    setIsCreateGroupClicked(true);
  };

  const handleCreateGroupClose = () => {
    setCreateGroupOpen(false);
    setIsCreateGroupClicked(false);
  };

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
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box sx={{ width: "100%", position: "relative" }}>
            {open && (
              <>
                <TextField
                  placeholder="Search to add a new contact"
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{
                    p: 2,
                    fontFamily: "Poppins",
                    "& .MuiInputBase-input::placeholder": {
                      fontFamily: "Poppins",
                      fontSize: "1rem",
                    },
                    "& .MuiInputBase-input": {
                      fontFamily: "Poppins",
                      fontSize: "1rem",
                    },
                  }}
                  onChange={handleSearchChange}
                  InputProps={{ endAdornment: <></> }}
                />
                {dropdownOpen && searchData.length > 0 && (
                  <Paper
                    elevation={3}
                    sx={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      zIndex: 1,
                    }}
                  >
                    <List>
                      {searchData.map((contact) => (
                        <ListItem
                          button
                          key={contact.id}
                          onClick={() => setDropdownOpen(false)}
                        >
                          <ListItemText
                            primary={`${contact.firstName} ${contact.lastName}`}
                            secondary={`${contact.emailId}`}
                            sx={{ fontFamily: "Poppins", fontSize: "1rem" }}
                          />
                          {getButtonState(contact)}
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                )}
              </>
            )}
          </Box>
        </ClickAwayListener>
      </Box>
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        {userContacts?.map((item) => (
          <Box
            key={item?.id}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 2,
              borderBottom: "1px solid #f0f0f0",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              },
            }}
            onClick={() => {
              changeContactIdHandler(item?.id);
              dispatch(changeChatAreaState("individual"));
            }}
          >
            <Avatar sx={{ mr: 2 }}>{item?.firstName?.charAt(0)}</Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontFamily: "Poppins", fontSize: "1.2rem" }}
              >
                {item?.firstName} {item?.lastName}
              </Typography>
            </Box>
          </Box>
        ))}
        <Divider />
        <Box
          sx={{
            p: 1,
            pl: 2,
            pt: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontFamily: "Poppins", fontSize: "1.4rem" }}
          >
            Groups
          </Typography>
          {open && (
            <Button
              variant="contained"
              onClick={handleCreateGroupOpen}
              sx={{
                fontFamily: "Poppins",
                fontSize: "1rem",
                border: isCreateGroupClicked ? "2px solid #1976d2" : "none", // Assuming the button color is the default primary color
              }}
            >
              Create Group
            </Button>
          )}
        </Box>

        {groupsData?.map((item) => (
          <Box
            key={item?.id}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 2,
              borderBottom: "1px solid #f0f0f0",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              },
            }}
            onClick={() => {
              dispatch(changeChatAreaState("group"));
              dispatch(changeGroupId(item.id));
            }}
          >
            <Avatar sx={{ mr: 2 }}>{item?.name?.charAt(0)}</Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontFamily: "Poppins", fontSize: "1.2rem" }}
              >
                {item?.name}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <CreateGroup
        open={createGroupOpen}
        handleClose={handleCreateGroupClose}
      />
    </Paper>
  );
}

export default Sidebar;
