import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColorScheme } from "~/lib/useColorScheme";

interface ContactLogHeaderProps {
  // title?: string;
  // subtitle?: string;
  contactCount?: number;
  onSearch?: (query: string) => void;
}

export default function ContactLogHeader({
  // title,
  // subtitle,
  contactCount,
  onSearch,
}: ContactLogHeaderProps) {
  const router = useRouter();
  const { isDarkColorScheme } = useColorScheme();

  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchToggle = () => {
    setIsSearchMode(true);
  };

  const handleBackFromSearch = () => {
    setIsSearchMode(false);
    setSearchQuery("");
    onSearch?.("");
  };

  return (
    <View className="px-4 pt-10 pb-3 bg-white dark:bg-[#0e0c19] border-b border-gray-100 dark:border-gray-900">
      <View className="flex-row items-center justify-between">
        {/* Left section */}
        <View className="flex-row items-center space-x-3 flex-1">
          {!isSearchMode && (
            <TouchableOpacity
              onPress={
                isSearchMode ? handleBackFromSearch : () => router.back()
              }
              className="mr-3"
            >
              <ArrowLeft
                size={24}
                color={isDarkColorScheme ? "white" : "black"}
              />
            </TouchableOpacity>
          )}

          {isSearchMode ? (
            <View className="flex-row items-center bg-slate-200 dark:bg-gray-800 rounded-full px-4 py-1 flex-1">
              <TouchableOpacity onPress={handleBackFromSearch} className="mr-2">
                <ArrowLeft
                  size={22}
                  color={isDarkColorScheme ? "white" : "black"}
                />
              </TouchableOpacity>

              <TextInput
                autoFocus
                placeholder="Search name..."
                placeholderTextColor={isDarkColorScheme ? "#cccccc" : "#5e5d5d"}
                value={searchQuery}
                onChangeText={(text) => {
                  setSearchQuery(text);
                  onSearch?.(text);
                }}
                className="flex-1 text-[16px] dark:text-white text-black"
              />
            </View>
          ) : (
            <View>
              <Text className="text-black dark:text-white text-lg font-semibold">
                Select Contact
              </Text>
              <Text className="text-sm text-gray-700 dark:text-gray-400">
                {contactCount} contacts
              </Text>
            </View>
            // <View>
            //   <Text className="text-black dark:text-white text-lg font-semibold">
            //     {title || "Select Contact"}
            //   </Text>
            //   <Text className="text-sm text-gray-700 dark:text-gray-400">
            //     {subtitle || `${contactCount} contacts`}
            //   </Text>
            // </View>
          )}
        </View>

        {/* Right section */}
        {!isSearchMode && (
          <TouchableOpacity className="ml-2" onPress={handleSearchToggle}>
            <Feather
              name="search"
              size={22}
              color={isDarkColorScheme ? "white" : "black"}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
