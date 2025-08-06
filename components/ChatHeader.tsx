import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { ArrowLeft, Video, Phone, MoreVertical } from "lucide-react-native";
import { useColorScheme } from "~/lib/useColorScheme";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import uuid from "react-native-uuid";
import socket from "~/lib/socket/socket";

interface ChatHeaderProps {
  name: string;
  imageUrl?: string | number;
  time: string;
  onBack: () => void;
  isGroup?: boolean;
  baseRoute?: string;
  chatId: string;
  receiverId?: string; // optional if passed directly
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  name,
  imageUrl,
  time,
  onBack,
  isGroup = false,
  baseRoute,
  chatId,
  receiverId,
}) => {
  const { width } = useWindowDimensions();
  const maxNameWidth = width - 170;
  const { isDarkColorScheme } = useColorScheme();
  const router = useRouter();

  const user = useSelector((state: any) => state.auth.user); // get current user
  const routeBase = baseRoute || "/call";

  const handleCallStart = (type: "audio" | "video") => {
    if (!user?._id || !receiverId) {
      console.log("Missing user or receiverId");
      return;
    }
    const roomId = uuid.v4();

    socket.emit("start_call", {
      callType: type,
      receiverId,
      roomId,
    });

    router.push({
      pathname:
        type === "video" ? "/call/OngoingVideoCall" : "/call/OngoingCall",
      params: { id: roomId, receiverId: chatId },
    });
  };

  return (
    <View
      className="flex-row items-center px-5 pt-10 py-3 border-b-2 border-gray-200 dark:border-white/10"
      style={{ backgroundColor: isDarkColorScheme ? "#0e0c19" : "#ffffff" }}
    >
      {/* Back Button */}
      <TouchableOpacity onPress={onBack} className="mr-3">
        <ArrowLeft size={24} color={isDarkColorScheme ? "white" : "black"} />
      </TouchableOpacity>

      {/* Profile Image */}
      <Image
        source={
          typeof imageUrl === "string"
            ? { uri: imageUrl }
            : imageUrl ?? require("../assets/images/Chatit.png")
        }
        className="w-10 h-10 rounded-full mr-3"
      />

      {/* Name and Time */}
      <View className="flex-1">
        <Text
          numberOfLines={1}
          className="text-black dark:text-white text-lg font-semibold"
          style={{ maxWidth: maxNameWidth }}
        >
          {name}
        </Text>
        <Text className="text-sm text-gray-700 dark:text-gray-400">{time}</Text>
      </View>

      {/* Action Icons */}
      <View className="flex-row gap-5">
        <TouchableOpacity onPress={() => handleCallStart("video")}>
          <Video size={24} color={isDarkColorScheme ? "white" : "black"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCallStart("audio")}>
          <Phone size={23} color={isDarkColorScheme ? "white" : "black"} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MoreVertical
            size={24}
            color={isDarkColorScheme ? "white" : "black"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { ChatHeader };
