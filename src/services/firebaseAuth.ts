import { initializeApp } from "firebase/app";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { firebaseConfig } from "../config/firebaseConfig";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// For React Native you may need to use firebase/auth react-native-specific methods or Expo's Recaptcha.
// Here is a minimal helper for web-like flow (works in RN WebView+Expo).
export async function sendOtp(phone: string, recaptchaContainerId: string) {
  const verifier = new RecaptchaVerifier(recaptchaContainerId, { size: "invisible" }, auth);
  const confirmation = await signInWithPhoneNumber(auth, phone, verifier);
  return confirmation; // confirmation.confirm(code) to finish
}
