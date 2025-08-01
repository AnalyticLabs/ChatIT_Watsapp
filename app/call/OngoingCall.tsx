import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Audio } from "expo-av";
import { useSelector } from "react-redux";
import socket from "~/lib/socket/socket";
import { RootState } from "~/store";

export default function OngoingCall() {
  const { id: roomId, receiverId } = useLocalSearchParams<{
    id: string;
    receiverId: string;
  }>();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const profile = useSelector((state: RootState) =>
    state.dashboard.profileData.find((p) => p.id === receiverId)
  );

  const [countdown, setCountdown] = useState(30); // 30 seconds auto cancel
  const soundRef = useRef<Audio.Sound | null>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Play ringtone
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

    socket.on("call_accepted", ({ roomId: acceptedRoomId }) => {
      if (acceptedRoomId === roomId) {
        cleanup();
        // Navigate to actual call UI or media screens next
      }
    });

    socket.on("call_rejected", () => {
      cleanup();
      alert("Call declined");
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
    alert("Call timed out");
    router.back();
  };

  return (
    <View style={styles.container}>
      <Image
        source={
          profile?.avatar
            ? { uri: profile.avatar }
            : require("../../assets/images/Avtar.png")
        }
        style={styles.avatar}
      />
      <Text style={styles.name}>{profile?.name ?? "Calling..."}</Text>
      {/* <Text style={styles.status}>Calling... {countdown}s</Text> */}
      <Text style={styles.status}>Calling...</Text>

      <TouchableOpacity onPress={endCall} style={styles.endButton}>
        <Text style={styles.endText}>Cancel Call</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0e0c19",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 10,
  },
  status: {
    color: "#aaa",
    fontSize: 16,
    marginBottom: 30,
  },
  endButton: {
    backgroundColor: "#ff4e4e",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 8,
  },
  endText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
