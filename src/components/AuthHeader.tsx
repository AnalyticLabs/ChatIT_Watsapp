import React from "react";
import { View, Image, StyleSheet } from "react-native";
import ThemedText from "./ThemedText";
import { useTheme } from "../theme/ThemeProvider";

export default function AuthHeader() {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      {/* <Image
        source={require("../../assets/logo.png")} // replace with your actual logo
        style={styles.logo}
        resizeMode="contain"
      /> */}
      <ThemedText
        variant="title"
        style={[styles.title, { color: colors.textPrimary }]}
      >
        ChatIt
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    marginTop: 8,
    fontSize: 28,
  },
});
