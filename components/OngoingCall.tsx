import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function OngoingCall() {
  const { id } = useLocalSearchParams();

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-lg font-bold">Ongoing Audio Call</Text>
      <Text>User ID: {id}</Text>
    </View>
  );
}
