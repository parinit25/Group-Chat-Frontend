import { createSlice } from "@reduxjs/toolkit";
import {
  getAllGroupsAction,
  getGroupMembersAction,
  getGroupMessagesAction,
  getParticularGroupAction,
} from "../actions/asyncGroupActions";

const initialState = {
  groups: [],
  groupId: null,
  groupDetails: null,
  groupMembers: [],
  groupMessages: [],
};

const groupSlice = createSlice({
  name: "group",
  initialState: initialState,
  reducers: {
    changeGroupId(state, action) {
      state.groupId = action.payload;
      console.log(action.payload, "groupId");
    },
    getGroupMessage(state, action) {
      state.groupMessages = [...state.groupMessages, action.payload];
    },
    userLogoutGroup(state, action) {
      state.groups = [];
      state.groupId = null;
      state.groupDetails = null;
      state.groupMembers = [];
      state.groupMessages = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllGroupsAction.fulfilled, (state, action) => {
      const response = action.payload;
      if (state.groupId === null && response?.length > 1) {
        state.groupId = response[0]?.id;
      }
      state.groups = response;
      console.log(response, "response");
    });
    builder.addCase(getParticularGroupAction.fulfilled, (state, action) => {
      const response = action.payload;
      state.groupDetails = response;
      state.groupMembers = response?.group?.GroupMembers;
      // state.groupMessages = response?.group?.GroupMessages;
    });
    builder.addCase(getGroupMembersAction.fulfilled, (state, action) => {
      const response = action.payload;
      // console.log(response, "members2");
      state.groupMembers = response;
    });
    builder.addCase(getGroupMessagesAction.fulfilled, (state, action) => {
      const response = action.payload;
      state.groupMessages = response;
    });
  },
});
export const { changeGroupId, getGroupMessage, userLogoutGroup } =
  groupSlice.actions;
export default groupSlice.reducer;
