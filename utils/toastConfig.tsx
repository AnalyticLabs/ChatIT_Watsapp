import { BaseToast, ErrorToast } from "react-native-toast-message";
import { useColorScheme } from "react-native";

export const toastConfig = {
  success: (props: any) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    return (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: "#22c55e",
          backgroundColor: isDark ? "#1f2937" : "#f0fdf4",
          borderRadius: 8,
          borderLeftWidth: 6,
          width: "80%",
        }}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingVertical: 8,
        }}
        text1Style={{
          fontSize: 16,
          fontWeight: "700",
          color: isDark ? "#ffffff" : "#15803d",
        }}
        text2Style={{
          fontSize: 14,
          color: isDark ? "#d1d5db" : "#065f46",
        }}
      />
    );
  },

  error: (props: any) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    return (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: "#ef4444",
          backgroundColor: isDark ? "#1f2937" : "#fef2f2",
          borderRadius: 8,
          borderLeftWidth: 6,
          width: "80%",
        }}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingVertical: 8,
        }}
        text1Style={{
          fontSize: 16,
          fontWeight: "700",
          color: isDark ? "#ffffff" : "#b91c1c",
        }}
        text2Style={{
          fontSize: 14,
          color: isDark ? "#fca5a5" : "#7f1d1d",
        }}
      />
    );
  },
};
