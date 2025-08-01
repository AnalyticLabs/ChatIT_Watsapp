// components/GlobalSocketHandler.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";
import { RootState } from "~/store/index";
import { setIncomingCaller } from "~/features/call/callSlice";
import socket from "~/lib/socket/socket";

interface IncomingCallPayload {
  roomId: string;
  type: "audio" | "video";
  caller: {
    _id: string;
    name: string;
    avatar: string;
  };
}

const GlobalSocketHandler = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!user?._id) return;

    socket.emit("register", user._id);

    socket.on("incoming-call", (payload: IncomingCallPayload) => {
      const { roomId, type, caller } = payload;
      dispatch(setIncomingCaller(caller));

      if (type === "audio") {
        router.push({ pathname: "/call/OngoingCall", params: { id: roomId } });
      } else if (type === "video") {
        router.push({ pathname: "/call/OngoingVideoCall", params: { id: roomId } });
      }
    });

    return () => {
      socket.off("incoming-call");
    };
  }, [user]);

  return null;
};

export default GlobalSocketHandler;
