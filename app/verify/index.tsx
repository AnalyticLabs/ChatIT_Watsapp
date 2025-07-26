import React, { useRef, useState, useEffect } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "~/lib/useColorScheme";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/store";
import { ActivityIndicator } from "react-native";
import { sendOtp, verifyOtp } from "~/features/auth/authAction";
import { hideToast, showError, showSuccess } from "~/utils/toast";

export default function VerifyScreen() {
  const { isDarkColorScheme } = useColorScheme();
  const { phoneNumber, phoneSuffix } = useLocalSearchParams();
  const router = useRouter();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const [timer, setTimer] = useState(30);

  const dispatch = useDispatch();
  const { sendOtpLoading, verifyOtpLoading } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const [resendTimer, setResendTimer] = useState(30);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  interface HandleChangeParams {
    text: string;
    index: number;
  }

  const handleChange = ({ text, index }: HandleChangeParams): void => {
    if (text.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      showError("All fields required", "Please fill in all OTP fields");
      return;
    }

    try {
      await dispatch(
        verifyOtp({
          phoneNumber: String(phoneNumber),
          phoneSuffix: String(phoneSuffix),
          otp: otpCode,
        }) as any
      );
      hideToast();
      showSuccess("Verified", "OTP Verified succesfully");
      router.replace("/createprofilescreen");
    } catch (err: any) {
      hideToast();

      const errorMessage =
        err && typeof err === "object" && "message" in err
          ? (err as any).message
          : "Verification failed";

      showError("Verification failed", errorMessage);
    }
  };

  const resendOtpHandler = async () => {
    try {
      await dispatch(
        sendOtp({
          phoneNumber: String(phoneNumber),
          phoneSuffix: String(phoneSuffix),
        }) as any
      );
      showSuccess("OTP Sent", "A new OTP has been sent");
      setResendTimer(30);
    } catch (err: any) {
      const errorMessage =
        err && typeof err === "object" && "message" in err
          ? err.message
          : "Something went wrong";
      showError("Resend Failed", errorMessage);
    }
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

      <View className="flex-row gap-2 mb-4">
        {[0, 1, 2, 3, 4, 5].map((i) => (
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
            className={`w-10 h-14 text-2xl font-bold border-2 rounded-xl text-center ${
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

      {resendTimer === 0 ? (
        <Pressable
          onPress={resendOtpHandler}
          disabled={sendOtpLoading}
          className={`w-full py-3 px-4 rounded-full mt-3 ${
            sendOtpLoading ? "bg-blue-800" : "bg-blue-600"
          }`}
        >
          {sendOtpLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text className="text-center text-white text-lg font-bold">
              Resend OTP
            </Text>
          )}
        </Pressable>
      ) : (
        <Text className="text-gray-500 mt-3 text-center">
          Resend OTP in {resendTimer}s
        </Text>
      )}

      <Pressable
        onPress={handleVerify}
        disabled={otp.includes("") || verifyOtpLoading}
        className={`px-4 py-3 rounded-full w-full mt-3 ${
          verifyOtpLoading
            ? "bg-blue-800"
            : otp.includes("")
            ? "bg-gray-500"
            : "bg-blue-600"
        }`}
      >
        {verifyOtpLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text className="text-center text-white text-lg font-bold">
            Verify
          </Text>
        )}
      </Pressable>
    </View>
  );
}
