import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  Typography,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import {
  addAdminAction,
  addGroupMemberAction,
  removeGroupMemberAction,
} from "../../store/actions/asyncGroupActions";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { styled } from "@mui/material/styles";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    color: "white",
    boxShadow: theme.shadows[1],
    fontSize: 12,
    fontFamily: "Poppins",
  },
}));

export function GroupMembersDialog({ membersDialog, onClose }) {
  const groupMembers = useSelector((state) => state.group.groupMembers);
  const userContacts = useSelector((state) => state.chat.userContacts);
  const groupId = useSelector((state) => state.group.groupId);
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose();
  };

  const addContactInGroupHandler = (contactId) => {
    const memberObj = {
      contactId: contactId,
      groupId: groupId,
    };
    dispatch(addGroupMemberAction(memberObj));
  };

  const removeMemberFromGroup = (contactId) => {
    const memberObj = {
      contactId: contactId,
      groupId: groupId,
    };
    dispatch(removeGroupMemberAction(memberObj));
  };

  const makeGroupAdminHandler = (contactId) => {
    const adminObj = {
      contactId: contactId,
      groupId: groupId,
    };
    dispatch(addAdminAction(adminObj));
  };

  return (
    <Dialog onClose={handleClose} open={membersDialog} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontFamily: "Poppins", fontSize: "2rem" }}>
        Members
      </DialogTitle>
      <List sx={{ pt: 0, maxHeight: "40vh", overflow: "auto" }}>
        {groupMembers?.map((item) => (
          <ListItem disableGutters key={item?.id}>
            <ListItemButton
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  flexGrow: 1,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "0.5rem",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ fontFamily: "Poppins", fontSize: "1.5rem" }}
                  >
                    {item?.User?.firstName + " " + item?.User?.lastName}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: "1rem",
                      color: "#24ab4a",
                    }}
                    variant="subtitle1"
                  >
                    {item?.role}
                  </Typography>
                </div>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "1rem",
                    color: "#888",
                  }}
                >
                  {item?.User?.emailId}
                </Typography>
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                {item.role === "member" && (
                  <CustomTooltip
                    title="Make User Admin"
                    placement="right"
                    arrow
                  >
                    <AdminPanelSettingsIcon
                      sx={{
                        fontSize: "3rem",
                        transition: "all 300ms",
                        "&:hover": {
                          transform: "scale(1.2)",
                        },
                      }}
                      onClick={() => makeGroupAdminHandler(item?.User?.id)}
                    />
                  </CustomTooltip>
                )}
                <CustomTooltip
                  title="Remove From Group"
                  placement="right"
                  arrow
                >
                  <RemoveCircleIcon
                    sx={{
                      fontSize: "3rem",
                      color: "red",
                      transition: "all 300ms",
                      "&:hover": {
                        transform: "scale(1.2)",
                      },
                    }}
                    onClick={() => removeMemberFromGroup(item?.User?.id)}
                  />
                </CustomTooltip>
              </div>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <DialogTitle sx={{ fontFamily: "Poppins", fontSize: "1.5rem" }}>
        Add your contacts in the group
      </DialogTitle>
      <List sx={{ pt: 0, maxHeight: "40vh", overflow: "auto" }}>
        {userContacts?.map((item) => (
          <ListItem disableGutters key={item?.id}>
            <ListItemButton
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  flexGrow: 1,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "0.5rem",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ fontFamily: "Poppins", fontSize: "1.5rem" }}
                  >
                    {item?.firstName + " " + item?.lastName}
                  </Typography>
                </div>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "1rem",
                    color: "#888",
                  }}
                >
                  {item?.emailId}
                </Typography>
              </div>
              <CustomTooltip
                title="Add Contact In Group"
                placement="right"
                arrow
              >
                {" "}
                <PersonAddAltIcon
                  onClick={() => addContactInGroupHandler(item?.id)}
                  color="success"
                  sx={{
                    fontSize: "3rem",
                    transition: "all 300ms",
                    "&:hover": {
                      transform: "scale(1.2)",
                    },
                  }}
                />
              </CustomTooltip>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
