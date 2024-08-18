import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { blue } from "@mui/material/colors";
import * as React from "react";

export function GroupInfoDialog({ infoDialog, onCloseInfo }) {
  const handleClose = () => {
    onCloseInfo();
  };

  const handleListItemClick = (value) => {
    onCloseInfo();
  };

  return (
    <Dialog onClose={handleClose} open={infoDialog}>
      <DialogTitle sx={{ fontFamily: "Poppins" }}>Group Info</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem disableGutters>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={"hello@gmail.com"} />
          </ListItemButton>
        </ListItem>

        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick("addAccount")}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}
