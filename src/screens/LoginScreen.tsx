// src/screens/Auth/LoginScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

export default function LoginScreen() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const sendOTP = async () => {
    if (!phone) return Alert.alert("Enter phone number");
    setLoading(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber(phone);
      navigation.navigate("VerifyOTP", { confirmation });
    } catch (error) {
      console.error(error);
      Alert.alert("Error sending OTP");
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Enter your phone number</Text>
      <TextInput
        placeholder="+91 9999999999"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 10,
          marginBottom: 20,
        }}
      />
      <TouchableOpacity
        onPress={sendOTP}
        disabled={loading}
        style={{
          backgroundColor: "#25D366",
          padding: 14,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          {loading ? "Sending..." : "Send OTP"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
