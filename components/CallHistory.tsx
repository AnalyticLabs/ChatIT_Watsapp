import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Check,
  Phone,
  Video,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "~/lib/useColorScheme";
import { useDispatch, useSelector } from "react-redux";
import { toggleSelectCall } from "~/features/dashboard/dashboardSlice";
import { RootState } from "~/store";

interface CallItem {
  id: string;
  name: string;
  time: string;
  status: string;
  avatar: string;
  type: string;
}

interface CallHistoryProps {
  data: CallItem[];
}

export default function CallHistory({ data }: CallHistoryProps) {
  const { isDarkColorScheme } = useColorScheme();
  const dispatch = useDispatch();
  const selectedIds = useSelector(
    (state: RootState) => state.dashboard.selectedCallIds
  );

  return (
    <SafeAreaView edges={["left", "right"]} className="flex-1">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 15 }}
        renderItem={({ item }) => {
          const isSelected = selectedIds.includes(item.id);
          return (
            <TouchableOpacity
              onPress={() => dispatch(toggleSelectCall(item.id))}
              className={`w-full flex-row items-center justify-between mb-4 ${
                isSelected ? "bg-blue-900/50 rounded-lg px-6 py-3" : "px-6"
              }`}
            >
              <View className="flex-row items-center">
                <View className="mr-3">
                  <Image
                    source={{ uri: item.avatar }}
                    className="w-11 h-11 rounded-full"
                  />
                  {isSelected && (
                    <View className="absolute -bottom-1 -right-1 bg-green-600 rounded-full p-0.5">
                      <Check size={14} color="white" strokeWidth={3} />
                    </View>
                  )}
                </View>
                <View>
                  <Text className="text-black dark:text-white font-medium text-[15px] mb-0.5">
                    {item.name}
                  </Text>
                  <View className="flex-row items-center">
                    {item.status === "missed" ? (
                      <ArrowUpRight size={15} color="#ef4444" strokeWidth={3} />
                    ) : (
                      <ArrowDownLeft
                        size={15}
                        color="#22c55e"
                        strokeWidth={3}
                      />
                    )}
                    <Text className="text-gray-400 text-xs ml-1">
                      {item.time}
                    </Text>
                  </View>
                </View>
              </View>

              <View className="p-2 rounded-lg active:opacity-80">
                {item.type === "audio" ? (
                  <Phone
                    size={20}
                    color={isDarkColorScheme ? "white" : "black"}
                  />
                ) : (
                  <Video
                    size={20}
                    color={isDarkColorScheme ? "white" : "black"}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}
