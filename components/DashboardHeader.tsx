// import { View, Text } from "react-native";
// import { MoreDetails } from "~/components/MoreDetails";
// import { SearchBar } from "~/components/SearchBar";
// import { useColorScheme } from "~/lib/useColorScheme";
// import { useSelector } from "react-redux";
// import { RootState } from "~/store";

// export const DashboardHeader = () => {
//   const { isDarkColorScheme } = useColorScheme();
//   const activeTab = useSelector(
//     (state: RootState) => state.dashboard.activeTab
//   );

//   const getTitle = () => {
//     switch (activeTab) {
//       case "Chats":
//         return "ChatIt";
//       case "Status":
//         return "Status";
//       case "Calls":
//         return "Calls";
//       default:
//         return "ChatIt";
//     }
//   };

//   const shouldShowSearchBar = activeTab === "Chats";
//   return (
//     <View
//       className="px-5 pt-12 pb-1"
//       style={{ backgroundColor: isDarkColorScheme ? "#0e0c19" : "#ffffff" }}
//     >
//       <View className="flex-row justify-between items-center mb-4">
//         <Text
//           className="text-[22px] font-bold"
//           style={{ color: isDarkColorScheme ? "#ffffff" : "#000000" }}
//         >
//           {getTitle()}
//         </Text>
//         <View className="flex-row items-center">
//           <MoreDetails />
//         </View>
//       </View>

//       {shouldShowSearchBar && <SearchBar />}
//     </View>
//   );
// };

// import { View, Text, TouchableOpacity } from "react-native";
// import { Trash2 } from "lucide-react-native";
// import { MoreDetails } from "~/components/MoreDetails";
// import { SearchBar } from "~/components/SearchBar";
// import { useColorScheme } from "~/lib/useColorScheme";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "~/store";
// import {
//   deleteSelectedCalls,
//   clearSelectedCalls,
// } from "~/features/dashboard/dashboardSlice";

// export const DashboardHeader = () => {
//   const { isDarkColorScheme } = useColorScheme();
//   const dispatch = useDispatch();
//   const activeTab = useSelector(
//     (state: RootState) => state.dashboard.activeTab
//   );
//   const selectedCount = useSelector(
//     (state: RootState) => state.dashboard.selectedCallIds.length
//   );

//   const handleDelete = () => {
//     dispatch(deleteSelectedCalls());
//   };

//   const getTitle = () => {
//     if (activeTab === "Calls" && selectedCount > 0) {
//       return `${selectedCount}`;
//     }
//     switch (activeTab) {
//       case "Chats":
//         return "ChatIt";
//       case "Status":
//         return "Status";
//       case "Calls":
//         return "Calls";
//       default:
//         return "ChatIt";
//     }
//   };

//   const shouldShowSearchBar = activeTab === "Chats";

//   return (
//     <View
//       className="px-5 pt-12 pb-1"
//       style={{ backgroundColor: isDarkColorScheme ? "#0e0c19" : "#ffffff" }}
//     >
//       <View className="flex-row justify-between items-center mb-4">
//         <Text
//           className="text-[22px] font-bold"
//           style={{ color: isDarkColorScheme ? "#ffffff" : "#000000" }}
//         >
//           {getTitle()}
//         </Text>
//         <View className="flex-row items-center">
//           {activeTab === "Calls" && selectedCount > 0 ? (
//             <TouchableOpacity onPress={handleDelete}>
//               <Trash2
//                 size={22}
//                 color={isDarkColorScheme ? "#ffffff" : "#000000"}
//               />
//             </TouchableOpacity>
//           ) : (
//             <MoreDetails />
//           )}
//         </View>
//       </View>
//       {shouldShowSearchBar && <SearchBar />}
//     </View>
//   );
// };

import { View, Text, TouchableOpacity } from "react-native";
import { Trash2 } from "lucide-react-native";
import { ChevronLeft, ArrowLeft } from "lucide-react-native"; // Import arrow icon
import { MoreDetails } from "~/components/MoreDetails";
import { SearchBar } from "~/components/SearchBar";
import { useColorScheme } from "~/lib/useColorScheme";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "~/store";
import {
  deleteSelectedCalls,
  clearSelectedCalls,
  setIsMoreDetailsOpen,
} from "~/features/dashboard/dashboardSlice";

export const DashboardHeader = () => {
  const { isDarkColorScheme } = useColorScheme();
  const dispatch = useDispatch();
  const activeTab = useSelector(
    (state: RootState) => state.dashboard.activeTab
  );
  const selectedCount = useSelector(
    (state: RootState) => state.dashboard.selectedCallIds.length
  );

  const handleDelete = () => {
    dispatch(deleteSelectedCalls());
  };

  const handleBack = () => {
    dispatch(clearSelectedCalls());
  };

  const getTitle = () => {
    if (activeTab === "Calls" && selectedCount > 0) {
      return `${selectedCount}`;
    }
    switch (activeTab) {
      case "Chats":
        return "ChatIt";
      case "Status":
        return "Status";
      case "Calls":
        return "Calls";
      default:
        return "ChatIt";
    }
  };

  const shouldShowSearchBar = activeTab === "Chats";

  const isMoreDetailsOpen = useSelector(
    (state: RootState) => state.dashboard.isMoreDetailsOpen
  );

  return (
    <View
      className="px-5 pt-12 pb-1"
      style={{ backgroundColor: isDarkColorScheme ? "#0e0c19" : "#ffffff" }}
    >
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center">
          {activeTab === "Calls" && selectedCount > 0 && (
            <TouchableOpacity
              onPress={handleBack}
              className="mr-2 mt-1"
              activeOpacity={0.7}
            >
              <ArrowLeft
                size={24}
                color={isDarkColorScheme ? "white" : "black"}
              />
            </TouchableOpacity>
          )}
          <Text
            className="text-[22px] font-bold"
            style={{ color: isDarkColorScheme ? "#ffffff" : "#000000" }}
          >
            {getTitle()}
          </Text>
        </View>
        <View className="flex-row items-center">
          {activeTab === "Calls" && selectedCount > 0 ? (
            <TouchableOpacity onPress={handleDelete}>
              <Trash2
                size={22}
                color={isDarkColorScheme ? "#ffffff" : "#000000"}
              />
            </TouchableOpacity>
          ) : (
            <MoreDetails
              isOpen={isMoreDetailsOpen}
              setIsOpen={(val: boolean) => dispatch(setIsMoreDetailsOpen(val))}
            />
          )}
        </View>
      </View>
      {shouldShowSearchBar && <SearchBar />}
    </View>
  );
};
