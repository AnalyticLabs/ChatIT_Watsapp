import React, { useRef, useState, useEffect } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "~/lib/useColorScheme";

export default function VerifyScreen() {
  const { isDarkColorScheme } = useColorScheme();
  const { phoneNumber } = useLocalSearchParams();
  const router = useRouter();

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  interface HandleChangeParams {
    text: string;
    index: number;
  }

  const handleChange = ({ text, index }: HandleChangeParams): void => {
    if (text.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // const handleVerify = async () => {
  //   const otpCode = otp.join("");

  //   if (otp.includes("")) {
  //     alert("Please fill in all OTP fields.");
  //     return;
  //   }

  //   try {
  //     const response = await fetch("http://your-backend.com/api/verify-otp", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ phoneNumber, otp: otpCode }),
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       router.replace("/home");
  //     } else {
  //       alert(data.message || "Verification failed");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleVerify = () => {
    if (otp.join("").length !== 4) {
      alert("Please fill in all OTP fields.");
      return;
    }
    router.push("/createprofilescreen");
  };

  const resendOtpHandler = () => {
    router.push("/");
  };

  return (
    <View className="bg-white dark:bg-[#0e0c19] flex-1 justify-center items-center px-6">
      <Text
        className={`${
          isDarkColorScheme ? "text-white" : "text-black"
        } text-xl font-bold mb-8`}
      >
        Code has been sent to ******{String(phoneNumber).slice(-4)}
      </Text>

      <View className="flex-row gap-3 mb-4">
        {[0, 1, 2, 3].map((i) => (
          <TextInput
            key={i}
            ref={(ref) => (inputRefs.current[i] = ref)}
            keyboardType="number-pad"
            maxLength={1}
            value={otp[i]}
            onChangeText={(text) => handleChange({ text, index: i })}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace" && otp[i] === "" && i > 0) {
                const newOtp = [...otp];
                newOtp[i - 1] = "";
                setOtp(newOtp);
                inputRefs.current[i - 1]?.focus();
              }
            }}
            className={`w-14 h-14 text-2xl font-bold border-2 rounded-xl text-center ${
              otp[i]
                ? isDarkColorScheme
                  ? "border-blue-500 bg-blue-900 text-white"
                  : "border-blue-500 bg-blue-200 text-black"
                : isDarkColorScheme
                ? "border-gray-700 bg-black text-white"
                : "border-gray-300 bg-white text-black"
            }`}
          />
        ))}
      </View>

      {timer > 0 ? (
        <Text
          className={`${
            isDarkColorScheme ? "text-gray-300" : "text-gray-600"
          } text-base font-bold`}
        >
          Resend code in{" "}
          <Text className="text-blue-500 text-base font-bold">{timer}s</Text>
        </Text>
      ) : (
        <Pressable
          onPress={resendOtpHandler}
          className="px-4 py-3 rounded-full w-full bg-blue-600"
        >
          <Text className="text-center text-white text-lg font-bold">
            Resend OTP
          </Text>
        </Pressable>
      )}

      <Pressable
        onPress={handleVerify}
        disabled={otp.includes("")}
        className={`px-4 py-3 rounded-full w-full mt-3 ${
          otp.includes("") ? "bg-gray-500" : "bg-blue-600"
        }`}
      >
        <Text className="text-center text-white text-lg font-bold">Verify</Text>
      </Pressable>
    </View>
  );
}
