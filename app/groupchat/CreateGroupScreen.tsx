import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import { router } from "expo-router";
import { createGroupAPI } from "~/api/groupChatApi";
import mime from "mime";
import { Camera, Users } from "lucide-react-native";
import { useColorScheme } from "~/lib/useColorScheme";
import { hideToast, showError } from "~/utils/toast";
import * as ImageManipulator from "expo-image-manipulator";

export default function CreateGroupScreen() {
  const profileData = useSelector(
    (state: RootState) => state.dashboard.profileData
  );
  const authUser = useSelector((state: RootState) => state.auth.user);
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [groupImage, setGroupImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleSelectMember = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((mid) => mid !== id) : [...prev, id]
    );
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        // ✅ Resize & compress image
        const compressed = await ImageManipulator.manipulateAsync(
          uri,
          [{ resize: { width: 1000 } }], // Resize to 1000px width (adjustable)
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );
        setGroupImage(compressed.uri);
      }
    } catch (error) {
      hideToast();

      const errorMessage =
        error && typeof error === "object" && "message" in error
          ? (error as any).message
          : "Something went wrong";
      showError("Failed to send pick image", errorMessage);
    }
  };

  const handleCreateGroup = async () => {
    if (!groupName || selectedMembers.length < 2) {
      showError("Invalid Group Details", "Please enter a valid details");
      return;
    }

    const formData = new FormData();
    formData.append("name", groupName);
    formData.append("admin", authUser._id);

    selectedMembers.forEach((memberId) => {
      formData.append("members", memberId);
    });

    if (groupImage) {
      const fileInfo = await FileSystem.getInfoAsync(groupImage);
      const mimeType = mime.getType(fileInfo.uri) || "image/jpeg";
      formData.append("profilePicture", {
        uri: fileInfo.uri,
        name: fileInfo.uri.split("/").pop(),
        type: mimeType,
      } as any);
    }

    try {
      setLoading(true);
      await createGroupAPI(formData);
      router.replace(`/dashboard`);
    } catch (error) {
      hideToast();

      const errorMessage =
        error && typeof error === "object" && "message" in error
          ? (error as any).message
          : "Something went wrong";
      showError("Failed to create Group", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const { isDarkColorScheme } = useColorScheme();

  return (
    <View className="flex-1 bg-white dark:bg-[#0e0c19] px-6 pt-10">
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
          paddingBottom: 30,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-2xl font-bold text-black dark:text-white mb-6">
          Create New Group
        </Text>

        <TouchableOpacity onPress={pickImage} className="mb-5">
          {groupImage ? (
            <Image
              source={{ uri: groupImage }}
              className="w-28 h-28 rounded-full border-2 border-blue-500"
            />
          ) : (
            <View className="relative w-28 h-28">
              <View className="w-full h-full rounded-full bg-gray-300 dark:bg-gray-600 items-center justify-center">
                <Users
                  size={40}
                  color={isDarkColorScheme ? "white" : "#4B5563"}
                />
              </View>

              <View className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white dark:bg-black border border-gray-300 items-center justify-center shadow-md">
                <Camera
                  size={16}
                  color={isDarkColorScheme ? "white" : "#4B5563"}
                />
              </View>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          value={groupName}
          onChangeText={setGroupName}
          placeholder="Enter group name"
          placeholderTextColor="#999"
          className="w-full border border-gray-400 rounded-lg px-4 py-3 mb-6 text-black dark:text-white bg-white dark:bg-[#1e1b2e]"
        />

        <Text className="text-base font-semibold mb-3 text-gray-600 dark:text-gray-300 self-start">
          Select Members
        </Text>

        <View className="w-full mb-6">
          {profileData.map((user) => (
            <TouchableOpacity
              key={user.id}
              onPress={() => toggleSelectMember(user.id)}
              className={`flex-row items-center py-1 px-2 rounded-lg mb-2 ${
                selectedMembers.includes(user.id)
                  ? "bg-blue-100 dark:bg-blue-900"
                  : "bg-transparent"
              }`}
            >
              <Image
                source={{ uri: user.avatar }}
                className="w-10 h-10 rounded-full mr-3"
              />
              <Text className="text-[16px] text-black dark:text-white flex-1">
                {user.name}
              </Text>
              {selectedMembers.includes(user.id) && (
                <Text className="text-blue-600 font-bold">✔</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={handleCreateGroup}
          disabled={loading || !groupName || selectedMembers.length < 2}
          className={`w-full rounded-full py-4 items-center shadow-md ${
            loading
              ? "bg-blue-800"
              : !groupName || selectedMembers.length < 2
              ? "bg-gray-400"
              : "bg-blue-600"
          }`}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text className="text-white font-bold text-base">Create Group</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
