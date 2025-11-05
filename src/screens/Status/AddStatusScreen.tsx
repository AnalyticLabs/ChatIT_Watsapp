// src/screens/Chats/ChatListScreen.tsx
import React from "react";
import { View, Text, Button } from "react-native";

export default function AddStatusScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Add Status Screen</Text>
      <Button
        title="Open Chat"
        onPress={() => navigation.navigate("Chat", { name: "Navjot" })}
      />
    </View>
  );
}
