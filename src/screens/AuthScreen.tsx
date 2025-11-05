import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebaseConfig";
import axios from "axios";
import { setAuthToken } from "../services/api";

initializeApp(firebaseConfig);
const auth = getAuth();

export default function AuthScreen({ navigation }: any) {
  const [phone, setPhone] = useState("+91XXXXXXXXXX");
  const [confirmation, setConfirmation] = useState<any>(null);
  const [code, setCode] = useState("");

  const startPhone = async () => {
    try {
      // RecaptchaVerifier setup differs on RN; this is web-style.
      const verifier = new (RecaptchaVerifier as any)("recaptcha-container", { size: "invisible" }, auth);
      const result = await signInWithPhoneNumber(auth, phone, verifier);
      setConfirmation(result);
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP");
    }
  };

  const confirmCode = async () => {
    try {
      const userCredential = await confirmation.confirm(code);
      const idToken = await userCredential.user.getIdToken();
      // send idToken to server to exchange for local JWT
      const res = await axios.post("http://YOUR_SERVER_IP:4000/api/auth/firebase", { idToken });
      const token = res.data.token;
      setAuthToken(token);
      // navigate to app home
      navigation.replace("Home", { token });
    } catch (err) {
      console.error(err);
      alert("Invalid code");
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput placeholder="+91XXXXXXXXXX" value={phone} onChangeText={setPhone} />
      <Button title="Send OTP" onPress={startPhone} />
      {confirmation && <>
        <TextInput placeholder="123456" value={code} onChangeText={setCode} />
        <Button title="Confirm" onPress={confirmCode} />
      </>}
      <View id="recaptcha-container" style={{ height: 0 }} />
    </View>
  );
}
