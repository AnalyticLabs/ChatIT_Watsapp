import { AppDispatch } from "../../store/index";
import {
  createGroupAPI,
  sendGroupMessageAPI,
  getGroupMessagesAPI,
  markGroupMessagesAsReadAPI,
  deleteGroupMessageAPI,
  deleteGroupAPI,
} from "../../api/groupChatApi"; // your group API helper imports

import {
  createGroupStart,
  createGroupSuccess,
  createGroupFailure,
  sendGroupMessageStart,
  sendGroupMessageSuccess,
  sendGroupMessageFailure,
  getGroupMessagesStart,
  getGroupMessagesSuccess,
  getGroupMessagesFailure,
  markGroupMessagesAsReadStart,
  markGroupMessagesAsReadSuccess,
  markGroupMessagesAsReadFailure,
  deleteGroupMessageStart,
  deleteGroupMessageSuccess,
  deleteGroupMessageFailure,
  deleteGroupStart,
  deleteGroupSuccess,
  deleteGroupFailure,
} from "./groupChatSlice";

export const createGroup = (formData: FormData) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(createGroupStart());
      const group = await createGroupAPI(formData);
      dispatch(createGroupSuccess(group));
      return group;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to create group";
      dispatch(createGroupFailure(message));
      throw error;
    }
  };
};

export const sendGroupMessage = (payload: {
  groupId: string;
  senderId: string;
  content?: string;
  mediaUri?: string;
  messageStatus: "sent" | "delivered" | "read";
}) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(sendGroupMessageStart());
      const message = await sendGroupMessageAPI(payload);
      dispatch(sendGroupMessageSuccess(message));
      return message;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to send group message";
      dispatch(sendGroupMessageFailure(message));
      throw error;
    }
  };
};

export const fetchGroupMessages = (groupId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(getGroupMessagesStart());
      const messages = await getGroupMessagesAPI(groupId);
      dispatch(getGroupMessagesSuccess({ groupId, messages }));
      return messages;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to load group messages";
      dispatch(getGroupMessagesFailure(message));
      throw error;
    }
  };
};

export const markGroupMessagesAsRead = (groupId: string, messageIds: string[]) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(markGroupMessagesAsReadStart());
      const res = await markGroupMessagesAsReadAPI(groupId, messageIds);
      dispatch(markGroupMessagesAsReadSuccess(res));
      return res;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to mark group messages as read";
      dispatch(markGroupMessagesAsReadFailure(message));
      throw error;
    }
  };
};

export const deleteGroupMessage = (messageId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(deleteGroupMessageStart());
      const res = await deleteGroupMessageAPI(messageId);
      dispatch(deleteGroupMessageSuccess(messageId));
      return res;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to delete group message";
      dispatch(deleteGroupMessageFailure(message));
      throw error;
    }
  };
};

export const deleteGroup = (groupId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(deleteGroupStart());
      const res = await deleteGroupAPI(groupId);
      dispatch(deleteGroupSuccess(groupId));
      return res;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to delete group";
      dispatch(deleteGroupFailure(message));
      throw error;
    }
  };
};
