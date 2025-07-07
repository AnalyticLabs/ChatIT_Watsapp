import { useRouter } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { setSelectedChatId } from "~/features/dashboard/dashboardSlice";

interface ChatProfileItem {
  id: string;
  name: string;
  time: string;
  message: string;
  avatar: string;
}

interface AllProfileProps {
  data: ChatProfileItem[];
}

export default function AllProfile({ data }: AllProfileProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChatScreen = (id: string) => {
    dispatch(setSelectedChatId(id));
    router.push("/chatscreen");
  };
  return (
    <SafeAreaView edges={["left", "right"]} className="flex-1">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 15 }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              className="w-full flex-row items-center justify-between mb-4 px-6"
              onPress={() => handleChatScreen(item.id)}
            >
              <Image
                source={{ uri: item.avatar }}
                className="w-11 h-11 rounded-full mr-3"
              />

              <View className="flex-1 border border-transparent">
                <View className="flex-row justify-between items-center">
                  <Text className="text-black dark:text-white font-medium text-[15px]">
                    {item.name}
                  </Text>
                  <Text className="text-gray-800 dark:text-gray-400 font-medium text-xs">
                    {item.time}
                  </Text>
                </View>

                <Text className="text-gray-800 dark:text-gray-400 font-medium text-xs">
                  {item.message}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}
