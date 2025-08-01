// app/_layout.tsx (or RootLayout.tsx)
import { useEffect, useState } from "react";
import { Slot } from "expo-router";
import { useSelector } from "react-redux";
import { setupCallSocketListeners } from "~/lib/socket/callHandlers";
import IncomingCallModal from "~/components/IncomingCallModal";
import socket from "~/lib/socket/socket";

type IncomingCallData = {
  roomId: string;
  callType: "audio" | "video";
  callerId: string;
  callerName?: string;
};

export default function RootLayout() {
  const [incomingCallData, setIncomingCallData] = useState<IncomingCallData | null>(null);
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    if (user?._id) {
      setupCallSocketListeners(user._id, setIncomingCallData);
    }
  }, [user]);

  const handleAccept = () => {
    if (incomingCallData) {
      socket.emit("accept_call", {
        roomId: incomingCallData.roomId,
        receiverId: incomingCallData.callerId,
      });

      // Navigate to the call screen
      const route = incomingCallData.callType === "video"
        ? `/call/OngoingVideoCall?roomId=${incomingCallData.roomId}`
        : `/call/OngoingCall?roomId=${incomingCallData.roomId}`;

      setIncomingCallData(null);
      // navigate using expo-router
      require("expo-router").router.push(route);
    }
  };

  const handleReject = () => {
    if (incomingCallData) {
      socket.emit("reject_call", {
        receiverId: incomingCallData.callerId,
      });
      setIncomingCallData(null);
    }
  };

  return (
    <>
      <IncomingCallModal
        visible={!!incomingCallData}
        onAccept={handleAccept}
        onReject={handleReject}
        callType={incomingCallData?.callType}
        callerName={incomingCallData?.callerName || "ChatIt User"}
      />
      <Slot />
    </>
  );
}
