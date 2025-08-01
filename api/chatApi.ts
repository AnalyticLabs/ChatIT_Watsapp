import axiosInstance from "~/config/axiosInstance";
import * as mime from "react-native-mime-types";

type SendMessageParams = {
  content?: string;
  senderId: string;
  receiverId: string;
  messageStatus: "sent" | "delivered" | "read";
  mediaUri?: string;
};

// Send Message (text or media)
export const sendMessageAPI = async ({
  senderId,
  receiverId,
  content,
  messageStatus,
  mediaUri,
}: SendMessageParams) => {
  const formData = new FormData();

  formData.append("senderId", senderId);
  formData.append("receiverId", receiverId);
  formData.append("messageStatus", messageStatus);

  // if (content) {
  //   formData.append("content", content);
  // }
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
    const response = await axiosInstance.post("/chat/send-message", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.data; // populatedMessage from backend
  } catch (error: any) {
    console.error("sendMessageAPI error:", error?.response?.data || error.message);
    throw error;
  }
};

// Get All Conversations for logged-in user
export const getConversationsAPI = async () => {
  try {
    const response = await axiosInstance.get("/chat/conversations");
    return response.data.data; // array of conversations
  } catch (error: any) {
    console.error("getConversationsAPI error:", error?.response?.data || error.message);
    throw error;
  }
};

// Get Messages for a specific conversation
export const getMessagesAPI = async (conversationId: string) => {
  try {
    const response = await axiosInstance.get(`/chat/conversations/${conversationId}/messages`);
    return response.data.data; // array of messages
  } catch (error: any) {
    console.error("getMessagesAPI error:", error?.response?.data || error.message);
    throw error;
  }
};

// Mark messages as read
export const markAsReadAPI = async (messageIds: string[]) => {
  try {
    const response = await axiosInstance.put("/chat/messages/read", {
      messageId: messageIds,
    });
    return response.data;
  } catch (error: any) {
    console.error("markAsReadAPI error:", error?.response?.data || error.message);
    throw error;
  }
};

// Delete a message by ID
export const deleteMessageAPI = async (messageId: string) => {
  try {
    const response = await axiosInstance.delete(`/chat/messages/${messageId}`);
    return response.data;
  } catch (error: any) {
    console.error("deleteMessageAPI error:", error?.response?.data || error.message);
    throw error;
  }
};
