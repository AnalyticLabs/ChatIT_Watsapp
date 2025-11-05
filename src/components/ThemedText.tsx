import React from "react";
import { Text, TextStyle } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

interface Props {
  children: React.ReactNode;
  variant?: "title" | "subtitle" | "body" | "link";
  style?: TextStyle;
  onPress?: () => void;
}

export default function ThemedText({ children, variant = "body", style, onPress }: Props) {
  const { colors } = useTheme();

  const variantStyles: Record<string, TextStyle> = {
    title: { fontSize: 24, fontWeight: "700", color: colors.textPrimary },
    subtitle: { fontSize: 16, fontWeight: "500", color: colors.textSecondary },
    body: { fontSize: 14, color: colors.textPrimary },
    link: { fontSize: 14, color: colors.primary, fontWeight: "600" },
  };

  return (
    <Text style={[variantStyles[variant], style]} onPress={onPress}>
      {children}
    </Text>
  );
}
