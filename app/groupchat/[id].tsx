// app/groupchat/[id].tsx
import React from "react";
import { useLocalSearchParams } from "expo-router";
import GroupChatScreen from "~/app/groupchat/index";

export interface GroupChatScreenProps {
  groupId: string;
}

export default function GroupChatPage() {
  const { id } = useLocalSearchParams();
  return <GroupChatScreen groupId={id as string} />;
}