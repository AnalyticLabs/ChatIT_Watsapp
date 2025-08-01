// src/lib/socket.ts
import { io } from "socket.io-client";
import { EXPO_BACKEND_URL } from "@env";
import axiosInstance from "~/config/axiosInstance";

const socket = io(EXPO_BACKEND_URL, {
  transports: ["websocket"],
  autoConnect: true,
  reconnection: true,
});

export default socket;
