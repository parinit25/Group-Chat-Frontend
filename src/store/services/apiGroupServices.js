import ApiHelper from "../../utils/apiHelper";

class apiGroupServices {
  static getInstance() {
    return new apiGroupServices();
  }

  createGroup = async (groupData) => {
    try {
      const response = await ApiHelper.post("/groups/create-group", groupData);
      return response.data;
    } catch (error) {
      console.error(
        "Error creating group:",
        error.response?.data || error.message
      );
      throw new Error("Failed to create group. Please try again.");
    }
  };

  getAllGroups = async () => {
    try {
      const response = await ApiHelper.get("/groups");
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching groups:",
        error.response?.data || error.message
      );
      throw new Error("Failed to fetch groups. Please try again.");
    }
  };
  getParticularGroup = async (groupId) => {
    try {
      const response = await ApiHelper.get(`groups/group/${groupId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  async getGroupMembers(groupId) {
    try {
      const response = await ApiHelper.get(`/groups/group-members/${groupId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching group members:",
        error.response?.data || error.message
      );
      throw new Error("Failed to fetch group members. Please try again.");
    }
  }

  async sendGroupMessages(groupMessages) {
    try {
      const response = await ApiHelper.post(
        `/groups/send-messages`,
        groupMessages
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error sending group message:",
        error.response?.data || error.message
      );
      throw new Error("Failed to send group message. Please try again.");
    }
  }

  async getGroupMessages(groupId) {
    try {
      const response = await ApiHelper.get(`/groups/messages/${groupId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Error sending group message:",
        error.response?.data || error.message
      );
      throw new Error("Failed to send group message. Please try again.");
    }
  }

  async editGroupName(groupId, newName) {
    try {
      const response = await ApiHelper.put(`/groups/edit-group/${groupId}`, {
        name: newName,
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error editing group name:",
        error.response?.data || error.message
      );
      throw new Error("Failed to edit group name. Please try again.");
    }
  }

  async leaveGroup(groupId) {
    try {
      const response = await ApiHelper.post(`/groups/leave-group`, {
        groupId: groupId,
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error leaving group:",
        error.response?.data || error.message
      );
      throw new Error("Failed to leave group. Please try again.");
    }
  }

  async addGroupMember(memberObj) {
    try {
      const response = await ApiHelper.post(`/groups/add-member`, memberObj);
      return response.data;
    } catch (error) {
      console.error(
        "Error adding group member:",
        error.response?.data || error.message
      );
      throw new Error("Failed to add group member. Please try again.");
    }
  }

  async removeGroupMember(memberObj) {
    try {
      const response = await ApiHelper.post(`/groups/remove-member`, memberObj);
      return response.data;
    } catch (error) {
      console.error(
        "Error removing group member:",
        error.response?.data || error.message
      );
      throw new Error("Failed to remove group member. Please try again.");
    }
  }

  async addAdmin(adminObj) {
    try {
      const response = await ApiHelper.post(`/groups/add-admin`, adminObj);
      return response.data;
    } catch (error) {
      console.error(
        "Error adding admin:",
        error.response?.data || error.message
      );
      throw new Error("Failed to add admin. Please try again.");
    }
  }

  async deleteGroup(groupId) {
    try {
      const response = await ApiHelper.delete(`/groups/${groupId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Error deleting group:",
        error.response?.data || error.message
      );
      throw new Error("Failed to delete group. Please try again.");
    }
  }
}

const apiGroupService = apiGroupServices.getInstance();
export default apiGroupService;
