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

interface ChatHeaderProps {
  name: string;
  imageUrl?: string | number;
  time: string;
  onBack: () => void;
  isGroup?: boolean;
  baseRoute?: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  name,
  imageUrl,
  time,
  onBack,
  isGroup = false,
  baseRoute,
}) => {
  const { width } = useWindowDimensions();
  const maxNameWidth = width - 170;

  const { isDarkColorScheme } = useColorScheme();

  const router = useRouter();

  const routeBase = baseRoute || "/call";

  const handleVideoClick = () => {
    const callType = isGroup ? "groupvideo" : "video";
    router.push({
      pathname: routeBase as "/call" | "/groupcall",
      params: { type: callType },
    });
  };

  const handleCallClick = () => {
    const callType = isGroup ? "groupcall" : "call";
    router.push({
      pathname: routeBase as "/call" | "/groupcall",
      params: { type: callType },
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
        <TouchableOpacity onPress={handleVideoClick}>
          <Video size={24} color={isDarkColorScheme ? "white" : "black"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCallClick}>
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
