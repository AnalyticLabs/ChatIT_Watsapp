import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { ChevronsDown } from "lucide-react-native";
import { ChatHeader } from "~/components/ChatHeader";
import { router } from "expo-router";
import { ChatInputBox } from "~/components/ChatInputBox";
import { useRef, useState } from "react";

export default function GroupChatScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  const handleScroll = (event: any) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;

    const isNearBottom = yOffset + layoutHeight >= contentHeight - 100;

    setShowScrollToBottom(!isNearBottom);
  };

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
    setShowScrollToBottom(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#0e0c19]">
      {/* Header */}
      <ChatHeader
        name="Wybble Team"
        time="10:34 AM"
        imageUrl={require("../../assets/images/wybble-team.png")}
        onBack={() => router.back()}
        isGroup={true}
        baseRoute="/groupcall"
      />

      {/* Chat Body */}
      <View className="flex-1">
        <ScrollView
          ref={scrollViewRef}
          className="px-2 py-2 space-y-2"
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {/* Date Separator */}
          <View className="self-center bg-[#1f2c34] px-3 py-1 rounded-full my-2">
            <Text className="text-white text-xs">March 20, 2025</Text>
          </View>

          {/* Sent Message */}
          <View className="self-end mb-3 mr-3 bg-blue-600 rounded-xl px-4 py-2 max-w-[80%]">
            <Text className="text-white text-base">Hii 🥲</Text>
            <Text className="text-right text-gray-100 text-sm mt-1">
              7:47 PM
            </Text>
          </View>

          {/* Received Message */}
          <View className="self-start mb-3 ml-3 bg-[#202c33] px-4 py-2 max-w-[80%] rounded-tr-xl rounded-tl-xl rounded-br-xl rounded-bl-md">
            <Text className="text-white text-base">Helloo</Text>
            <Text className="text-right text-gray-400 text-xm mt-1">
              7:48 PM
            </Text>
          </View>
        </ScrollView>

        {/* Scroll to Bottom Button */}
        {showScrollToBottom && (
          <TouchableOpacity
            onPress={scrollToBottom}
            className="absolute bottom-4 right-4 bg-gray-800 p-2 rounded-full"
          >
            <ChevronsDown size={24} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      {/* Input Field */}
      <View className="bg-[#0B141A]">
        <ChatInputBox />
      </View>
    </SafeAreaView>
  );
}
