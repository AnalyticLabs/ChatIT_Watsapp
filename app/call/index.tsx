import { SafeAreaView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import IncomingCall from "~/components/IncomingCall";
import IncomingVideo from "~/components/IncomingVideo";

export default function CallScreen() {
  const { type, id } = useLocalSearchParams();
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#0e0c19]">
      {type === "video" ? (
        <IncomingVideo id={id as string} />
      ) : (
        <IncomingCall id={id as string} />
      )}
    </SafeAreaView>
  );
}
