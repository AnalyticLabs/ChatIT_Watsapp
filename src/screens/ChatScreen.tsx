import React, { useEffect, useState } from "react";
import { View, TextInput, Button, FlatList, Text, TouchableOpacity } from "react-native";
import { useSocket } from "../services/socket";
import { api } from "../services/api";

export default function ChatScreen({ route }: any) {
  const { conversationId, token } = route.params;
  const socketRef = useSocket(token);
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await api.get(`/api/messages/${conversationId}`);
      setMessages(res.data);
    };
    fetchMessages();
  }, [conversationId]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;
    socket.emit("join_room", conversationId);
    socket.on("message", (msg:any) => {
      if (msg.conversationId === conversationId) {
        setMessages(prev => [msg, ...prev]);
      }
    });
    return () => {
      socket.emit("leave_room", conversationId);
      socket.off("message");
    };
  }, [socketRef.current]);

  const sendText = () => {
    const socket = socketRef.current;
    socket?.emit("send_message", { conversationId, content: text, type: "text" });
    setText("");
  };

  const search = async () => {
    const res = await api.get(`/api/messages/${conversationId}/search`, { params: { q: query } });
    setMessages(res.data);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', padding: 8 }}>
        <TextInput style={{ flex: 1, borderWidth: 1 }} value={query} onChangeText={setQuery} placeholder="Search messages" />
        <Button title="Search" onPress={search} />
      </View>
      <FlatList data={messages} inverted keyExtractor={(i:any)=>i._id} renderItem={({item})=>(
        <View style={{ padding: 8 }}>
          <Text>{item.content}</Text>
        </View>
      )} />
      <View style={{ flexDirection: 'row', padding: 8 }}>
        <TextInput style={{ flex: 1, borderWidth: 1 }} value={text} onChangeText={setText} />
        <Button title="Send" onPress={sendText} />
      </View>
    </View>
  );
}
