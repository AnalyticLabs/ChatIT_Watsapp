import { View } from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <View className={isDarkColorScheme ? "dark flex-1" : "flex-1"}>
      {children}
    </View>
  );
}
