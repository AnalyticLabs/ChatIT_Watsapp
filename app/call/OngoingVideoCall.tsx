// import React, { useEffect, useRef, useState } from "react";
// import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { Audio } from "expo-av";
// import { useSelector } from "react-redux";
// import socket from "~/lib/socket/socket";
// import { RootState } from "~/store";

// export default function OngoingVideoCall() {
//   const { id: roomId, receiverId } = useLocalSearchParams<{
//     id: string;
//     receiverId: string;
//   }>();
//   const router = useRouter();
//   const user = useSelector((state: RootState) => state.auth.user);
//   const profile = useSelector((state: RootState) =>
//     state.dashboard.profileData.find((p) => p.id === receiverId)
//   );

//   const [countdown, setCountdown] = useState(30);
//   const soundRef = useRef<Audio.Sound | null>(null);
//   const timerRef = useRef<NodeJS.Timeout>();

//   useEffect(() => {
//     (async () => {
//       const { sound } = await Audio.Sound.createAsync(
//         require("../../assets/sounds/ringtone.mp3"),
//         { shouldPlay: true, isLooping: true }
//       );
//       soundRef.current = sound;
//     })();

//     timerRef.current = setInterval(() => {
//       setCountdown((prev) => {
//         if (prev <= 1) {
//           handleTimeout();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     socket.on("call_accepted", ({ roomId: acceptedRoomId }) => {
//       if (acceptedRoomId === roomId) {
//         cleanup();
//         // Navigate to WebRTC media call screen
//       }
//     });

//     socket.on("call_rejected", () => {
//       cleanup();
//       alert("Call declined");
//       router.back();
//     });

//     return cleanup;
//   }, []);

//   const cleanup = () => {
//     soundRef.current?.stopAsync();
//     soundRef.current?.unloadAsync();
//     if (timerRef.current) clearInterval(timerRef.current);
//   };

//   const endCall = () => {
//     socket.emit("end_call", { receiverId, roomId });
//     cleanup();
//     router.back();
//   };

//   const handleTimeout = () => {
//     socket.emit("end_call", { receiverId, roomId });
//     cleanup();
//     alert("Call timed out");
//     router.back();
//   };

//   return (
//     <View style={styles.container}>
//       <Image
//         source={
//           profile?.avatar
//             ? { uri: profile.avatar }
//             : require("../../assets/images/Avtar.png")
//         }
//         style={styles.avatar}
//       />
//       <Text style={styles.name}>{profile?.name ?? "Calling..."}</Text>
//       <Text style={styles.status}>Video Calling... {countdown}s</Text>

//       <TouchableOpacity onPress={endCall} style={styles.endButton}>
//         <Text style={styles.endText}>Cancel Call</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#0e0c19",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//   },
//   avatar: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     marginBottom: 20,
//   },
//   name: {
//     color: "#fff",
//     fontSize: 24,
//     marginBottom: 10,
//   },
//   status: {
//     color: "#aaa",
//     fontSize: 16,
//     marginBottom: 30,
//   },
//   endButton: {
//     backgroundColor: "#ff4e4e",
//     paddingHorizontal: 20,
//     paddingVertical: 14,
//     borderRadius: 8,
//   },
//   endText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });


import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PhoneOff } from "lucide-react-native";
import { BlurView } from "expo-blur";
import { useSelector } from "react-redux";
import { router, useLocalSearchParams } from "expo-router";
import { Audio } from "expo-av";
import { RootState } from "~/store";
import socket from "~/lib/socket/socket";

export default function OngoingVideoCall() {
  const insets = useSafeAreaInsets();
  const { id: roomId, receiverId } = useLocalSearchParams<{
    id: string;
    receiverId: string;
  }>();

  const profile = useSelector((state: RootState) =>
    state.dashboard.profileData.find((item) => item.id === receiverId)
  );

  const avatar = profile?.avatar
    ? { uri: profile.avatar }
    : require("../../assets/images/Avtar.png");
  const name = profile?.name ?? "Unknown";

  const [countdown, setCountdown] = useState(30);
  const soundRef = useRef<Audio.Sound | null>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Play outgoing ringtone
    (async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/sounds/ringtone.mp3"),
        { shouldPlay: true, isLooping: true }
      );
      soundRef.current = sound;
    })();

    // Countdown timer
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Socket listeners
    socket.on("call_accepted", ({ roomId: acceptedRoomId }) => {
      if (acceptedRoomId === roomId) {
        cleanup();
        // TODO: Navigate to video call screen
        Alert.alert("Call accepted", "Connecting...");
      }
    });

    socket.on("call_rejected", () => {
      cleanup();
      Alert.alert("Call Declined", "The receiver rejected the call.");
      router.back();
    });

    return cleanup;
  }, []);

  const cleanup = () => {
    soundRef.current?.stopAsync();
    soundRef.current?.unloadAsync();
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const endCall = () => {
    socket.emit("end_call", { receiverId, roomId });
    cleanup();
    router.back();
  };

  const handleTimeout = () => {
    socket.emit("end_call", { receiverId, roomId });
    cleanup();
    Alert.alert("Call timed out", "The receiver didn't answer.");
    router.back();
  };

  return (
    <ImageBackground source={avatar} style={{ flex: 1 }} resizeMode="cover">
      <BlurView
        intensity={50}
        tint="dark"
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <View style={styles.center}>
          <Image source={avatar} style={styles.avatar} />
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.status}>Video Calling...</Text>
          {/* <Text style={styles.status}>Calling... {countdown}s</Text> */}
        </View>

        <View style={styles.bottom}>
          <TouchableOpacity onPress={endCall} style={styles.cancelBtn}>
            <PhoneOff color="white" size={28} />
          </TouchableOpacity>
        </View>
      </BlurView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottom: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 16,
  },
  name: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 6,
  },
  status: {
    color: "#ccc",
    fontSize: 16,
  },
  cancelBtn: {
    backgroundColor: "#ff4e4e",
    padding: 20,
    borderRadius: 50,
  },
});
