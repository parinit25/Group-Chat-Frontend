import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiChatService } from "../services/apiChatServices";
import { create } from "@mui/material/styles/createTransitions";

export const sendMessageAction = createAsyncThunk(
  "sendMessageAction",
  async (messageData) => {
    await apiChatService.sendMessage(messageData);
  }
);
export const addContactAction = createAsyncThunk(
  "addContactAction",
  async (contact, thunkAPI) => {
    await apiChatService.addContact(contact);
    thunkAPI.dispatch(getContactAndLatestMesssageAction());
  }
);
export const getAllContactsAction = createAsyncThunk(
  "getAllContactsAction",
  async () => {
    const response = await apiChatService.getAllContacts();
    return response;
  }
);
export const getParticularContactAction = createAsyncThunk(
  "getParticularContact",
  async (contactId) => {
    const response = await apiChatService.getParticularContact(contactId);
    return response;
  }
);
export const getContactAndLatestMesssageAction = createAsyncThunk(
  "getContactAndLatestMessageAction",
  async () => {
    const response = await apiChatService.getContactAndLatestMessage();
    return response;
  }
);

export const getAllMessageAction = createAsyncThunk(
  "getAllMesssageAction",
  async (contactId) => {
    const response = await apiChatService.getAllMessage(contactId);
    return response;
  }
);
export const searchContactAction = createAsyncThunk(
  "searchContactAction",
  async (searchParams) => {
    const response = await apiChatService.searchContact(searchParams);
    return response;
  }
);
