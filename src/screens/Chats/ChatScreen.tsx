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
import { getGroupMessagesService, getMessagesService, sendGroupMessageService, sendMessageService } from "../../services/Chat";
import { socket } from "../../utils/socket"; // ← Import shared socket
import { navigationRef } from "../rootstack";
import { SCREENS } from "../../utils/constants";

const ChatScreen = ({ route }) => {
  const { chatId, chatDetails, currentUserId } = route.params || {};

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

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      socket.emit("user_connected", currentUserId);
    })
    console.log("Socket connected with user:", currentUserId);

    if (isGroup && chatId) {
      socket.emit("join_group", chatId);
      console.log("Joined group:", chatId);
    }

    socket.on("receive_message", (newMsg) => {
      console.log("Received message:");
      if (
        !isGroup && (
          (newMsg.sender?._id === receiverId && newMsg.receiver?._id === currentUserId) ||
          (newMsg.sender?._id === currentUserId && newMsg.receiver?._id === receiverId)
        )
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
        setMessages(prev => [...prev, formattedMsg]);
      }
    });

    socket.on("new_group_message", (newMsg) => {
      if (isGroup && newMsg.group === chatId) {
        const formattedMsg = {
          id: newMsg._id,
          text: newMsg.content,
          senderName: newMsg.sender?.username || "Unknown",
          senderAvatar: newMsg.sender?.profilePicture,
          isOwn: newMsg.sender?._id === currentUserId,
          time: new Date(newMsg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages(prev => [...prev, formattedMsg]);
      }
    });

    return () => {
      socket.off("receive_message");
      socket.off("new_group_message");
      socket.disconnect();
      console.log("Socket disconnected");
    };
  }, [isGroup, chatId, receiverId, currentUserId, messages]);


  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    let response: any;
    console.log("690b8a0182009f7a4be88cf8======", chatId);

    try {
      setIsLoading(true);
      const query = `/${chatId}/messages`;
      if (isGroup) {
        response = await getGroupMessagesService(chatId);
      } else {
        response = await getMessagesService(query);
      }
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

  const onSend = async () => {
    if (!message.trim()) return;

    const tempMsg = {
      id: Date.now().toString(),
      text: message,
      isOwn: true,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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

      if (isGroup) {
        const payloadGroupChat = {
          senderId: currentUserId,
          receiverId: isGroup ? null : receiverId,
          groupId: isGroup ? chatId : null,
          content: message,
          messageStatus: "sent",
        };
        const responseGroup = await sendGroupMessageService(payloadGroupChat);
        if (responseGroup?.data?.data) {
          console.log("Group message sent:", responseGroup.data.data);
          socket.emit("send_group_message", responseGroup.data.data);
        }
      } else {
        const response = await sendMessageService(payload);
        if (response?.data?.data) {
          socket.emit("send_message", response.data.data);
          console.log("Message sent:", response.data.data);
        }
      }
    } catch (error) {
      console.log("sendMessage error:", error?.response?.data || error);
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
        name={isGroup ? chatDetails.name : receiverPhone}
        time={isGroup ? `${chatDetails?.members?.length} members` : "online"}
        // name={receiverPhone} time="online" 
        // onCallPress={() => navigationRef.navigate(SCREENS.app,{screen:SCREENS.CallStackNavigator, params:{receiverPhone: receiverPhone}})}
        onCallPress={() =>
          navigationRef.navigate(SCREENS.app, {
            screen: SCREENS.CallStackNavigator, // which tab
            params: {
              screen: SCREENS.Call, // the screen inside CallStack
              params: { receiverPhone }, // your param
            },
          })
        }
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

