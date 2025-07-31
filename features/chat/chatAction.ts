import { AppDispatch } from "../../store/index";
import {
  sendMessageStart,
  sendMessageSuccess,
  sendMessageFailure,
  getConversationsStart,
  getConversationsSuccess,
  getConversationsFailure,
  getMessagesStart,
  getMessagesSuccess,
  getMessagesFailure,
  markAsReadStart,
  markAsReadSuccess,
  markAsReadFailure,
  deleteMessageStart,
  deleteMessageSuccess,
  deleteMessageFailure,
} from "./chatSlice";
import {
  sendMessageAPI,
  getConversationsAPI,
  getMessagesAPI,
  markAsReadAPI,
  deleteMessageAPI,
} from "../../api/chatApi";

// Send a new chat message (text or media)
export const sendMessage = (payload: {
  senderId: string;
  receiverId: string;
  content?: string;
  mediaUri?: string;
  messageStatus: "send" | "delivered" | "read";
}) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(sendMessageStart());
      const message = await sendMessageAPI(payload);
      dispatch(sendMessageSuccess(message));
      return message;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to send message";
      dispatch(sendMessageFailure(message));
      throw error;
    }
  };
};

// Fetch all conversations for current user
export const fetchConversations = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(getConversationsStart());
      const conversations = await getConversationsAPI();
      dispatch(getConversationsSuccess(conversations));
      return conversations;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to load conversations";
      dispatch(getConversationsFailure(message));
      throw error;
    }
  };
};

// Fetch messages in a specific conversation
export const fetchMessages = (conversationId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(getMessagesStart());
      const messages = await getMessagesAPI(conversationId);
      dispatch(getMessagesSuccess(messages));
      return messages;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to load messages";
      dispatch(getMessagesFailure(message));
      throw error;
    }
  };
};

// Mark messages as read by message IDs
export const markMessagesAsRead = (messageIds: string[]) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(markAsReadStart());
      const res = await markAsReadAPI(messageIds);
      dispatch(markAsReadSuccess(res));
      return res;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to mark messages as read";
      dispatch(markAsReadFailure(message));
      throw error;
    }
  };
};

// Delete a specific message by ID
export const deleteMessage = (messageId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(deleteMessageStart());
      const res = await deleteMessageAPI(messageId);
      dispatch(deleteMessageSuccess(messageId));
      return res;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to delete message";
      dispatch(deleteMessageFailure(message));
      throw error;
    }
  };
};
