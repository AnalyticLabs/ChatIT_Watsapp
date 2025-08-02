// import { useRouter } from "expo-router";
// import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useDispatch } from "react-redux";
// import { setSelectedChatId } from "~/features/dashboard/dashboardSlice";

// interface ChatProfileItem {
//   id: string;
//   name: string;
//   time: string;
//   message: string;
//   avatar: string;
// }

// interface AllProfileProps {
//   data: (ChatProfileItem & { isGroup?: boolean })[];
// }

// export default function AllProfile({ data }: AllProfileProps) {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const handleChatScreen = (id: string) => {
//     dispatch(setSelectedChatId(id));
//     router.push("/chatscreen");
//   };
//   return (
//     <SafeAreaView edges={["left", "right"]} className="flex-1">
//       <FlatList
//         data={data}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={{ paddingVertical: 15 }}
//         renderItem={({ item }) => {
//           return (
//             <TouchableOpacity
//               className="w-full flex-row items-center justify-between mb-4 px-6"
//               onPress={() => handleChatScreen(item.id)}
//             >
//               <Image
//                 source={{ uri: item.avatar }}
//                 className="w-11 h-11 rounded-full mr-3"
//               />

//               <View className="flex-1 border border-transparent">
//                 <View className="flex-row justify-between items-center">
//                   <Text className="text-black dark:text-white font-medium text-[15px]">
//                     {item.name}
//                   </Text>
//                   <Text className="text-gray-800 dark:text-gray-400 font-medium text-xs">
//                     {item.time}
//                   </Text>
//                 </View>

//                 <Text className="text-gray-800 dark:text-gray-400 font-medium text-xs">
//                   {item.message}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           );
//         }}
//       />
//     </SafeAreaView>
//   );
// }



import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { setSelectedChatId } from "~/features/dashboard/dashboardSlice";

export interface ChatProfileItem {
  id: string;
  name: string;
  time: string;
  message: string;
  avatar: string;
  isGroup?: boolean;
  createdAt?: string;
}

interface AllProfileProps {
  data: ChatProfileItem[];
}

export default function AllProfile({ data }: AllProfileProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleNavigate = (item: ChatProfileItem) => {
    dispatch(setSelectedChatId(item.id));
    if (item.isGroup) {
      router.push({ pathname: "/groupchat/[id]", params: { id: item.id } });
    } else {
      router.push({ pathname: "/chatscreen", params: { id: item.id } });
    }
  };

  const renderItem = ({ item }: { item: ChatProfileItem }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => handleNavigate(item)}
      className="flex-row items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700"
    >
      <Image
        source={{
                uri: item.avatar
                  // ? item.avatar
                  // : `https://randomuser.me/api/portraits/men/${1}.jpg`
              }}
        className="w-12 h-12 rounded-full mr-3"
      />
      <View className="flex-1">
        <View className="flex-row justify-between">
          <Text className="text-[16px] font-semibold text-black dark:text-white">
            {item.name}
          </Text>
          {item.isGroup && (
            <Text className="text-xs text-blue-600 font-medium border px-2 py-1 rounded-3xl border-blue-400">Group</Text>
          )}
          <Text className="text-xs text-gray-500">
            {item.time || new Date(item.createdAt || "").toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
          </Text>
        </View>
        <Text className="text-sm text-gray-600 dark:text-gray-400" numberOfLines={1}>
          {item.message}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView edges={["left", "right"]} className="flex-1 bg-white dark:bg-black">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}
