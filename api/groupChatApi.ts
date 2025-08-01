import axiosInstance from "~/config/axiosInstance";
import * as mime from "react-native-mime-types";

type SendGroupMessageParams = {
  groupId: string;
  senderId: string;
  content?: string;
  messageStatus: "sent" | "delivered" | "read";
  mediaUri?: string;
};

// ✅ Create a new group
export const createGroupAPI = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post("/group/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  } catch (error: any) {
    console.error("createGroupAPI error:", error?.response?.data || error.message);
    throw error;
  }
};

// ✅ Send message to a group (text or media)
export const sendGroupMessageAPI = async ({
  groupId,
  senderId,
  content,
  messageStatus,
  mediaUri,
}: SendGroupMessageParams) => {
  const formData = new FormData();
  formData.append("groupId", groupId);
  formData.append("senderId", senderId);
  formData.append("messageStatus", messageStatus);

  if (content) {
    formData.append("content", content);
  }

  if (mediaUri) {
    const fileType = mime.lookup(mediaUri) || "image/jpeg";
    formData.append("image", {
      uri: mediaUri,
      name: "upload.jpg",
      type: fileType,
    } as any);
  }

  try {
    const response = await axiosInstance.post("/group/send-message", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  } catch (error: any) {
    console.error("sendGroupMessageAPI error:", error?.response?.data || error.message);
    throw error;
  }
};

// ✅ Get all messages for a group
export const getGroupMessagesAPI = async (groupId: string) => {
  try {
    const response = await axiosInstance.get(`/group/messages/${groupId}`);
    return response.data.data;
  } catch (error: any) {
    console.error("getGroupMessagesAPI error:", error?.response?.data || error.message);
    throw error;
  }
};

// ✅ Mark group messages as read
export const markGroupMessagesAsReadAPI = async (groupId: string, messageIds: string[]) => {
  try {
    const response = await axiosInstance.put("/group/mark-read", {
      groupId,
      messageIds,
    });
    return response.data;
  } catch (error: any) {
    console.error("markGroupMessagesAsReadAPI error:", error?.response?.data || error.message);
    throw error;
  }
};

// ✅ Delete a group message
export const deleteGroupMessageAPI = async (messageId: string) => {
  try {
    const response = await axiosInstance.delete(`/group/delete-message/${messageId}`);
    return response.data;
  } catch (error: any) {
    console.error("deleteGroupMessageAPI error:", error?.response?.data || error.message);
    throw error;
  }
};

// ✅ Delete a group
export const deleteGroupAPI = async (groupId: string) => {
  try {
    const response = await axiosInstance.delete(`/group/delete/${groupId}`);
    return response.data;
  } catch (error: any) {
    console.error("deleteGroupAPI error:", error?.response?.data || error.message);
    throw error;
  }
};

// ✅ Get info about a group
export const getGroupInfoAPI = async (groupId: string) => {
  try {
    const response = await axiosInstance.get(`/group/group-info/${groupId}`);
    return response.data.data;
  } catch (error: any) {
    console.error("getGroupInfoAPI error:", error?.response?.data || error.message);
    throw error;
  }
};

// ✅ Get groups where user is admin
export const getAdminGroupsAPI = async () => {
  try {
    const response = await axiosInstance.get("/group/admin-groups");
    return response.data.data;
  } catch (error: any) {
    console.error("getAdminGroupsAPI error:", error?.response?.data || error.message);
    throw error;
  }
};

// ✅ Get groups where user is a member
export const getUserGroupsAPI = async () => {
  try {
    const response = await axiosInstance.get("/group/user-groups");
    return response.data.data;
  } catch (error: any) {
    console.error("getUserGroupsAPI error:", error?.response?.data || error.message);
    throw error;
  }
};

// ✅ Add member to group
export const addMemberToGroupAPI = async (groupId: string, memberId: string) => {
  try {
    const response = await axiosInstance.put("/group/add-member", { groupId, memberId });
    return response.data;
  } catch (error: any) {
    console.error("addMemberToGroupAPI error:", error?.response?.data || error.message);
    throw error;
  }
};

// ✅ Update group profile (image/name)
export const updateGroupDetailsAPI = async (formData: FormData) => {
  try {
    const response = await axiosInstance.put("/group/update-group-profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  } catch (error: any) {
    console.error("updateGroupDetailsAPI error:", error?.response?.data || error.message);
    throw error;
  }
};
