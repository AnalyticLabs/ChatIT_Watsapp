import { io, Socket } from "socket.io-client";
import { useEffect, useRef } from "react";

const SERVER = "http://YOUR_SERVER_IP:4000";
// const SERVER = "http://192.168.1.3:4000/api";

export function useSocket(token?: string) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!token) return;
    const socket = io(SERVER, { auth: { token }, transports: ["websocket"] });
    socketRef.current = socket;
    socket.on("connect", () => console.log("connected", socket.id));
    socket.on("disconnect", () => console.log("disconnected"));
    return () => {
      socket.disconnect();
    };
  }, [token]);

  return socketRef;
}
