import { View, Text, TouchableOpacity, Image } from "react-native";
import { PhoneOff, Phone } from "lucide-react-native";

export default function IncomingGroupCall() {
  const participants = [
    { id: "1", uri: require("../assets/images/user1.png"), name: "You" },
    {
      id: "2",
      uri: require("../assets/images/user2.png"),
      name: "Jane Cooper",
    },
    {
      id: "3",
      uri: require("../assets/images/user3.png"),
      name: "Eleanor Pena",
    },
    { id: "4", uri: require("../assets/images/user4.png"), name: "Robert Fox" },
    { id: "5", uri: require("../assets/images/user5.png"), name: "Alex" },
  ];

  return (
    <View className="flex-1 bg-white dark:bg-[#0e0c19] justify-between">
      {/* Avatars + Group Info */}
      <View className="flex-1 items-center justify-center">
        <View className="items-center">
          {/* Avatar Grid */}
          <View className="flex-row flex-wrap justify-center gap-x-8 gap-y-6 px-4">
            {participants.map((item) => (
              <View key={item.id} className="items-center w-24">
                <Image source={item.uri} className="w-20 h-20 rounded-full" />
                <Text className="text-black dark:text-white text-base font-bold mt-2 text-center">
                  {item.name}
                </Text>
              </View>
            ))}
          </View>

          {/* Group Info */}
          <Text className="text-gray-500 dark:text-gray-400 text-sm mt-6">
            and {participants.length - 4} others...
          </Text>
          <Text className="text-black dark:text-white text-2xl font-bold mt-1">
            Wybble Team
          </Text>
          <Text className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Ringing...
          </Text>
        </View>
      </View>

      {/* Call Buttons */}
      <View className="flex-row justify-center gap-10 mb-10">
        <TouchableOpacity className="bg-red-700 p-5 rounded-full">
          <PhoneOff color="white" size={28} />
        </TouchableOpacity>
        <TouchableOpacity className="bg-green-700 p-5 rounded-full">
          <Phone color="white" size={28} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
