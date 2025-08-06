// import React, { useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   ImageBackground,
// } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { PhoneOff, Video } from "lucide-react-native";
// import { BlurView } from "expo-blur";
// import { useSelector } from "react-redux";
// import { Audio } from "expo-av";
// import { router } from "expo-router";
// import { RootState } from "~/store";

// export default function IncomingVideoCall({ id }: { id: string }) {
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
//     router.push({ pathname: "/OngoingVideoCall", params: { id } });
//   };

//   const handleRejectCall = () => {
//     soundRef.current?.stopAsync();
//     router.back();
//   };

//   return (
//     <ImageBackground source={avatar} style={{ flex: 1 }} resizeMode="cover">
//       <BlurView
//         intensity={50}
//         tint="dark"
//         style={{
//           flex: 1,
//           paddingTop: insets.top,
//           paddingBottom: insets.bottom,
//         }}
//       >
//         <View className="flex-1 items-center justify-center">
//           <Image source={avatar} className="w-36 h-36 rounded-full mb-6" />
//           <Text className="text-white text-xl font-semibold mb-1">{name}</Text>
//           <Text className="text-gray-300 text-sm">Ringing...</Text>
//         </View>

//         <View className="flex-row justify-center gap-10 mb-10">
//           <TouchableOpacity
//             className="bg-red-700 p-5 rounded-full"
//             onPress={handleRejectCall}
//           >
//             <PhoneOff color="white" size={28} />
//           </TouchableOpacity>
//           <TouchableOpacity
//             className="bg-green-700 p-5 rounded-full"
//             onPress={handleAcceptCall}
//           >
//             <Video color="white" size={28} />
//           </TouchableOpacity>
//         </View>
//       </BlurView>
//     </ImageBackground>
//   );
// }

import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PhoneOff, Video } from "lucide-react-native";
import { BlurView } from "expo-blur";
import { useSelector } from "react-redux";
import { Audio } from "expo-av";
import { router } from "expo-router";
import { RootState } from "~/store";
import socket from "~/lib/socket/socket";

export default function IncomingVideoCall({ id }: { id: string }) {
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
    router.replace({ pathname: "/call/OngoingVideoCall", params: { id } });
  };

  const handleRejectCall = () => {
    soundRef.current?.stopAsync();
    socket.emit("reject_call", { roomId: id });
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
        <View className="flex-1 items-center justify-center">
          <Image source={avatar} className="w-36 h-36 rounded-full mb-6" />
          <Text className="text-white text-xl font-semibold mb-1">{name}</Text>
          <Text className="text-gray-300 text-sm">Ringing...</Text>
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
            <Video color="white" size={28} />
          </TouchableOpacity>
        </View>
      </BlurView>
    </ImageBackground>
  );
}
