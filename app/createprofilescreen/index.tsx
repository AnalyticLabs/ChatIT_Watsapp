import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { clsx } from "clsx";
import { ScrollView } from "react-native";
import { router } from "expo-router";
import { Checkbox } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/store";
import { createProfile } from "~/features/auth/authAction";
import { hideToast, showError } from "~/utils/toast";
import { Image as RNImage } from "react-native";

const avatars = [
  require("../../assets/images/avatar1.png"),
  require("../../assets/images/avatar2.png"),
  require("../../assets/images/avatar3.png"),
  require("../../assets/images/avatar4.png"),
  require("../../assets/images/avatar5.png"),
];

export default function CreateProfileScreen() {
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [agreed, setAgreed] = useState(false);

  const dispatch = useDispatch();
  const { createProfileLoading } = useSelector(
    (state: RootState) => state.auth
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [4, 3],
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setCustomImage(result.assets[0].uri);
    }
  };

  const handleCreateProfile = async () => {
    if (!username || !agreed) return;

    try {
      await dispatch<any>(
        createProfile({
          username,
          agreed,
          profileImage:
            customImage ?? RNImage.resolveAssetSource(selectedAvatar).uri,
        })
      );

      router.replace("/dashboard");
    } catch (err: any) {
      hideToast();

      const errorMessage =
        err && typeof err === "object" && "message" in err
          ? (err as any).message
          : "Something went wrong";
      showError("Failed to creating Profile", errorMessage);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      className="bg-white dark:bg-[#0e0c19] p-6"
    >
      <View className="items-center space-y-3">
        <TouchableOpacity onPress={pickImage}>
          {customImage ? (
            <Image
              source={{ uri: customImage }}
              className="w-24 h-24 rounded-full border-4 border-blue-600"
            />
          ) : (
            <Image
              source={selectedAvatar}
              className="w-24 h-24 rounded-full border-4 border-blue-600"
            />
          )}
          <View className="absolute bottom-0 right-0 bg-white p-1 rounded-full border border-blue-600">
            <Text className="text-blue-600 font-bold">+</Text>
          </View>
        </TouchableOpacity>

        <Text className="text-lg my-2 font-semibold dark:text-gray-200 text-gray-700">
          Choose an avatar
        </Text>

        <View className="flex-row space-x-3">
          {avatars.map((avatar, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedAvatar(avatar);
                setCustomImage(null);
              }}
              className={clsx(
                "p-1 rounded-full",
                selectedAvatar === avatar &&
                  !customImage &&
                  "border-4 border-blue-600"
              )}
            >
              <Image source={avatar} className="w-12 h-12 rounded-full" />
            </TouchableOpacity>
          ))}
        </View>

        <View className="w-full">
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            className="border placeholder:text-gray-400 dark:text-white border-blue-600 px-4 py-3 rounded-lg mt-4"
          />
        </View>

        <View className="flex-row items-center space-x-2 mt-4">
          <Checkbox
            status={agreed ? "checked" : "unchecked"}
            onPress={() => setAgreed(!agreed)}
            color="#2563EB"
            uncheckedColor="#D1D5DB"
          />
          <Text className="mb-0.5 dark:text-white text-black">
            I agree to the{" "}
            <Text className="text-blue-600 font-semibold">
              Terms and Conditions
            </Text>
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleCreateProfile}
          disabled={!username || !agreed}
          className={`w-full py-3 rounded-lg mt-6 ${
            createProfileLoading
              ? "bg-blue-800"
              : agreed && username
              ? "bg-blue-600"
              : "bg-gray-500"
          }`}
        >
          {createProfileLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text className="text-white text-center text-[15px] font-semibold">
              Create Profile
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
