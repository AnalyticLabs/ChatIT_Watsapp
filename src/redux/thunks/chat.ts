// src/redux/thunks/chatThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const BASE_URL = "http://localhost:4000/api/";
const BASE_URL = "http://13.235.83.139:3001/api/";

// 🧠 Fetch Chat List
export const getChatsThunk = createAsyncThunk("chat/getChats", async () => {
  try {
    const res = await axios.get(`${BASE_URL}/users`);
    const users = res.data.users.slice(0, 12).map((u, i) => ({
      id: i + 1,
      name: `${u.firstName} ${u.lastName}`,
      lastMessage: "Hey! How are you doing?",
      time: "12:4" + i,
      unread: i % 3 === 0 ? i : 0,
      isArchived: i % 4 === 0,
      avatar: u.image,
    }));
    return users;
  } catch (err: any) {
    console.error("❌ getChatsThunk error:", err.message);
    return [];
  }
});

// 🧠 Fetch Messages of a Chat
export const getMessagesThunk = createAsyncThunk(
  "chat/getMessages",
  async (chatId: number) => {
    try {
      const res = await axios.get(`${BASE_URL}/comments/post/${chatId}`);
      const comments = res.data.comments.map((c: any, i: number) => ({
        id: c.id,
        text: c.body,
        time: `10:1${i}`,
        isOwn: c.user.id % 2 === 0,
      }));
      return { chatId, comments };
    } catch (err: any) {
      console.error("❌ getMessagesThunk error:", err.message);
      return { chatId, comments: [] };
    }
  }
);

// 🧠 Send Message
export const sendMessageThunk = createAsyncThunk(
  "chat/sendMessage",
  async ({ chatId, text }: { chatId: number; text: string }) => {
    try {
      await axios.post(`${BASE_URL}/comments/add`, {
        body: text,
        postId: chatId,
        userId: 1, // mock
      });

      return {
        chatId,
        message: {
          id: Date.now(),
          text,
          time: new Date().toLocaleTimeString(),
          isOwn: true,
        },
      };
    } catch (err: any) {
      console.error("❌ sendMessageThunk error:", err.message);
      return {
        chatId,
        message: {
          id: Date.now(),
          text,
          time: new Date().toLocaleTimeString(),
          isOwn: true,
          failed: true,
        },
      };
    }
  }
);
