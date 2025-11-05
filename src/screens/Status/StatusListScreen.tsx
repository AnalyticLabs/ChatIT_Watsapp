// src/screens/Chats/ChatListScreen.tsx
import React from "react";
import { View, Text, Button } from "react-native";
import { clearAll } from "../../utils/storage";

export default function StatusListScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Status List Screen</Text>
      <Button
        title="Open Chat"
        onPress={() => {clearAll()}}
        // onPress={() => navigation.navigate("Chat", { name: "Navjot" })}
      />
    </View>
  );
}
