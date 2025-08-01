import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import authReducer from "../features/auth/authSlice";
import chatReducer from "../features/chat/chatSlice";
import groupChatReducer from "../features/groupChat/groupChatSlice";
import callReducer from "../features/call/callSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    auth: authReducer,
    chat: chatReducer,
    groupChat: groupChatReducer,
    call: callReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
