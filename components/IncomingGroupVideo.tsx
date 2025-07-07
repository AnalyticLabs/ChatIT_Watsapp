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

export default function IncomingGroupVideo() {
  const insets = useSafeAreaInsets();
  const wybble = require("../assets/images/wybble-team.png");

  return (
    <ImageBackground source={wybble} style={{ flex: 1 }} resizeMode="cover">
      {/* Full-screen Blur */}
      <BlurView
        intensity={50}
        tint="dark"
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        {/* Center content */}
        <View className="flex-1 items-center justify-center">
          <Image source={wybble} className="w-36 h-36 rounded-full mb-6" />
          <Text className="text-white text-xl font-semibold mb-1">
            Wybble Team
          </Text>
          <Text className="text-gray-300 text-sm">Ringing...</Text>
        </View>

        {/* Call control buttons */}
        <View className="flex-row justify-center gap-10 mb-10">
          <TouchableOpacity className="bg-red-700 p-5 rounded-full">
            <PhoneOff color="white" size={28} />
          </TouchableOpacity>
          <TouchableOpacity className="bg-green-700 p-5 rounded-full">
            <Video color="white" size={28} />
          </TouchableOpacity>
        </View>
      </BlurView>
    </ImageBackground>
  );
}
