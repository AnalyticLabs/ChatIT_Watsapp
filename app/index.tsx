import { View, Text, Animated, Pressable, Linking } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isPressed, setIsPressed] = useState(false);
  const router = useRouter();

  const chatit = require("../assets/images/Chatit.png");

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleStartChatting = () => {
    router.push("/login");
  };

  return (
    <View className="flex-1 bg-white dark:bg-[#0e0c19] px-4 pt-10 pb-6">
      {/* Main Centered Content */}
      <View className="flex-1 justify-center items-center">
        <Animated.Image
          source={chatit}
          className="w-40 h-40"
          style={{ opacity: fadeAnim }}
          resizeMode="cover"
        />
        <Text className="text-3xl font-bold text-foreground text-center">
          Welcome to ChatIt
        </Text>

        <Pressable
          onPress={handleStartChatting}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          className={`mt-6 px-4 py-2 rounded-full ${
            isPressed ? "bg-blue-400" : "bg-blue-600"
          }`}
        >
          <Text className="text-white text-base font-semibold">
            Let's Start Chatting! 🚀
          </Text>
        </Pressable>
      </View>

      {/* Footer at the Bottom */}
      <View className="items-center">
        <View className="flex-row items-center gap-1 flex-wrap">
          <Text className="text-gray-500 dark:text-gray-400 font-semibold text-lg">
            &copy; 2025
          </Text>

          <Text
            onPress={() => Linking.openURL("https://wybbleai.com/")}
            className="text-blue-600 font-semibold text-lg"
          >
            WybbleAI.
          </Text>

          <Text className="text-gray-500 dark:text-gray-400 font-semibold text-lg">
            All rights reserved.
          </Text>
        </View>
      </View>
    </View>
  );
}
