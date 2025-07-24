import { useRouter } from "expo-router";
import { Phone } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Animated,
  Pressable,
  TextInput,
  Modal,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp } from "~/features/auth/authAction";
import { hideToast, showError, showSuccess } from "~/utils/toast";
import { RootState } from "~/store";
import { ActivityIndicator } from "react-native";

const countryCodes = [
  { code: "+91", country: "India" },
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+61", country: "Australia" },
  { code: "+81", country: "Japan" },
];

export default function LoginScreen() {
  const { isDarkColorScheme } = useColorScheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [mobile, setMobile] = useState<string | undefined>();
  const [countryCode, setCountryCode] = useState("+91");
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();
  const { sendOtpLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, "");
    setMobile(numericText);
  };

  const handleSendOTP = async () => {
    if (!mobile || mobile.length < 10) {
      showError(
        "Invalid number",
        "Please enter a valid 10-digit mobile number"
      );
      return;
    }

    try {
      const response: any = await dispatch(
        sendOtp({
          phoneNumber: mobile,
          phoneSuffix: countryCode,
        }) as any
      );
      if (response?.status !== "success") {
        throw new Error("OTP not sent");
      }

      hideToast();
      showSuccess("OTP Sent", `OTP sent to ${countryCode} ${mobile}`);

      router.push({
        pathname: "/verify",
        params: {
          phoneNumber: mobile,
          phoneSuffix: countryCode,
        },
      });
    } catch (err) {
      hideToast();

      const errorMessage =
        err && typeof err === "object" && "message" in err
          ? (err as any).message
          : "Something went wrong";
      showError("Failed to send OTP", errorMessage);
    }
  };

  const handleCountrySelect = (code: string) => {
    setCountryCode(code);
    setModalVisible(false);
  };

  return (
    <View className="flex-1 bg-white dark:bg-[#0e0c19] px-6 pt-24">
      {/* Top Section */}
      <View className="items-center">
        <Animated.Image
          source={require("../../assets/images/Chatit.png")}
          className="w-36 h-36"
          style={{ opacity: fadeAnim }}
          resizeMode="cover"
        />
        <Text
          className={`text-2xl font-extrabold ${
            isDarkColorScheme ? "text-white" : "text-black"
          }`}
        >
          LogIn to ChatIt
        </Text>
        <Text
          className={`text-base font-semibold text-center mt-2 ${
            isDarkColorScheme ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Welcome back! Please login to continue
        </Text>
      </View>

      {/* Middle Section */}
      <View className="flex justify-center items-center pt-32">
        <View
          className={`flex-row items-center w-full max-w-sm py-1 px-4 rounded-full border ${
            isDarkColorScheme
              ? "bg-[#12121A] border-[#2A2A3C]"
              : "bg-gray-100 border-gray-300"
          }`}
        >
          <Phone color="#2563EB" size={19} strokeWidth={2.5} />

          {/* Country Code Selector */}
          <Pressable
            className="ml-3 px-2 border-r border-gray-400"
            onPress={() => setModalVisible(true)}
          >
            <Text
              className={`text-base font-medium ${
                isDarkColorScheme ? "text-[#E4E4EB]" : "text-black"
              }`}
            >
              {countryCode}
            </Text>
          </Pressable>

          {/* Phone Input */}
          <TextInput
            className={`ml-3 flex-1 text-base ${
              isDarkColorScheme ? "text-[#E4E4EB]" : "text-black"
            }`}
            placeholder="Phone Number"
            placeholderTextColor={isDarkColorScheme ? "#8A8A99" : "#999"}
            keyboardType="phone-pad"
            maxLength={10}
            value={mobile}
            onChangeText={handleChange}
          />
        </View>

        <View className="w-full max-w-sm mt-3">
          <Pressable
            onPress={handleSendOTP}
            disabled={sendOtpLoading || (mobile ?? "").length < 10}
            className={`px-6 py-3 rounded-full w-full ${
              sendOtpLoading
                ? "bg-blue-800"
                : (mobile ?? "").length < 10
                ? "bg-gray-500"
                : "bg-blue-600"
            }`}
          >
            {sendOtpLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text className="text-center text-white text-lg font-bold">
                Send OTP
              </Text>
            )}
          </Pressable>
        </View>
      </View>

      {/* Country Code Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white dark:bg-[#12121A] w-72 rounded-2xl overflow-hidden">
            {/* Background Header with title */}
            <View className="bg-blue-600 px-4 pt-4 pb-3">
              <Text className="text-xl font-bold text-center dark:text-white text-white">
                Select Country Code
              </Text>
            </View>

            {/* Decorative horizontal line connecting full width */}
            <View className="w-full h-[1px] bg-gray-300 dark:bg-gray-600" />

            {/* Country list */}
            <View className="p-4">
              <FlatList
                data={countryCodes}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleCountrySelect(item.code)}
                    className="py-2"
                  >
                    <Text
                      className={`text-lg text-center font-bold ${
                        countryCode === item.code
                          ? "text-blue-600 font-bold"
                          : isDarkColorScheme
                          ? "text-white"
                          : "text-black"
                      }`}
                    >
                      {item.country} ({item.code})
                    </Text>
                  </TouchableOpacity>
                )}
              />

              {/* Cancel Button */}
              <Pressable
                onPress={() => setModalVisible(false)}
                className="mt-3 items-center"
              >
                <Text className="text-white bg-blue-600 rounded-full px-8 py-2 text-xl font-bold">
                  Cancel
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
