import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { Search, X } from "lucide-react-native";
import { useColorScheme } from "~/lib/useColorScheme";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/store";
import { setSearchText } from "~/features/dashboard/dashboardSlice";

export function SearchBar() {
  const dispatch = useDispatch();
  const searchText = useSelector(
    (state: RootState) => state.dashboard.searchText
  );
  const { isDarkColorScheme } = useColorScheme();

  const handleChangeText = (text: string) => {
    dispatch(setSearchText(text));
  };

  const handleClear = () => {
    dispatch(setSearchText(""));
  };

  return (
    <View className="flex-row items-center rounded-full px-4 py-3 bg-slate-200 dark:bg-gray-800">
      <Search size={22} color={isDarkColorScheme ? "#ffffff" : "#000000"} />
      <TextInput
        className="flex-1 ml-2 text-lg text-black dark:text-white py-0"
        placeholder="Search here..."
        placeholderTextColor={isDarkColorScheme ? "#cccccc" : "#5e5d5d"}
        value={searchText}
        onChangeText={handleChangeText}
      />
      {searchText.length > 0 && (
        <TouchableOpacity onPress={handleClear}>
          <X size={22} color={isDarkColorScheme ? "#ffffff" : "#000000"} />
        </TouchableOpacity>
      )}
    </View>
  );
}
