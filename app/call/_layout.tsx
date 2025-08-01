// import { Stack } from "expo-router";

// export default function CallLayout() {
//   return <Stack screenOptions={{ headerShown: false }} />;
// }


import { useEffect, useState } from "react";
import { Slot } from "expo-router";
import { useSelector } from "react-redux";
import { setupCallSocketListeners } from "~/lib/socket/callHandlers";
import IncomingCallModal from "~/components/IncomingCallModal";
import socket from "~/lib/socket/socket";

export default function RootLayout() {
  const [incomingCallData, setIncomingCallData] = useState(null);
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    if (user?._id) {
      setupCallSocketListeners(user._id, setIncomingCallData);
    }
  }, [user]);

  const handleAccept = () => {
    socket.emit("accept_call", { roomId: incomingCallData?.roomId });
    setIncomingCallData(null);
  };

  const handleReject = () => {
    socket.emit("reject_call", { roomId: incomingCallData?.roomId });
    setIncomingCallData(null);
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
