// import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import { useEffect } from "react";
// import { useColorScheme } from "~/lib/useColorScheme";
// import CallHistory from "~/components/CallHistory";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   setActiveTab,
//   setCalls,
//   setProfileData,
// } from "~/features/dashboard/dashboardSlice";
// import { RootState } from "~/store";
// import AllProfile from "~/components/AllProfile";
// import { getAllUsers } from "~/features/auth/authAction";
// import { useRouter } from "expo-router";

// export default function ChatDashboardScreen() {
//   const isDarkColorScheme = useColorScheme();
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const activeTab = useSelector(
//     (state: RootState) => state.dashboard.activeTab
//   );
//   const calls = useSelector((state: RootState) => state.dashboard.calls);
//   const profileData = useSelector(
//     (state: RootState) => state.dashboard.profileData
//   );

//   const searchText = useSelector(
//     (state: RootState) => state.dashboard.searchText
//   );

//   const filteredProfileData = profileData.filter((profile) =>
//     profile.name.toLowerCase().includes(searchText.toLowerCase())
//   );

//   const tabs: Array<"Chats" | "Status" | "Calls"> = [
//     "Chats",
//     "Status",
//     "Calls",
//   ];

//   const callHistoryData = [
//     {
//       id: "1",
//       name: "Wade Warren",
//       time: "12 minutes ago",
//       status: "missed",
//       avatar: "https://randomuser.me/api/portraits/men/32.jpg",
//       type: "audio",
//     },
//     {
//       id: "2",
//       name: "Jerome Bell",
//       time: "14 minutes ago",
//       status: "incoming",
//       avatar: "https://randomuser.me/api/portraits/men/12.jpg",
//       type: "video",
//     },
//     {
//       id: "3",
//       name: "Annette Black",
//       time: "15 minutes ago",
//       status: "incoming",
//       avatar: "https://randomuser.me/api/portraits/women/18.jpg",
//       type: "audio",
//     },
//     {
//       id: "4",
//       name: "Dianne Russell",
//       time: "20 minutes ago",
//       status: "missed",
//       avatar: "https://randomuser.me/api/portraits/women/65.jpg",
//       type: "video",
//     },
//     {
//       id: "5",
//       name: "Ralph Edwards",
//       time: "14 minutes ago",
//       status: "incoming",
//       avatar: "https://randomuser.me/api/portraits/men/45.jpg",
//       type: "audio",
//     },
//     {
//       id: "6",
//       name: "Ronald Richards",
//       time: "30 minutes ago",
//       status: "missed",
//       avatar: "https://randomuser.me/api/portraits/men/22.jpg",
//       type: "video",
//     },
//     {
//       id: "7",
//       name: "Darrell Steward",
//       time: "35 minutes ago",
//       status: "incoming",
//       avatar: "https://randomuser.me/api/portraits/men/54.jpg",
//       type: "audio",
//     },
//     {
//       id: "8",
//       name: "Arlene McCoy",
//       time: "40 minutes ago",
//       status: "missed",
//       avatar: "https://randomuser.me/api/portraits/women/29.jpg",
//       type: "video",
//     },
//     {
//       id: "9",
//       name: "Savannah Nguyen",
//       time: "45 minutes ago",
//       status: "incoming",
//       avatar: "https://randomuser.me/api/portraits/women/90.jpg",
//       type: "audio",
//     },
//     {
//       id: "10",
//       name: "Albert Flores",
//       time: "50 minutes ago",
//       status: "incoming",
//       avatar: "https://randomuser.me/api/portraits/men/78.jpg",
//       type: "video",
//     },
//     {
//       id: "11",
//       name: "Jenny Wilson",
//       time: "1 hour ago",
//       status: "missed",
//       avatar: "https://randomuser.me/api/portraits/women/55.jpg",
//       type: "audio",
//     },
//     {
//       id: "12",
//       name: "Floyd Miles",
//       time: "2 hours ago",
//       status: "incoming",
//       avatar: "https://randomuser.me/api/portraits/men/11.jpg",
//       type: "video",
//     },
//     {
//       id: "13",
//       name: "Cameron Williamson",
//       time: "3 hours ago",
//       status: "missed",
//       avatar: "https://randomuser.me/api/portraits/men/23.jpg",
//       type: "audio",
//     },
//     {
//       id: "14",
//       name: "Leslie Alexander",
//       time: "Yesterday",
//       status: "incoming",
//       avatar: "https://randomuser.me/api/portraits/women/40.jpg",
//       type: "video",
//     },
//     {
//       id: "15",
//       name: "Guy Hawkins",
//       time: "Yesterday",
//       status: "missed",
//       avatar: "https://randomuser.me/api/portraits/men/66.jpg",
//       type: "audio",
//     },
//   ];

//   const allProfileData = [
//     {
//       id: "1",
//       name: "Wade Warren",
//       time: "11:02 am",
//       message: "Ok",
//       avatar: "https://randomuser.me/api/portraits/men/32.jpg",
//     },
//     {
//       id: "2",
//       name: "Jerome Bell",
//       time: "11:03 am",
//       message: "Ok",
//       avatar: "https://randomuser.me/api/portraits/men/12.jpg",
//     },
//     {
//       id: "3",
//       name: "Annette Black",
//       time: "11:02 am",
//       message: "Ok",
//       avatar: "https://randomuser.me/api/portraits/women/18.jpg",
//     },
//     {
//       id: "4",
//       name: "Dianne Russell",
//       time: "11:02 am",
//       message: "Ok",
//       avatar: "https://randomuser.me/api/portraits/women/65.jpg",
//     },
//     {
//       id: "5",
//       name: "Ralph Edwards",
//       time: "11:02 am",
//       message: "Ok",
//       avatar: "https://randomuser.me/api/portraits/men/45.jpg",
//     },
//     {
//       id: "6",
//       name: "Ronald Richards",
//       time: "11:02 am",
//       message: "Ok",
//       avatar: "https://randomuser.me/api/portraits/men/22.jpg",
//     },
//     {
//       id: "7",
//       name: "Darrell Steward",
//       time: "11:02 am",
//       message: "Ok",
//       avatar: "https://randomuser.me/api/portraits/men/54.jpg",
//     },
//     {
//       id: "8",
//       name: "Arlene McCoy",
//       time: "11:02 am",
//       message: "Ok",
//       avatar: "https://randomuser.me/api/portraits/women/29.jpg",
//     },
//     {
//       id: "9",
//       name: "Savannah Nguyen",
//       time: "11:02 am",
//       message: "Ok",
//       avatar: "https://randomuser.me/api/portraits/women/90.jpg",
//     },
//     {
//       id: "10",
//       name: "Albert Flores",
//       time: "11:02 am",
//       message: "Ok",
//       avatar: "https://randomuser.me/api/portraits/men/78.jpg",
//     },
//     {
//       id: "11",
//       name: "Jenny Wilson",
//       time: "11:02 am",
//       message: "Ok",
//       avatar: "https://randomuser.me/api/portraits/women/55.jpg",
//     },
//     {
//       id: "12",
//       name: "Floyd Miles",
//       time: "11:02 am",
//       message: "Ok",
//       avatar: "https://randomuser.me/api/portraits/men/11.jpg",
//     },
//     {
//       id: "13",
//       name: "Cameron Williamson",
//       time: "11:02 am",
//       message: "Ok",
//       avatar: "https://randomuser.me/api/portraits/men/23.jpg",
//     },
//     {
//       id: "14",
//       name: "Leslie Alexander",
//       time: "11:02 am",
//       message: "Ok",
//       avatar: "https://randomuser.me/api/portraits/women/40.jpg",
//     },
//     {
//       id: "15",
//       name: "Guy Hawkins",
//       time: "11:02 am",
//       message: "Ok",
//       avatar: "https://randomuser.me/api/portraits/men/66.jpg",
//     },
//   ];

//   useEffect(() => {
//     dispatch(setCalls(callHistoryData));

//     const fetchUsers = async () => {
//       try {
//         const res: any = await dispatch<any>(getAllUsers());
//         const mappedData = res.map((user: any) => ({
//           id: user._id,
//           name: user.username,
//           message: user.about || "Hey there! I’m using ChatIt",
//           time: "Just now",
//           avatar: user.profilePicture,
//         }));
//         dispatch(setProfileData(mappedData));
//       } catch (err) {
//         console.error("Failed to fetch users:", err);
//       }
//     };

//     fetchUsers();
//   }, [dispatch]);

//   const getFabIcon = () => {
//     switch (activeTab) {
//       case "Chats":
//         return (
//           <TouchableOpacity
//             onPress={() => router.push("/contactlog")}
//             className="bg-blue-600 p-4 rounded-full shadow-md"
//           >
//             <Ionicons
//               name="chatbubble-ellipses-outline"
//               size={24}
//               color="#fff"
//             />
//           </TouchableOpacity>
//         );

//       case "Status":
//         return (
//           <View className="flex-row items-center gap-2">
//             <TouchableOpacity className="bg-gray-800 p-4 rounded-full shadow-md">
//               <MaterialCommunityIcons
//                 name="pencil-outline"
//                 size={24}
//                 color="#fff"
//               />
//             </TouchableOpacity>
//             <TouchableOpacity className="bg-blue-600 p-4 rounded-full shadow-md">
//               <Ionicons name="camera-outline" size={24} color="#fff" />
//             </TouchableOpacity>
//           </View>
//         );

//       case "Calls":
//         return (
//           <TouchableOpacity className="bg-blue-600 p-4 rounded-full shadow-md">
//             <Ionicons name="call-outline" size={24} color="#fff" />
//           </TouchableOpacity>
//         );

//       default:
//         return null;
//     }
//   };
//   return (
//     <SafeAreaView className="flex-1 bg-white dark:bg-[#0e0c19]">
//       {/* Top Tabs */}
//       <View
//         className="flex-row justify-between bg-white dark:bg-[#0e0c19] shadow-md"
//         style={{
//           shadowColor: isDarkColorScheme ? "#475569" : "#cbd5e1",
//           shadowOffset: { width: 0, height: 2 },
//           shadowOpacity: 0.2,
//           shadowRadius: 3.5,
//           elevation: 4,
//         }}
//       >
//         {tabs.map((tab) => (
//           <TouchableOpacity
//             key={tab}
//             onPress={() => dispatch(setActiveTab(tab))}
//             className="items-center px-8 pt-5"
//           >
//             <Text
//               className={`font-bold text-[17px] pb-1 ${
//                 activeTab === tab
//                   ? "text-blue-600 border-b-2 border-blue-600"
//                   : "text-black dark:text-white"
//               }`}
//             >
//               {tab}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Dynamic Content */}
//       <View className="flex-1">
//         {activeTab === "Chats" && (
//           <>
//             {Array.isArray(profileData) && profileData.length > 0 ? (
//               // <AllProfile data={profileData} />
//               <AllProfile data={filteredProfileData} />
//             ) : (
//               <View className="flex-1 justify-center items-center">
//                 <Text className="text-gray-400 dark:text-gray-500 text-[15px] font-semibold mb-3">
//                   You haven’t chatted yet
//                 </Text>
//                 <TouchableOpacity className="bg-blue-600 px-6 py-2 rounded-full">
//                   <Text className="text-white text-[15px] font-bold">
//                     Start Chatting
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           </>
//         )}

//         {activeTab === "Status" && (
//           <View className="flex-1 justify-center items-center">
//             <Text className="text-gray-400 dark:text-gray-500 text-[15px] font-semibold">
//               No status updates yet
//             </Text>
//           </View>
//         )}

//         {activeTab === "Calls" && (
//           <>
//             {Array.isArray(calls) && calls.length > 0 ? (
//               <CallHistory data={calls} />
//             ) : (
//               <View className="flex-1 justify-center items-center">
//                 <Text className="text-gray-400 dark:text-gray-500 text-[15px] font-semibold mb-3">
//                   You haven’t called yet
//                 </Text>
//                 <TouchableOpacity className="bg-blue-600 px-6 py-2 rounded-full">
//                   <Text className="text-white text-[15px] font-bold">
//                     Start Call
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           </>
//         )}
//       </View>

//       {/* Floating Action Button */}
//       {activeTab && (
//         <View
//           className={`absolute bottom-8 right-5 ${
//             activeTab === "Status" ? "flex-row gap-4" : ""
//           }`}
//         >
//           {getFabIcon()}
//         </View>
//       )}
//     </SafeAreaView>
//   );
// }

import React, { useEffect } from "react";
import { View, SafeAreaView, TouchableOpacity, Text } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "~/store";
import { useRouter } from "expo-router";
import AllProfile from "~/components/AllProfile";
import CallHistory from "~/components/CallHistory";
import { loadDashboardData } from "~/features/dashboard/dashboardActions";
import {
  setActiveTab,
  setIsMoreDetailsOpen,
} from "~/features/dashboard/dashboardSlice";
import { RootState } from "~/store";
import { useColorScheme } from "~/lib/useColorScheme";

export default function ChatDashboardScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const isDarkColorScheme = useColorScheme();

  const activeTab = useSelector((s: RootState) => s.dashboard.activeTab);
  const calls = useSelector((s: RootState) => s.dashboard.calls);
  const profileData = useSelector((s: RootState) => s.dashboard.profileData);
  const groups = useSelector((s: RootState) => s.dashboard.groups);
  const searchText = useSelector((s: RootState) => s.dashboard.searchText);

  const tabs: Array<"Chats" | "Status" | "Calls"> = [
    "Chats",
    "Status",
    "Calls",
  ];

  useEffect(() => {
    dispatch(loadDashboardData());
  }, [dispatch]);

  const mergedChats = [
    ...groups.filter((g) =>
      g.name.toLowerCase().includes(searchText.toLowerCase())
    ),
    ...profileData.filter((u) =>
      u.name.toLowerCase().includes(searchText.toLowerCase())
    ),
  ];

  const getFabIcon = () => {
    switch (activeTab) {
      case "Chats":
        return (
          <TouchableOpacity
            onPress={() => router.push("/contactlog")}
            className="bg-blue-600 p-4 rounded-full shadow-md"
          >
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        );
      case "Status":
        return (
          <View className="flex-row items-center gap-2">
            <TouchableOpacity className="bg-gray-800 p-4 rounded-full shadow-md">
              <MaterialCommunityIcons
                name="pencil-outline"
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
            <TouchableOpacity className="bg-blue-600 p-4 rounded-full shadow-md">
              <Ionicons name="camera-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        );
      case "Calls":
        return (
          <TouchableOpacity className="bg-blue-600 p-4 rounded-full shadow-md">
            <Ionicons name="call-outline" size={24} color="#fff" />
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  const isMoreDetailsOpen = useSelector(
    (state: RootState) => state.dashboard.isMoreDetailsOpen
  );

  return (
    <SafeAreaView
      onTouchStart={() => {
        if (isMoreDetailsOpen) {
          dispatch(setIsMoreDetailsOpen(false));
        }
      }}
      className="flex-1 bg-white dark:bg-[#0e0c19]"
    >
      {/* Top Tabs */}
      <View
        className="flex-row justify-between bg-white dark:bg-[#0e0c19] shadow-md"
        style={{
          shadowColor: isDarkColorScheme ? "#475569" : "#cbd5e1",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3.5,
          elevation: 4,
        }}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => dispatch(setActiveTab(tab))}
            className="items-center px-8 pt-5"
          >
            <Text
              className={`font-bold text-[17px] pb-1 ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-black dark:text-white"
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Dynamic Content */}
      <View className="flex-1">
        {activeTab === "Chats" && (
          <>
            {Array.isArray(mergedChats) && mergedChats.length > 0 ? (
              <AllProfile data={mergedChats} />
            ) : (
              <View className="flex-1 justify-center items-center">
                <Text className="text-gray-400 dark:text-gray-500 text-[15px] font-semibold mb-3">
                  You haven’t chatted yet
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/contactlog")}
                  className="bg-blue-600 px-6 py-2 rounded-full"
                >
                  <Text className="text-white text-[15px] font-bold">
                    Start Chatting
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}

        {activeTab === "Status" && (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-400 dark:text-gray-500 text-[15px] font-semibold">
              No status updates yet
            </Text>
          </View>
        )}

        {activeTab === "Calls" && (
          <>
            {Array.isArray(calls) && calls.length > 0 ? (
              <CallHistory data={calls} />
            ) : (
              <View className="flex-1 justify-center items-center">
                <Text className="text-gray-400 dark:text-gray-500 text-[15px] font-semibold mb-3">
                  You haven’t called yet
                </Text>
                <TouchableOpacity className="bg-blue-600 px-6 py-2 rounded-full">
                  <Text className="text-white text-[15px] font-bold">
                    Start Call
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>

      {/* Floating Action Button */}
      {activeTab && (
        <View
          className={`absolute bottom-8 right-5 ${
            activeTab === "Status" ? "flex-row gap-4" : ""
          }`}
        >
          {getFabIcon()}
        </View>
      )}
    </SafeAreaView>
  );
}
