import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
