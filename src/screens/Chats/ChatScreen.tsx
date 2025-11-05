import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { ChatHeader } from "../../components/ChatHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SendHorizontal from "../../assets/icons/send-horizontal.svg";
import Smile from "../../assets/icons/smile.svg";
import Camera from "../../assets/icons/camera.svg";
import Paperclip from "../../assets/icons/paperclip.svg";
import { useTheme } from "../../theme/ThemeProvider";
import { getMessagesService, sendMessageService } from "../../services/Chat";
import { socket } from "../../utils/socket"; // ← Import shared socket

const ChatScreen = ({ route }) => {
  const { chatId, chatDetails } = route.params || {};
  const currentUserId = "6906430f57f3e6a23395d41a";
  const receiverId = chatDetails?._id;
  const isGroup = chatDetails?.isGroup;
  const receiverPhone = chatDetails?.phoneSuffix + chatDetails?.phoneNumber;
  console.log(chatId, chatDetails, 'chatId, chatDetails');
  const { colors } = useTheme();
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<any>();
  const insets = useSafeAreaInsets();

  // Initialize socket connection 
  useEffect(() => {
    socket.connect();

    socket.emit("user_connected", currentUserId);
    console.log("📡 Socket connected with user:", currentUserId);

    // Listen for incoming messages
    socket.on("receive_message", (newMsg) => {
      console.log("📩 New message received:", newMsg);

      if (
        (newMsg.sender?._id === receiverId && newMsg.receiver?._id === currentUserId) ||
        (newMsg.sender?._id === currentUserId && newMsg.receiver?._id === receiverId)
      ) {
        const formattedMsg = {
          id: newMsg._id,
          text: newMsg.content,
          isOwn: newMsg.sender?._id === currentUserId,
          time: new Date(newMsg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, formattedMsg]);
      }
    });

    // Cleanup when screen unmounts
    return () => {
      socket.off("receive_message");
      socket.disconnect();
      console.log("❌ Socket disconnected");
    };
  }, []);

  // Fetch messages 
  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    try {
      setIsLoading(true);
      const query = `/${chatId}/messages`;
      const response = await getMessagesService(query);

      if (response?.data?.data) {
        const formatted = response.data.data.map((msg: any) => ({
          id: msg._id,
          text: msg.content,
          isOwn: msg.sender?._id === currentUserId,
          time: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));
        setMessages(formatted);
      }
    } catch (error) {
      console.log("❌ getMessages error:", error?.response?.data || error);
    } finally {
      setIsLoading(false);
    }
  };

  // Send message 
  const onSend = async () => {
    if (!message.trim()) return;

    const tempMsg = {
      id: Date.now().toString(),
      text: message,
      isOwn: true,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const payloadGroupChat = {
      senderId: currentUserId,
      receiverId: isGroup ? null : receiverId,
      groupId: isGroup ? chatId : null,
      content: message,
      messageStatus: "sent",
    };


    setMessages((prev) => [...prev, tempMsg]);
    setMessage("");
    try {
      const payload = {
        senderId: currentUserId,
        receiverId,
        content: message,
        messageStatus: "sent",
      };
      const response = await sendMessageService(payload);
      if (response?.data?.data) {
        console.log("✅ Message sent:", response.data.data);
      }
    } catch (error) {
      console.log("❌ sendMessage error:", error?.response?.data || error);
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        {
          alignSelf: item.isOwn ? "flex-end" : "flex-start",
          backgroundColor: item.isOwn ? colors.primary + "33" : "#f1f1f1",
        },
      ]}
    >
      {isGroup && !item.isOwn && (
        <Text style={{ fontSize: 12, color: "#666", marginBottom: 2 }}>
          {item.senderName}
        </Text>
      )}
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container]}>
      <ChatHeader
        name={isGroup ? chatDetails.groupName : receiverPhone}
        time={isGroup ? `${chatDetails.participants.length} members` : "online"}
      // name={receiverPhone} time="online" 
      />

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={{ padding: 16 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={[styles.inputContainer, { marginBottom: insets.bottom }]}>
          <TouchableOpacity>
            <Smile style={styles.icon} />
          </TouchableOpacity>
          <TextInput
            style={[styles.input]}
            placeholder="Type a message..."
            placeholderTextColor="#888"
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity>
            <Paperclip style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Camera style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSend}
            style={[styles.sendButton, { backgroundColor: colors.primary }]}
          >
            <SendHorizontal width={20} height={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messageBubble: {
    marginVertical: 4,
    borderRadius: 12,
    padding: 10,
    maxWidth: "80%",
  },
  messageText: {
    color: "#222",
    fontSize: 15,
  },
  messageTime: {
    color: "#777",
    fontSize: 11,
    alignSelf: "flex-end",
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#eee",
    padding: 8,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    color: "#222",
    marginHorizontal: 6,
  },
  sendButton: {
    padding: 10,
    borderRadius: 20,
  },
  icon: {
    marginHorizontal: 6,
    color: "#333",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

