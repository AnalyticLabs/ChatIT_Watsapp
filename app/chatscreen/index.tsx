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
  KeyboardAvoidingView,
  Platform,
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

const EMOJIS = ["👍", "❤️", "😂", "😮", "😢"];
// const EMOJIS = ["👍", "❤️", "😂", "😮", "😢", "👏"];

export default function ChatScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<any>(null);

  const [reactionModalVisible, setReactionModalVisible] = useState(false);
  const [messageToReact, setMessageToReact] = useState<any>(null);

  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [imageToShow, setImageToShow] = useState<string | null>(null);

  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [videoToPlay, setVideoToPlay] = useState<string | null>(null);

  const [isTyping, setIsTyping] = useState(false);
  const [lastReadId, setLastReadId] = useState<string | null>(null);

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

  //   Get today's date for message date separator
    const todayDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

  const handleScroll = (e: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    const isNearBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 100;
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
      console.error(err);
    }
  };

  useEffect(() => {
    if (!selectedChatId) return;
    async function setup() {
      const res = await axiosInstance.get("/chat/conversations");
      const conv = res.data.data.find((c: any) =>
        c.participants.some((p: any) => p._id === selectedChatId)
      );
      setConversationId(conv?._id ?? null);
    }
    setup();
  }, [selectedChatId]);

  useEffect(() => {
    fetchMessages();
  }, [conversationId]);

  // Scroll on new messages
  useEffect(() => {
    if (messages.length) {
      const t = setTimeout(() => scrollToBottom(), 100);
      return () => clearTimeout(t);
    }
  }, [messages]);

  useEffect(() => {
    const onReceive = (msg: any) => {
      if (msg.conversation === conversationId) {
        setMessages((prev) => [...prev, msg]);
        socket.emit("mark_read", { messageId: msg._id, conversationId });
        setLastReadId(msg._id);
      }
    };
    const onTyping = ({ from }: { from: string }) => {
      if (from === selectedChatId) setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    };

    socket.on("receive_message", onReceive);
    socket.on("typing", onTyping);

    return () => {
      socket.off("receive_message", onReceive);
      socket.off("typing", onTyping);
    };
  }, [conversationId, selectedChatId]);

  const handleMessageSent = (newMsg: any) => {
    setMessages((prev) => [...prev, newMsg]);
    scrollToBottom();
  };

  // Delete message modal handlers
  const onLongPressMessage = (msg: any) => {
    setMessageToDelete(msg);
    setDeleteModalVisible(true);
  };

  const deleteMessage = async () => {
    if (!messageToDelete) return;
    try {
      await axiosInstance.delete(`/chat/messages/${messageToDelete._id}`);
      setMessages((prev) =>
        prev.filter((m) => m._id !== messageToDelete._id)
      );
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
    setMessageToDelete(null);
    setDeleteModalVisible(false);
  };

  // Reaction modal handlers
  const openReactionModal = (msg: any) => {
    if (msg.sender._id === currentUser?._id) return; // prevent reacting to own msg
    setMessageToReact(msg);
    setReactionModalVisible(true);
  };

  const addReaction = (emoji: string) => {
    if (!messageToReact || messageToReact.sender._id === currentUser._id) return;

    setMessages((prevMessages) =>
      prevMessages.map((m) => {
        if (m._id === messageToReact._id) {
          const userReactions = m.userReactions || {};
          const current = userReactions[currentUser._id];

          const newUserReactions =
            current === emoji
              ? Object.fromEntries(Object.entries(userReactions).filter(([uid]) => uid !== currentUser._id))
              : { ...userReactions, [currentUser._id]: emoji };

          return { ...m, userReactions: newUserReactions };
        }
        return m;
      })
    );

    setReactionModalVisible(false);
  };

  // Aggregate reactions count from userReactions map
  const aggregateReactions = (userReactions: Record<string, string>) => {
    const agg: Record<string, number> = {};
    Object.values(userReactions).forEach((emoji) => {
      agg[emoji] = (agg[emoji] || 0) + 1;
    });
    return agg;
  };

  // Render reactions badges below text messages (still keep for text)
  const renderReactions = (msg: any) => {
    if (!msg.userReactions) return null;

    const agg = aggregateReactions(msg.userReactions);
    const emojis = Object.keys(agg);
    if (emojis.length === 0) return null;

    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: 4,
          marginLeft: 8,
          flexWrap: "wrap",
        }}
      >
        {emojis.map((emoji) => {
          const count = agg[emoji];
          const reactedByUser = Object.entries(msg.userReactions).some(
            ([userId, e]) => userId === currentUser._id && e === emoji
          );
          return (
            <TouchableOpacity
              key={emoji}
              onPress={() => addReaction(emoji)} // toggle reaction on tap
              style={{
                backgroundColor: reactedByUser ? "#3b82f6" : "#2c2f33",
                paddingHorizontal: 6,
                paddingVertical: 2,
                borderRadius: 12,
                marginRight: 6,
                marginBottom: 4,
                flexDirection: "row",
                alignItems: "center",
              }}
              activeOpacity={0.7}
            >
              <Text
                style={{ color: reactedByUser ? "white" : "lightgray", fontSize: 14 }}
              >
                {emoji} {count}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  // Render single user's reaction as floating badge for ALL messages (text/image/video)
  const renderSingleReactionBadge = (msg: any) => {
    if (!msg.userReactions) return null;
    const userEmoji = msg.userReactions[currentUser._id];
    if (!userEmoji) return null;

    return (
      <View
        style={{
          position: "absolute",
          bottom: -10, // half outside
          right: -10, // half outside
          backgroundColor: "#3b82f6",
          borderRadius: 12,
          paddingHorizontal: 6,
          paddingVertical: 2,
          zIndex: 10,
          elevation: 10,
          shadowColor: "#000",
          shadowOpacity: 0.3,
          shadowRadius: 3,
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>{userEmoji}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1 bg-white dark:bg-[#0e0c19]">
        <ChatHeader
          name={name}
          time={time}
          imageUrl={imageUrl}
          onBack={() => router.back()}
          isGroup={false}
          baseRoute="/call"
          chatId={selectedChatId ?? ""}
          receiverId={selectedChatId ?? ""}
        />

        <View className="flex-1">
          {conversationId ? (
            <ScrollView
              ref={scrollViewRef}
              className="px-2 py-2 space-y-2"
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              {/* Example date separator, you can add logic to show dynamic dates */}
              <View className="self-center bg-[#1f2c34] px-3 py-1 rounded-full my-2">
                <Text className="text-white text-xs">{todayDate}</Text>
              </View>

              {messages.map((msg, idx) => {
                const mine = msg.sender._id === currentUser?._id;
                const t = new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true
                });
                const showRead = msg._id === lastReadId && !mine;

                return (
                  <Pressable
                    key={msg._id ?? idx}
                    onLongPress={() => onLongPressMessage(msg)}
                    onPress={() => openReactionModal(msg)}
                    className={`mb-3 max-w-[80%] px-4 py-2 rounded-xl ${mine ? "self-end bg-blue-600" : "self-start bg-[#202c33]"
                      }`}
                    style={{ position: "relative" }} // Important for badge position
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

                    {renderSingleReactionBadge(msg)}

                    {msg.contentType === "text" && renderReactions(msg)}

                    <View className="flex-row justify-end items-center mt-1">
                      <Text
                        className={`text-xs ${mine ? "text-gray-100" : "text-gray-400"
                          }`}
                      >
                        {t} {mine && <MessageStatus status={msg.status} />}
                        {showRead && (
                          <Text className="text-xs text-green-400 ml-1">read</Text>
                        )}
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

        {/* Delete confirmation modal */}
        <Modal
          visible={deleteModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setDeleteModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
              padding: 20,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                padding: 20,
                width: "80%",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, marginBottom: 20 }}>
                Are you sure you want to delete this message?
              </Text>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around", width: "100%" }}
              >
                <TouchableOpacity
                  onPress={() => setDeleteModalVisible(false)}
                  style={{
                    backgroundColor: "#ccc",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 6,
                  }}
                >
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={deleteMessage}
                  style={{
                    backgroundColor: "red",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 6,
                  }}
                >
                  <Text style={{ color: "white" }}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Reaction selector modal */}
        <Modal
          visible={reactionModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setReactionModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
              padding: 20,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                padding: 10,
                flexDirection: "row",
                justifyContent: "space-around",
                width: "80%",
              }}
            >
              {EMOJIS.map((emoji) => (
                <TouchableOpacity
                  key={emoji}
                  onPress={() => addReaction(emoji)}
                  style={{
                    padding: 10,
                  }}
                >
                  <Text style={{ fontSize: 28 }}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              onPress={() => setReactionModalVisible(false)}
              style={{
                marginTop: 16,
                backgroundColor: "#ccc",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 6,
              }}
            >
              <Text style={{ fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {imageModalVisible && (
          <Modal
            visible
            transparent
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
        )}

        {videoModalVisible && (
          <Modal
            visible
            transparent
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
        )}

        <View className="bg-[#0B141A]">
          <ChatInputBox
            senderId={currentUser?._id ?? ""}
            receiverId={selectedChatId ?? ""}
            socket={socket}
            onMessageSent={handleMessageSent}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

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
