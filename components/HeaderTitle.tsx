import { Text } from "react-native";
import { useTheme } from "@react-navigation/native";

export function HeaderTitle({ title }: { title: string }) {
  const { colors } = useTheme();

  return (
    <Text
      style={{
        fontSize: 22,
        fontWeight: "700",
        color: colors.text,
      }}
    >
      {title}
    </Text>
  );
}
