// import React, { useEffect, useRef } from "react";
// import { View, Text, TouchableOpacity, Image } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { PhoneOff, Phone } from "lucide-react-native";
// import { useSelector } from "react-redux";
// import { Audio } from "expo-av";
// import { router } from "expo-router";
// import { RootState } from "~/store";

// export default function IncomingCall({ id }: { id: string }) {
//   const insets = useSafeAreaInsets();
//   const soundRef = useRef<Audio.Sound | null>(null);

//   const profile = useSelector((state: RootState) =>
//     state.dashboard.profileData.find((item) => item.id === id)
//   );

//   const avatar = profile?.avatar
//     ? { uri: profile.avatar }
//     : require("../assets/images/Avtar.png");
//   const name = profile?.name ?? "Unknown";

//   useEffect(() => {
//     const playRingtone = async () => {
//       const { sound } = await Audio.Sound.createAsync(
//         require("../assets/sounds/ringtone.mp3"),
//         { shouldPlay: true, isLooping: true }
//       );
//       soundRef.current = sound;
//       await sound.playAsync();
//     };

//     playRingtone();

//     return () => {
//       soundRef.current?.unloadAsync();
//     };
//   }, []);

//   const handleAcceptCall = () => {
//     soundRef.current?.stopAsync();
//     router.push({ pathname: "/OngoingCall", params: { id } });
//   };

//   const handleRejectCall = () => {
//     soundRef.current?.stopAsync();
//     router.back();
//   };

//   return (
//     <View
//       className="flex-1 bg-white dark:bg-[#0e0c19]"
//       style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
//     >
//       <View className="flex-1 items-center justify-center">
//         <Image source={avatar} className="w-36 h-36 rounded-full mb-6" />
//         <Text className="text-black dark:text-white text-xl font-semibold mb-1">
//           {name}
//         </Text>
//         <Text className="text-gray-500 dark:text-gray-400 text-sm">
//           Ringing...
//         </Text>
//       </View>

//       <View className="flex-row justify-center gap-10 mb-10">
//         <TouchableOpacity
//           className="bg-red-700 p-5 rounded-full"
//           onPress={handleRejectCall}
//         >
//           <PhoneOff color="white" size={28} />
//         </TouchableOpacity>
//         <TouchableOpacity
//           className="bg-green-700 p-5 rounded-full"
//           onPress={handleAcceptCall}
//         >
//           <Phone color="white" size={28} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PhoneOff, Phone } from "lucide-react-native";
import { useSelector } from "react-redux";
import { Audio } from "expo-av";
import { router } from "expo-router";
import { RootState } from "~/store";
import socket from "~/lib/socket/socket";

export default function IncomingCall({ id }: { id: string }) {
  const insets = useSafeAreaInsets();
  const soundRef = useRef<Audio.Sound | null>(null);

  const profile = useSelector((state: RootState) =>
    state.dashboard.profileData.find((item) => item.id === id)
  );

  const avatar = profile?.avatar
    ? { uri: profile.avatar }
    : require("../assets/images/Avtar.png");
  const name = profile?.name ?? "Unknown";

  useEffect(() => {
    const playRingtone = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/sounds/ringtone.mp3"),
        { shouldPlay: true, isLooping: true }
      );
      soundRef.current = sound;
      await sound.playAsync();
    };

    playRingtone();

    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);

  const handleAcceptCall = () => {
    soundRef.current?.stopAsync();
    socket.emit("accept_call", { roomId: id });
    router.replace({ pathname: "/call/OngoingCall", params: { id } });
  };

  const handleRejectCall = () => {
    soundRef.current?.stopAsync();
    socket.emit("reject_call", { roomId: id });
    router.back();
  };

  return (
    <View
      className="flex-1 bg-white dark:bg-[#0e0c19]"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <View className="flex-1 items-center justify-center">
        <Image source={avatar} className="w-36 h-36 rounded-full mb-6" />
        <Text className="text-black dark:text-white text-xl font-semibold mb-1">
          {name}
        </Text>
        <Text className="text-gray-500 dark:text-gray-400 text-sm">
          Ringing...
        </Text>
      </View>

      <View className="flex-row justify-center gap-10 mb-10">
        <TouchableOpacity
          className="bg-red-700 p-5 rounded-full"
          onPress={handleRejectCall}
        >
          <PhoneOff color="white" size={28} />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-green-700 p-5 rounded-full"
          onPress={handleAcceptCall}
        >
          <Phone color="white" size={28} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
