import { createAsyncThunk } from "@reduxjs/toolkit";
import apiGroupService from "../services/apiGroupServices";
import { create } from "@mui/material/styles/createTransitions";

// Create Group
export const createGroupAction = createAsyncThunk(
  "createGroupAction",
  async (groupData, thunkAPI) => {
    try {
      const response = await apiGroupService.createGroup(groupData);
      thunkAPI.dispatch(getAllGroupsAction());
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to create group."
      );
    }
  }
);

// Get All Groups
export const getAllGroupsAction = createAsyncThunk(
  "getAllGroupsAction",
  async (_, thunkAPI) => {
    try {
      const response = await apiGroupService.getAllGroups();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch groups."
      );
    }
  }
);

export const getParticularGroupAction = createAsyncThunk(
  "getParticularGroupAction",
  async (groupId, thunkAPI) => {
    try {
      const response = await apiGroupService.getParticularGroup(groupId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch group details."
      );
    }
  }
);
// Get Group Members
export const getGroupMembersAction = createAsyncThunk(
  "getGroupMembersAction",
  async (groupId, thunkAPI) => {
    try {
      const response = await apiGroupService.getGroupMembers(groupId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch group members."
      );
    }
  }
);

// Send Group Messages
export const sendGroupMessagesAction = createAsyncThunk(
  "sendGroupMessagesAction",
  async (groupMessages, thunkAPI) => {
    try {
      const response = await apiGroupService.sendGroupMessages(groupMessages);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to send group message."
      );
    }
  }
);
export const getGroupMessagesAction = createAsyncThunk(
  "getGroupMessagesAction",
  async (groupId, thunkAPI) => {
    try {
      const response = await apiGroupService.getGroupMessages(groupId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to send group message."
      );
    }
  }
);

// Edit Group Name
export const editGroupNameAction = createAsyncThunk(
  "editGroupNameAction",
  async ({ groupId, newName }, thunkAPI) => {
    try {
      const response = await apiGroupService.editGroupName(groupId, newName);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to edit group name."
      );
    }
  }
);

// Leave Group
export const leaveGroupAction = createAsyncThunk(
  "leaveGroupAction",
  async (groupId, thunkAPI) => {
    try {
      const response = await apiGroupService.leaveGroup(groupId);
      thunkAPI.dispatch(getAllGroupsAction());
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to leave group."
      );
    }
  }
);

// Add Group Member
export const addGroupMemberAction = createAsyncThunk(
  "addGroupMemberAction",
  async (memberObj, thunkAPI) => {
    try {
      const response = await apiGroupService.addGroupMember(memberObj);
      thunkAPI.dispatch(getGroupMembersAction(memberObj.groupId));
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to add group member."
      );
    }
  }
);

// Remove Group Member
export const removeGroupMemberAction = createAsyncThunk(
  "removeGroupMemberAction",
  async (memberObj, thunkAPI) => {
    try {
      const response = await apiGroupService.removeGroupMember(memberObj);
      thunkAPI.dispatch(getGroupMembersAction(memberObj.groupId));
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to remove group member."
      );
    }
  }
);

// Add Admin
export const addAdminAction = createAsyncThunk(
  "addAdminAction",
  async (adminObj, thunkAPI) => {
    try {
      const response = await apiGroupService.addAdmin(adminObj);
      thunkAPI.dispatch(getGroupMembersAction(adminObj.groupId));
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to add admin.");
    }
  }
);

// Delete Group
export const deleteGroupAction = createAsyncThunk(
  "deleteGroupAction",
  async (groupId, thunkAPI) => {
    try {
      const response = await apiGroupService.deleteGroup(groupId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to delete group."
      );
    }
  }
);
