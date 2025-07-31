import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  conversations: any[];
  messages: Record<string, any[]>; // key: conversationId, value: array of messages
  sendMessageLoading: boolean;
  getConversationsLoading: boolean;
  getMessagesLoading: boolean;
  markAsReadLoading: boolean;
  deleteMessageLoading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  conversations: [],
  messages: {},
  sendMessageLoading: false,
  getConversationsLoading: false,
  getMessagesLoading: false,
  markAsReadLoading: false,
  deleteMessageLoading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    /* Send Message */
    sendMessageStart: (state) => {
      state.sendMessageLoading = true;
      state.error = null;
    },
    sendMessageSuccess: (state, action: PayloadAction<any>) => {
      state.sendMessageLoading = false;
      const message = action.payload;
      const convId = message.conversation || message.conversationId || "default";

      if (!state.messages[convId]) {
        state.messages[convId] = [];
      }
      state.messages[convId].push(message);

      // Update last message in conversations if exists
      const convIndex = state.conversations.findIndex(
        (c) => c._id === convId
      );
      if (convIndex !== -1) {
        state.conversations[convIndex].lastMessage = message;
      }
    },
    sendMessageFailure: (state, action: PayloadAction<string>) => {
      state.sendMessageLoading = false;
      state.error = action.payload;
    },

    /* Get Conversations */
    getConversationsStart: (state) => {
      state.getConversationsLoading = true;
      state.error = null;
    },
    getConversationsSuccess: (state, action: PayloadAction<any[]>) => {
      state.getConversationsLoading = false;
      state.conversations = action.payload;
    },
    getConversationsFailure: (state, action: PayloadAction<string>) => {
      state.getConversationsLoading = false;
      state.error = action.payload;
    },

    /* Get Messages */
    getMessagesStart: (state) => {
      state.getMessagesLoading = true;
      state.error = null;
    },
    getMessagesSuccess: (state, action: PayloadAction<{ conversationId: string; messages: any[] }>) => {
      state.getMessagesLoading = false;
      const { conversationId, messages } = action.payload;
      state.messages[conversationId] = messages;
    },
    getMessagesFailure: (state, action: PayloadAction<string>) => {
      state.getMessagesLoading = false;
      state.error = action.payload;
    },

    /* Mark As Read */
    markAsReadStart: (state) => {
      state.markAsReadLoading = true;
      state.error = null;
    },
    markAsReadSuccess: (state) => {
      state.markAsReadLoading = false;
    },
    markAsReadFailure: (state, action: PayloadAction<string>) => {
      state.markAsReadLoading = false;
      state.error = action.payload;
    },

    /* Delete Message */
    deleteMessageStart: (state) => {
      state.deleteMessageLoading = true;
      state.error = null;
    },
    deleteMessageSuccess: (state, action: PayloadAction<string>) => {
      state.deleteMessageLoading = false;
      const messageId = action.payload;
      // Remove message from all conversation messages arrays
      Object.keys(state.messages).forEach((convId) => {
        state.messages[convId] = state.messages[convId].filter(
          (msg) => msg._id !== messageId
        );
      });
      // Optionally, update conversations if last message was deleted (left as exercise)
    },
    deleteMessageFailure: (state, action: PayloadAction<string>) => {
      state.deleteMessageLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
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
} = chatSlice.actions;

export default chatSlice.reducer;
