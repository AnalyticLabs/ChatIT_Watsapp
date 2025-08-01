import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function OngoingVideoCall() {
  const { id } = useLocalSearchParams();

  return (
    <View className="flex-1 justify-center items-center bg-black">
      <Text className="text-white text-lg font-bold">Ongoing Video Call</Text>
      <Text className="text-white">User ID: {id}</Text>
    </View>
  );
}
