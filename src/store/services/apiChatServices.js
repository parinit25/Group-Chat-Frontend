import { Api } from "@mui/icons-material";
import ApiHelper from "../../utils/apiHelper";

class apiChatServices {
  static getInstance() {
    return new apiChatServices();
  }
  sendMessage = async (messageData) => {
    try {
      const response = await ApiHelper.post(
        "/messages/send-message",
        messageData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  addContact = async (contact) => {
    try {
      await ApiHelper.post("/contacts/add-contact", contact);
    } catch (error) {
      throw new error();
    }
  };
  getContactAndLatestMessage = async () => {
    try {
      const response = await ApiHelper.get("/messages/latest-message");
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getAllMessage = async (contactId) => {
    try {
      const response = await ApiHelper.get(`/messages/contact/${contactId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  searchContact = async (searchParams) => {
    try {
      const response = await ApiHelper.get(`/contacts/search/${searchParams}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getAllContacts = async () => {
    try {
      const response = await ApiHelper.get(`/contacts/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getParticularContact = async (contactId) => {
    try {
      const response = await ApiHelper.get(`/contacts/contact/${contactId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}
export const apiChatService = apiChatServices.getInstance();
