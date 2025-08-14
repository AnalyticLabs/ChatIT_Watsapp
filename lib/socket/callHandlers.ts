import socket from "./socket";
import { router } from "expo-router";
import { Alert } from "react-native";

export const setupCallSocketListeners = (
  userId: string,
  setIncomingCallData: (data: any) => void
) => {
  socket?.on("incoming_call", (data) => {
    console.log("📞 Incoming Call", data);
    setIncomingCallData(data);
  });

  socket?.on("call_rejected", () => {
    Alert.alert("Call Rejected", "The user has declined the call.");
  });

  socket?.on("call_accepted", ({ roomId, callType }: any) => {
    console.log("✅ Call Accepted", roomId);
    router.push({
      pathname:
        callType === "video" ? "/call/OngoingVideoCall" : "/call/OngoingCall",
      params: { id: roomId },
    });
  });
};
