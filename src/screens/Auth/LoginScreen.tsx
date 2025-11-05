import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../theme/ThemeProvider";
import auth from "@react-native-firebase/auth";
import { styles } from "../../theme/styles";
import ThemedButton from "../../components/ThemedButton";
import ThemedInput from "../../components/ThemedInput";
import AuthHeader from "../../components/AuthHeader";
import { navigationRef } from "../rootstack";
import { SCREENS } from "../../utils/constants";
import { showErrorToast, showSuccessToast } from "../../utils/functions";
import axios from "axios";
import { logInService, sendOTPService } from '../../services/Auth'
import { BASE_URL, publicReq } from "../../services/config";
import IMAGES from "../../utils/IMAGES";


export default function LoginScreen() {
  const { colors } = useTheme();
  const [phone, setPhone] = useState("");
  // const [phone, setPhone] = useState("7589129941");
  const [prefix, setPrefix] = useState("+91");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const sendOTP = async () => {
    // return navigationRef.navigate(SCREENS.VerifyOTP, { confirmation: 1000 });
    console.log('working');

    if (!phone) return alert("Please enter phone number");
    setLoading(true);
    try {
      const data = {
        phoneNumber: phone,
        phoneSuffix: prefix,
      };
      const res = await sendOTPService(data);
      console.log(res?.data, '-----');

      // console.log(JSON.stringify(res?.data?.data?.otpDetails), 'res of send otp');
      navigation.navigate("VerifyOTP", { confirmation: res?.data?.data?.otpDetails, data });
    } catch (error) {
      // console.log("OTP error:", error?.response?.data);
      console.log("OTP error:", error);

      showErrorToast(error?.response?.data || 'Something went wrong while sending OTP.');
    }
    setLoading(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AuthHeader />
      <Text style={[styles.heading, { color: colors.primary }]}>
        Sign up for free
      </Text>

      <View style={styles.formContainer}>
        <Text style={[styles.label, { color: colors.textPrimary }]}>
          Phone Number <Text style={{ color: colors.error }}>*</Text>
        </Text>

        <ThemedInput
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          image={IMAGES.PhoneVerify}
        />

        <TouchableOpacity
          onPress={() => setRemember(!remember)}
          style={styles.rememberContainer}
        >
          <View
            style={[
              styles.checkbox,
              { borderColor: colors.border },
              remember && { backgroundColor: colors.primary },
            ]}
          />
          <Text style={[styles.rememberText, { color: colors.textSecondary }]}>
            Remember me
          </Text>
        </TouchableOpacity>

        <ThemedButton
          title={loading ? "Sending..." : "Sign Up"}
          onPress={sendOTP}
          disabled={loading}
        />
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
          Already have an account?{" "}
          <Text
            style={[styles.footerLink, { color: colors.primary }]}
            onPress={() => navigation.navigate("Login")}
          >
            Sign in
          </Text>
        </Text>
      </View>
    </View>
  );
}
