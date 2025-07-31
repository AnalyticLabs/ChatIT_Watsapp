import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Modal,
  Image,
} from "react-native";
import { ChevronsDown } from "lucide-react-native";
import { ChatHeader } from "~/components/ChatHeader";
import { router } from "expo-router";
import { ChatInputBox } from "~/components/ChatInputBox";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import axiosInstance from "~/config/axiosInstance";
import socket from "~/lib/socket/socket";
import { Video, ResizeMode } from "expo-av";

const MessageStatus = ({ status }: { status: string }) => {
  switch (status) {
    case "sent":
      return <Text className="ml-1 text-white">✓</Text>;
    case "delivered":
      return <Text className="ml-1 text-white">✓✓</Text>;
    case "seen":
      return <Text className="ml-1 text-blue-400">✓✓</Text>;
    default:
      return null;
  }
};

export default function ChatScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<any>(null);

  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [imageToShow, setImageToShow] = useState<string | null>(null);

  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [videoToPlay, setVideoToPlay] = useState<string | null>(null);

  const currentUser = useSelector((state: RootState) => state.auth.user);

  const selectedChatId = useSelector(
    (state: RootState) => state.dashboard.selectedChatId
  );

  const profile = useSelector((state: RootState) =>
    state.dashboard.profileData.find((item) => item.id === selectedChatId)
  );

  const name = profile?.name ?? "Unknown";
  const time = profile?.time ?? "";
  const imageUrl = profile?.avatar
    ? { uri: profile.avatar }
    : require("../../assets/images/Avtar.png");

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
    setShowScrollToBottom(false);
  };

  const handleScroll = (event: any) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;

    const isNearBottom = yOffset + layoutHeight >= contentHeight - 100;
    setShowScrollToBottom(!isNearBottom);
  };

  const fetchMessages = async () => {
    if (!conversationId) return;

    try {
      const res = await axiosInstance.get(
        `/chat/conversations/${conversationId}/messages`
      );
      setMessages(res.data.data);
      scrollToBottom();
    } catch (err) {
      console.error("Fetch messages error:", err);
    }
  };

  useEffect(() => {
    if (!selectedChatId) return;

    const fetchOrCreateConversation = async () => {
      try {
        const res = await axiosInstance.get("/chat/conversations");
        const conv = res.data.data.find((c: any) =>
          c.participants.some((p: any) => p._id === selectedChatId)
        );

        if (conv) {
          setConversationId(conv._id);
        } else {
          setConversationId(null);
          setMessages([]);
        }
      } catch (err) {
        console.error("Error getting conversation:", err);
      }
    };

    fetchOrCreateConversation();
  }, [selectedChatId]);

  useEffect(() => {
    fetchMessages();
  }, [conversationId]);

  useEffect(() => {
    const handleReceive = (newMessage: any) => {
      if (newMessage.conversation === conversationId) {
        setMessages((prev) => [...prev, newMessage]);
        scrollToBottom();
      }
    };
    socket.on("receive_message", handleReceive);
    return () => {
      socket.off("receive_message", handleReceive);
    };
  }, [conversationId]);

  const handleMessageSent = (newMsg: any) => {
    setMessages((prev) => [...prev, newMsg]);
    if (!conversationId && newMsg.conversation) {
      setConversationId(newMsg.conversation);
    }
    scrollToBottom();
  };

  const onLongPressMessage = (msg: any) => {
    setMessageToDelete(msg);
    setDeleteModalVisible(true);
  };

  const deleteMessage = async () => {
    if (!messageToDelete) return;
    try {
      await axiosInstance.delete(`/chat/messages/${messageToDelete._id}`);
      setMessages((prev) =>
        prev.filter((msg) => msg._id !== messageToDelete._id)
      );
      setDeleteModalVisible(false);
      setMessageToDelete(null);
    } catch (err) {
      console.error("Delete message error:", err);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#0e0c19]">
      <ChatHeader
        name={name}
        time={time}
        imageUrl={imageUrl}
        onBack={() => router.back()}
        isGroup={false}
        baseRoute="/call"
        chatId={selectedChatId ?? ""}
      />

      <View className="flex-1">
        {conversationId ? (
          <ScrollView
            ref={scrollViewRef}
            className="px-2 py-2 space-y-2"
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {messages.map((msg, index) => {
              const isOwnMessage = msg.sender._id === currentUser?._id;
              const time = new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <Pressable
                  key={msg._id || index}
                  onLongPress={() => onLongPressMessage(msg)}
                  className={`mb-3 max-w-[80%] px-4 py-2 rounded-xl ${isOwnMessage ? "self-end bg-blue-600" : "self-start bg-[#202c33]"
                    }`}
                >
                  {msg.contentType === "image" ? (
                    <Pressable
                      onPress={() => {
                        setImageToShow(msg.imageOrVideoUrl);
                        setImageModalVisible(true);
                      }}
                    >
                      <Image
                        source={{ uri: msg.imageOrVideoUrl }}
                        style={{ width: 200, height: 200, borderRadius: 10 }}
                        resizeMode={ResizeMode.COVER}
                      />
                    </Pressable>
                  ) : msg.contentType === "video" ? (
                    <Pressable
                      onPress={() => {
                        setVideoToPlay(msg.imageOrVideoUrl);
                        setVideoModalVisible(true);
                      }}
                      style={{ position: "relative" }}
                    >
                      <Video
                        source={{ uri: msg.imageOrVideoUrl }}
                        style={{ width: 200, height: 200, borderRadius: 10 }}
                        resizeMode={ResizeMode.COVER}
                        shouldPlay={false}
                        isMuted
                      />
                      <View
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: 200,
                          height: 200,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: "rgba(0,0,0,0.6)",
                            width: 48,
                            height: 48,
                            borderRadius: 24,
                            paddingBottom: 8,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text style={{ color: "white", fontSize: 24 }}>▶</Text>
                        </View>
                      </View>
                    </Pressable>

                  ) : (
                    <Text className="text-white text-base">{msg.content}</Text>
                  )}

                  <View className="flex-row justify-end items-center mt-1">
                    <Text
                      className={`text-xs ${isOwnMessage ? "text-gray-100" : "text-gray-400"
                        }`}
                    >
                      {time}  {<MessageStatus status={msg.status} />}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500 text-lg">
              No messages yet. Start the conversation!
            </Text>
          </View>
        )}

        {showScrollToBottom && (
          <TouchableOpacity
            onPress={scrollToBottom}
            className="absolute bottom-4 right-4 bg-gray-800 p-2 rounded-full"
          >
            <ChevronsDown size={24} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      <Modal
        visible={deleteModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 px-4">
          <View className="bg-white p-6 rounded-xl w-full max-w-sm">
            <Text className="text-lg font-semibold mb-4">
              Delete this message?
            </Text>
            <View className="flex-row justify-end gap-4">
              <TouchableOpacity
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text className="text-blue-600 font-medium">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteMessage}>
                <Text className="text-red-600 font-medium">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={imageModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setImageModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/90">
          <TouchableOpacity
            className="absolute top-10 right-6 z-10"
            onPress={() => setImageModalVisible(false)}
          >
            <Text className="text-white text-lg font-bold">Close</Text>
          </TouchableOpacity>

          <Image
            source={{ uri: imageToShow! }}
            style={{ width: "90%", height: "80%", borderRadius: 10 }}
            resizeMode="contain"
          />
        </View>
      </Modal>

      <Modal
        visible={videoModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setVideoModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/90">
          <TouchableOpacity
            className="absolute top-10 right-6 z-10"
            onPress={() => setVideoModalVisible(false)}
          >
            <Text className="text-white text-lg font-bold">Close</Text>
          </TouchableOpacity>

          <Video
            source={{ uri: videoToPlay! }}
            style={{ width: "90%", height: "80%", borderRadius: 10 }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay
          />
        </View>
      </Modal>

      <View className="bg-[#0B141A]">
        <ChatInputBox
          senderId={currentUser?._id ?? ""}
          receiverId={selectedChatId ?? ""}
          socket={socket}
          onMessageSent={handleMessageSent}
        />
      </View>
    </SafeAreaView>
  );
}

