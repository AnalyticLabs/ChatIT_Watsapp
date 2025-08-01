import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GroupChatState {
  groups: any[]; // List of groups
  messages: Record<string, any[]>; // key: groupId, value: messages[]
  createGroupLoading: boolean;
  sendGroupMessageLoading: boolean;
  getGroupMessagesLoading: boolean;
  markGroupMessagesAsReadLoading: boolean;
  deleteGroupMessageLoading: boolean;
  deleteGroupLoading: boolean;
  error: string | null;
}

const initialState: GroupChatState = {
  groups: [],
  messages: {},
  createGroupLoading: false,
  sendGroupMessageLoading: false,
  getGroupMessagesLoading: false,
  markGroupMessagesAsReadLoading: false,
  deleteGroupMessageLoading: false,
  deleteGroupLoading: false,
  error: null,
};

const groupChatSlice = createSlice({
  name: "groupChat",
  initialState,
  reducers: {
    /* Create Group */
    createGroupStart: (state) => {
      state.createGroupLoading = true;
      state.error = null;
    },
    createGroupSuccess: (state, action: PayloadAction<any>) => {
      state.createGroupLoading = false;
      state.groups.push(action.payload);
    },
    createGroupFailure: (state, action: PayloadAction<string>) => {
      state.createGroupLoading = false;
      state.error = action.payload;
    },

    /* Send Group Message */
    sendGroupMessageStart: (state) => {
      state.sendGroupMessageLoading = true;
      state.error = null;
    },
    sendGroupMessageSuccess: (state, action: PayloadAction<any>) => {
      state.sendGroupMessageLoading = false;
      const message = action.payload;
      const groupId = message.groupId || message.group || "default";

      if (!state.messages[groupId]) {
        state.messages[groupId] = [];
      }
      state.messages[groupId].push(message);

      // Optional: update last message in groups list
      const groupIndex = state.groups.findIndex((g) => g._id === groupId);
      if (groupIndex !== -1) {
        state.groups[groupIndex].lastMessage = message;
      }
    },
    sendGroupMessageFailure: (state, action: PayloadAction<string>) => {
      state.sendGroupMessageLoading = false;
      state.error = action.payload;
    },

    /* Get Group Messages */
    getGroupMessagesStart: (state) => {
      state.getGroupMessagesLoading = true;
      state.error = null;
    },
    getGroupMessagesSuccess: (state, action: PayloadAction<{ groupId: string; messages: any[] }>) => {
      state.getGroupMessagesLoading = false;
      const { groupId, messages } = action.payload;
      state.messages[groupId] = messages;
    },
    getGroupMessagesFailure: (state, action: PayloadAction<string>) => {
      state.getGroupMessagesLoading = false;
      state.error = action.payload;
    },

    /* Mark Group Messages As Read */
    markGroupMessagesAsReadStart: (state) => {
      state.markGroupMessagesAsReadLoading = true;
      state.error = null;
    },
    markGroupMessagesAsReadSuccess: (state) => {
      state.markGroupMessagesAsReadLoading = false;
    },
    markGroupMessagesAsReadFailure: (state, action: PayloadAction<string>) => {
      state.markGroupMessagesAsReadLoading = false;
      state.error = action.payload;
    },

    /* Delete Group Message */
    deleteGroupMessageStart: (state) => {
      state.deleteGroupMessageLoading = true;
      state.error = null;
    },
    deleteGroupMessageSuccess: (state, action: PayloadAction<string>) => {
      state.deleteGroupMessageLoading = false;
      const messageId = action.payload;
      Object.keys(state.messages).forEach((groupId) => {
        state.messages[groupId] = state.messages[groupId].filter((msg) => msg._id !== messageId);
      });
    },
    deleteGroupMessageFailure: (state, action: PayloadAction<string>) => {
      state.deleteGroupMessageLoading = false;
      state.error = action.payload;
    },

    /* Delete Group */
    deleteGroupStart: (state) => {
      state.deleteGroupLoading = true;
      state.error = null;
    },
    deleteGroupSuccess: (state, action: PayloadAction<string>) => {
      state.deleteGroupLoading = false;
      const groupId = action.payload;
      state.groups = state.groups.filter((g) => g._id !== groupId);
      delete state.messages[groupId];
    },
    deleteGroupFailure: (state, action: PayloadAction<string>) => {
      state.deleteGroupLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
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
} = groupChatSlice.actions;

export default groupChatSlice.reducer;
