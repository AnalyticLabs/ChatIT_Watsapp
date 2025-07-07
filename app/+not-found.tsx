import { Link, Stack } from "expo-router";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { useColorScheme } from "~/lib/useColorScheme";

export default function NotFoundScreen() {
  const isDarkColorScheme = useColorScheme();

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-bold mb-5">
          This screen doesn't exist.
        </Text>

        <Link href="/" className="bg-blue-600 rounded-full px-6 py-3">
          <Text
            className={`${
              isDarkColorScheme ? "text-white" : "text-black"
            } text-xl font-bold`}
          >
            Go to home screen!
          </Text>
        </Link>
      </View>
    </>
  );
}
