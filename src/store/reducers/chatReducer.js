import { createSlice } from "@reduxjs/toolkit";
import {
  getAllContactsAction,
  getAllMessageAction,
  getContactAndLatestMesssageAction,
  getParticularContactAction,
  searchContactAction,
} from "../actions/asyncChatActions";

const initialState = {
  contactAndLatestMessage: [],
  contactId: null,
  allMessagesData: [],
  searchData: [],
  userContacts: [],
  contactDetails: undefined,
  chatAreaState: "individual",
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    changeContactId(state, action) {
      state.contactId = action.payload;
    },
    changeChatAreaState(state, action) {
      state.chatAreaState = action.payload;
    },
    userlogOutIndividual(state, action) {
      state.contactAndLatestMessage = [];
      state.contactId = null;
      state.allMessagesData = [];
      state.searchData = [];
      state.userContacts = [];
      state.contactDetails = undefined;
      state.chatAreaState = "individual";
    },
    messageFromSocketReducer(state, action) {
      state.allMessagesData.messages = [
        ...state.allMessagesData?.messages,
        action?.payload,
      ];
      // console.log(action.payload, "messgaes", state.allMessagesData);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getContactAndLatestMesssageAction.fulfilled,
      (state, action) => {
        const response = action.payload;
        if (state.contactId === null && state.userContacts.length > 1) {
          state.contactId = response.contactsAndMessages[0].contact.id;
        }
        state.contactAndLatestMessage = response;
      }
    );
    builder.addCase(getAllMessageAction.fulfilled, (state, action) => {
      const response = action.payload;
      // console.log(response, "response response response");
      // console.log(response, "allMessagesData");
      state.allMessagesData = response;
    });
    builder.addCase(searchContactAction.fulfilled, (state, action) => {
      const response = action.payload;
      // console.log(response, "search Results");
      state.searchData = response;
    });
    builder.addCase(getAllContactsAction.fulfilled, (state, action) => {
      const response = action.payload;
      state.userContacts = response.Contacts;
      if (state.contactId === null) {
        state.contactId = response.Contacts[0]?.id;
      }
      // console.log("first");
      // console.log(response.Contacts);
    });
    builder.addCase(getParticularContactAction.fulfilled, (state, action) => {
      const response = action.payload;
      state.contactDetails = response;
    });
  },
});

export const {
  changeContactId,
  changeChatAreaState,
  messageFromSocketReducer,
  userlogOutIndividual,
} = chatSlice.actions;
export default chatSlice.reducer;
