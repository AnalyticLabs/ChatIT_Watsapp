import { useColorScheme } from "~/lib/useColorScheme";
import { Sun, Moon } from "lucide-react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Pressable } from "react-native";

export function ThemeToggle() {
  const { isDarkColorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Pressable onPress={toggleColorScheme} className="p-2">
      <Animated.View
        key={isDarkColorScheme ? "sun" : "moon"}
        entering={FadeIn.duration(100)}
        exiting={FadeOut.duration(100)}
      >
        {isDarkColorScheme ? (
          <Sun size={26} color="white" />
        ) : (
          <Moon size={26} color="black" />
        )}
      </Animated.View>
    </Pressable>
  );
}
