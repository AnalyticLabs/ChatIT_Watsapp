import React, { useEffect, useRef, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import ThemedButton from "../../components/ThemedButton";
import ThemedText from "../../components/ThemedText";
import AuthHeader from "../../components/AuthHeader";
import { useTheme } from "../../theme/ThemeProvider";
import { navigate } from "../stacks/RootNavigation";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from "../../services/Endpoints";
import { saveString } from "../../utils/storage";
import { setIsLoggedIn } from "../../redux/slices/auth";
import { navigationRef } from "../rootstack";
import { verifyOTPService } from "../../services/Auth";

export default function VerifyOTPScreen({ route }) {
  console.log(route?.params, '---=-=-=-');
  const { confirmation, data } = route?.params || {};
  const { isLoggedIn, user } = useAppSelector(state => state.auth);
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch()
  const navigation = useNavigation();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<TextInput[]>([]);


  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    // return navigation.navigate("Home");
    console.log('Verify');
    // setLoading(false);
    // saveString(TOKEN_KEY, res?.data?.data?.token);
    // saveString(REFRESH_TOKEN_KEY, res?.data?.data?.refreshToken);
    // return  dispatch(setIsLoggedIn(true));
    // return navigationRef.navigate("Main", { screen: "Chats" });

    // return navigate("Main", { screen: "Chats" });
    // return navigation.replace("Main", { screen: "Chats" });
    // return   navigation.getParent()?.navigate("Main", { screen: "Chats" });
    // return navigation.getParent()?.replace("Main", { screen: "Chats" });


    const code = otp.join("");

    // if (code.length < 4) return alert("Enter complete code");
    try {
      const res = await verifyOTPService(data);
      console.log(res?.data?.data, '----isLoggedIn---');
      saveString(TOKEN_KEY, res?.data?.data?.token);
      saveString(REFRESH_TOKEN_KEY, res?.data?.data?.refreshToken);
      dispatch(setIsLoggedIn(true));
      // navigationRef.navigate("Home");
    } catch (error) {
      console.log(error, "Invalid code");
    }
  };
console.log(data, 'otp');
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AuthHeader />

      <ThemedText
        variant="subtitle"
        style={[styles.infoText, { color: colors.textSecondary }]}
      >
        Code has been sent to <ThemedText   style={[styles.infoText]} variant="link" >{data?.phoneNumber}</ThemedText>
      </ThemedText>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref!)}
            value={digit}
            onChangeText={(text) => handleChange(text.slice(-1), index)}
            keyboardType="numeric"
            maxLength={1}
            style={[
              styles.otpBox,
              {
                borderColor:
                  digit.length > 0 ? colors.primary : colors.border,
                backgroundColor:
                  digit.length > 0 ? "#E0E8FF" : colors.card,
                color: colors.textPrimary,
              },
            ]}
          />
        ))}
      </View>

      <ThemedText
        variant="body"
        style={styles.resendText}
      >
        Resend code in{" "}
        <ThemedText variant="link">{timer}s</ThemedText>
      </ThemedText>

      <ThemedButton
        title="Verify"
        onPress={handleVerify}
      // disabled={otp.join("").length < 4}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  infoText: {
    textAlign: "center",
    marginBottom: 24,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  otpBox: {
    width: 60,
    height: 60,
    borderWidth: 1.5,
    borderRadius: 12,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    marginHorizontal: 8,
  },
  resendText: {
    textAlign: "center",
    marginBottom: 24,
  },
});
