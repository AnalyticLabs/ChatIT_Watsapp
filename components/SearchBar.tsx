import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { Search, X } from "lucide-react-native";
import { useColorScheme } from "~/lib/useColorScheme";

export function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const { isDarkColorScheme } = useColorScheme();

  return (
    <View className="flex-row items-center rounded-full px-4 py-3 bg-slate-200 dark:bg-gray-800">
      <Search size={22} color={isDarkColorScheme ? "#ffffff" : "#000000"} />
      <TextInput
        className="flex-1 ml-2 text-lg text-black dark:text-white py-0"
        placeholder="Search here..."
        placeholderTextColor={isDarkColorScheme ? "#cccccc" : "#5e5d5d"}
        value={searchText}
        onChangeText={setSearchText}
      />
      {searchText.length > 0 && (
        <TouchableOpacity onPress={() => setSearchText("")}>
          <X size={22} color={isDarkColorScheme ? "#ffffff" : "#000000"} />
        </TouchableOpacity>
      )}
    </View>
  );
}
