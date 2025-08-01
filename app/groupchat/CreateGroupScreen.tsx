import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import { router } from "expo-router";
import { createGroupAPI } from "~/api/groupChatApi";
import mime from "mime"; // install if not already: npm install mime

export default function CreateGroupScreen() {
  const profileData = useSelector((state: RootState) => state.dashboard.profileData);
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
        setGroupImage(uri);
      }
    } catch (error) {
      Alert.alert("Image Picker Error", "Failed to pick image.");
    }
  };

  const handleCreateGroup = async () => {
    if (!groupName || selectedMembers.length < 2) {
      Alert.alert("Group name & 2+ members required.");
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
      const group = await createGroupAPI(formData);
      Alert.alert("Group Created", group.name);
      router.replace(`/contactlog`);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : typeof error === "string"
          ? error
          : "Unknown error";
      Alert.alert("Failed to create group", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-[#0e0c19] px-5 pt-6">
      <Text className="text-lg font-bold text-black dark:text-white mb-3">
        Create New Group
      </Text>

      <TouchableOpacity
        onPress={pickImage}
        className="items-center justify-center mb-4"
      >
        {groupImage ? (
          <Image
            source={{ uri: groupImage }}
            className="w-24 h-24 rounded-full"
          />
        ) : (
          <View className="w-24 h-24 rounded-full bg-gray-300 items-center justify-center">
            <Text className="text-gray-700 dark:text-gray-900">Add Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        value={groupName}
        onChangeText={setGroupName}
        placeholder="Enter group name"
        className="border rounded-md p-3 mb-4 bg-black dark:bg-white text-white dark:text-black"
      />

      <Text className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-300">
        Select Members
      </Text>

      <ScrollView className="mb-4">
        {profileData.map((user) => (
          <TouchableOpacity
            key={user.id}
            onPress={() => toggleSelectMember(user.id)}
            className="flex-row items-center py-2"
          >
            <Image
              source={{ uri: user.avatar }}
              className="w-10 h-10 rounded-full mr-3"
            />
            <Text className="text-black dark:text-white text-[16px] flex-1">
              {user.name}
            </Text>
            {selectedMembers.includes(user.id) && (
              <Text className="text-blue-600 font-bold">✔</Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        onPress={handleCreateGroup}
        disabled={loading || !groupName || selectedMembers.length < 2}
        className={`${
          loading || !groupName || selectedMembers.length < 2
            ? "bg-gray-400"
            : "bg-blue-600"
        } rounded-full py-3 items-center`}
      >
        <Text className="text-white font-bold">
          {loading ? "Creating..." : "Create Group"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
