import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native";
import IncomingGroupCall from "~/components/IncomingGroupCall";
import IncomingGroupVideo from "~/components/IncomingGroupVideo";

export default function GroupCallScreen() {
  const { type } = useLocalSearchParams();
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#0e0c19]">
      {type === "groupvideo" ? <IncomingGroupVideo /> : <IncomingGroupCall />}
    </SafeAreaView>
  );
}
