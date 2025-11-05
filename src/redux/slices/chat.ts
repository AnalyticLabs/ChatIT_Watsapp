// src/redux/slices/chatSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import {
  getChatsThunk,
  getMessagesThunk,
  sendMessageThunk,
} from "../thunks/chat";

interface Message {
  id: number;
  text: string;
  time: string;
  isOwn: boolean;
  failed?: boolean;
}

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  isArchived: boolean;
  avatar: string;
}

interface ChatState {
  chats: Chat[];
  messages: Record<number, Message[]>; // key = chatId
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  chats: [],
  messages: {},
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    clearChatData: (state) => {
      state.chats = [];
      state.messages = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // 🟢 Chats
      .addCase(getChatsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChatsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload;
      })
      .addCase(getChatsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch chats";
      })

      // 🟢 Messages
      .addCase(getMessagesThunk.fulfilled, (state, action) => {
        const { chatId, comments } = action.payload;
        state.messages[chatId] = comments;
      })

      // 🟢 Send message
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        const { chatId, message } = action.payload;
        if (!state.messages[chatId]) {
          state.messages[chatId] = [];
        }
        state.messages[chatId].push(message);
      });
  },
});

export const { clearChatData } = chatSlice.actions;
export default chatSlice.reducer;
