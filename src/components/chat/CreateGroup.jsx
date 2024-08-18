import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createGroupAction } from "../../store/actions/asyncGroupActions";

const CreateGroup = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState("");

  const handleCreateGroup = () => {
    console.log(groupName);
    dispatch(createGroupAction({ name: groupName }));
    setGroupName("");
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontFamily: "Poppins", fontSize: "1.5rem" }}>
        Create New Group
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          // label="Group Name"
          type="text"
          fullWidth
          placeholder="Group Name"
          value={groupName}
          sx={{
            // mr: 2,
            "& .MuiInputBase-input::placeholder": {
              fontFamily: "Poppins",
              fontSize: "1.2rem",
            },
            "& .MuiInputBase-input": {
              fontFamily: "Poppins",
              fontSize: "1.2rem",
            },
          }}
          onChange={(e) => setGroupName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{ fontFamily: "Poppins", fontSize: "1rem" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleCreateGroup}
          variant="contained"
          sx={{ fontFamily: "Poppins", fontSize: "1rem" }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateGroup;
