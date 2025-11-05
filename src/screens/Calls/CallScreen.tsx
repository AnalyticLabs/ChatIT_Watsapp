// src/screens/Chats/ChatListScreen.tsx
import React from "react";
import { View, Text, Button } from "react-native";

export default function CallScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Call Screen</Text>
      <Button
        title="Open Chat"
        onPress={() => navigation.navigate("Chat", { name: "Navjot" })}
      />
    </View>
  );
}
