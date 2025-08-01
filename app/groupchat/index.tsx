// import {
//   View,
//   Text,
//   ScrollView,
//   SafeAreaView,
//   TouchableOpacity,
// } from "react-native";
// import { ChevronsDown } from "lucide-react-native";
// import { ChatHeader } from "~/components/ChatHeader";
// import { router } from "expo-router";
// import { ChatInputBox } from "~/components/ChatInputBox";
// import { useRef, useState } from "react";

// export default function GroupChatScreen() {
//   const scrollViewRef = useRef<ScrollView>(null);
//   const [showScrollToBottom, setShowScrollToBottom] = useState(false);

//   const handleScroll = (event: any) => {
//     const yOffset = event.nativeEvent.contentOffset.y;
//     const contentHeight = event.nativeEvent.contentSize.height;
//     const layoutHeight = event.nativeEvent.layoutMeasurement.height;

//     const isNearBottom = yOffset + layoutHeight >= contentHeight - 100;

//     setShowScrollToBottom(!isNearBottom);
//   };

//   const scrollToBottom = () => {
//     scrollViewRef.current?.scrollToEnd({ animated: true });
//     setShowScrollToBottom(false);
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-white dark:bg-[#0e0c19]">
//       {/* Header */}
//       <ChatHeader
//         name="Wybble Team"
//         time="10:34 AM"
//         imageUrl={require("../../assets/images/wybble-team.png")}
//         onBack={() => router.back()}
//         isGroup={true}
//         baseRoute="/groupcall"
//       />

//       {/* Chat Body */}
//       <View className="flex-1">
//         <ScrollView
//           ref={scrollViewRef}
//           className="px-2 py-2 space-y-2"
//           onScroll={handleScroll}
//           scrollEventThrottle={16}
//         >
//           {/* Date Separator */}
//           <View className="self-center bg-[#1f2c34] px-3 py-1 rounded-full my-2">
//             <Text className="text-white text-xs">March 20, 2025</Text>
//           </View>

//           {/* Sent Message */}
//           <View className="self-end mb-3 mr-3 bg-blue-600 rounded-xl px-4 py-2 max-w-[80%]">
//             <Text className="text-white text-base">Hii 🥲</Text>
//             <Text className="text-right text-gray-100 text-sm mt-1">
//               7:47 PM
//             </Text>
//           </View>

//           {/* Received Message */}
//           <View className="self-start mb-3 ml-3 bg-[#202c33] px-4 py-2 max-w-[80%] rounded-tr-xl rounded-tl-xl rounded-br-xl rounded-bl-md">
//             <Text className="text-white text-base">Helloo</Text>
//             <Text className="text-right text-gray-400 text-xm mt-1">
//               7:48 PM
//             </Text>
//           </View>
//         </ScrollView>

//         {/* Scroll to Bottom Button */}
//         {showScrollToBottom && (
//           <TouchableOpacity
//             onPress={scrollToBottom}
//             className="absolute bottom-4 right-4 bg-gray-800 p-2 rounded-full"
//           >
//             <ChevronsDown size={24} color="#fff" />
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* Input Field */}
//       <View className="bg-[#0B141A]">
//         <ChatInputBox />
//       </View>
//     </SafeAreaView>
//   );
// }





import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Pressable,
    Alert,
    ActivityIndicator,
    Modal,
    Image,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { ChevronsDown } from "lucide-react-native";
import { ChatHeader } from "~/components/ChatHeader";
import { GroupChatInputBox } from "~/components/GroupChatInputBox";
import { useAppDispatch } from "../../store";
import {
    fetchGroupMessages,
    sendGroupMessage,
    deleteGroupMessage,
} from "../../features/groupChat/groupChatActions";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { router } from "expo-router";
import { getGroupInfoAPI } from "~/api/groupChatApi";
import { Video, ResizeMode } from "expo-av";

type Message = {
    _id: string;
    sender: { _id: string; username: string };
    content: string;
    timestamp: string; // string like "7:42 PM"
    readBy: Array<{ _id: string; name: string }>;
    mediaUrl?: string;
    createdAt: string;
    contentType: "text" | "image" | "video";
    imageOrVideoUrl?: string;
    userReactions?: Record<string, string>; // userId: emoji
};


type GroupChatScreenProps = {
    groupId: string;
};


const EMOJIS = ["👍", "❤️", "😂", "😮", "😢"];

export default function GroupChatScreen({ groupId }: GroupChatScreenProps) {
    const dispatch = useAppDispatch();
    const scrollViewRef = useRef<ScrollView>(null);

    const [message, setMessage] = useState<any[]>([]);

    const [reactionModalVisible, setReactionModalVisible] = useState(false);
    const [messageToReact, setMessageToReact] = useState<any>(null);

    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [imageToShow, setImageToShow] = useState<string | null>(null);

    const [videoModalVisible, setVideoModalVisible] = useState(false);
    const [videoToPlay, setVideoToPlay] = useState<string | null>(null);

    // Get logged in user id from auth slice
    const currentUserId = useSelector((state: RootState) => state.auth.user?._id);

    // Redux state selectors
    const messages: Message[] = useSelector(
        (state: RootState) => state.groupChat.messages[groupId] || []
    );
    const loading = useSelector(
        (state: RootState) => state.groupChat.getGroupMessagesLoading
    );

    // Local UI state
    const [showScrollToBottom, setShowScrollToBottom] = useState(false);
    const [typingUsers, setTypingUsers] = useState<string[]>([]); // placeholder for typing indicator

    // Fetch group messages on mount
    useEffect(() => {
        dispatch(fetchGroupMessages(groupId));
    }, [dispatch, groupId]);

    const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    // Scroll handler for showing scroll-to-bottom button
    const handleScroll = (event: any) => {
        const yOffset = event.nativeEvent.contentOffset.y;
        const contentHeight = event.nativeEvent.contentSize.height;
        const layoutHeight = event.nativeEvent.layoutMeasurement.height;

        const isNearBottom = yOffset + layoutHeight >= contentHeight - 100;

        setShowScrollToBottom(!isNearBottom);
    };

    // Scroll to bottom function
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

    // Confirm and delete message (only own messages)
    const onLongPressMessage = (messageId: string) => {
        Alert.alert("Delete Message?", "Are you sure you want to delete this message?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: () => dispatch(deleteGroupMessage(messageId)),
            },
        ]);
    };

    // Handle sending a new message
    const onSendMessage = (text: string) => {
        if (typeof text !== "string" || !text.trim()) return;

        if (!groupId || !currentUserId) return;

        dispatch(
            sendGroupMessage({
                groupId,
                senderId: currentUserId || "User", // fallback to empty string if undefined
                content: text,
                messageStatus: "sent",
            })
        ).then(() => scrollToBottom());
    };

    // Render each message bubble with sender name and read receipts
    const renderMessage = (message: Message) => {
        const isMe = message.sender._id === currentUserId;

        return (
            <Pressable
                key={message._id}
                onLongPress={() => {
                    if (isMe) onLongPressMessage(message._id);
                }}
                style={{
                    alignSelf: isMe ? "flex-end" : "flex-start",
                    backgroundColor: isMe ? "#3b82f6" : "#202c33",
                    borderRadius: 12,
                    padding: 10,
                    marginVertical: 4,
                    maxWidth: "80%",
                }}
            >
                {/* Sender name above message if not current user */}
                {(
                    <Text style={{ fontWeight: "bold", fontSize: 12, color: "black", marginBottom: 4 }}>
                        {message.sender.username}
                    </Text>
                )}

                {/* Message text */}
                {/* <Text style={{ color: "#fff", fontSize: 16 }}>{message.content}</Text> */}

                
                    {message.contentType === "image" ? (
                        <Pressable
                            onPress={() => {
                                setImageToShow(message.imageOrVideoUrl ?? null);
                                setImageModalVisible(true);
                            }}
                        >
                            <Image
                                source={{ uri: message.imageOrVideoUrl ?? "" }}
                                style={{ width: 200, height: 200, borderRadius: 10 }}
                                resizeMode={ResizeMode.COVER}
                            />
                        </Pressable>
                    ) : message.contentType === "video" ? (
                        <Pressable
                            onPress={() => {
                                setVideoToPlay(message.imageOrVideoUrl ?? null);
                                setVideoModalVisible(true);
                            }}
                        >
                            <Video
                                source={{ uri: message.imageOrVideoUrl ?? "" }}
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
                        <Text className="text-white text-base">{message.content}</Text>
                    )}

                    {/* Timestamp */}
                    <Text style={{ color: "#ddd", fontSize: 12, marginTop: 4, textAlign: "right" }}>
                        {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </Text>

                    {/* Read receipts below own messages */}
                    {isMe && message.readBy.length > 0 && (
                        <Text style={{ fontSize: 10, color: "#a0aec0", marginTop: 2 }}>
                            Read by {message.readBy.map((u) => u.name).join(", ")}
                        </Text>
                    )}
                </Pressable>
                );
    };


    // Reaction modal handlers
    const openReactionModal = (message: any) => {
        if (message.sender._id === currentUserId) return; // prevent reacting to own message
                setMessageToReact(message);
                setReactionModalVisible(true);
    };

    const addReaction = (emoji: string) => {
        if (!messageToReact || messageToReact.sender._id === currentUserId) return;

        setMessage((prevMessages) =>
            prevMessages.map((m) => {
                if (m._id === messageToReact._id) {
                    const userReactions = m.userReactions || { };
                const current = userReactions[currentUserId];

                const newUserReactions =
                current === emoji
                            ? Object.fromEntries(Object.entries(userReactions).filter(([uid]) => uid !== currentUserId))
                : {...userReactions, [currentUserId]: emoji };

                return {...m, userReactions: newUserReactions };
                }
                return m;
            })
                );

                setReactionModalVisible(false);
    };

                // Aggregate reactions count from userReactions map
                const aggregateReactions = (userReactions: Record<string, string>) => {
        const agg: Record<string, number> = { };
        Object.values(userReactions).forEach((emoji) => {
                    agg[emoji] = (agg[emoji] || 0) + 1;
        });
                return agg;
    };

    // Render reactions badges below text messages (still keep for text)
    const renderReactions = (message: any) => {
        if (!message.userReactions) return null;

                const agg = aggregateReactions(message.userReactions);
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
                        const reactedByUser = Object.entries(message.userReactions).some(
                            ([userId, e]) => userId === currentUserId && e === emoji
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
    const renderSingleReactionBadge = (message: any) => {
        if (!message.userReactions) return null;
                const userEmoji = message.userReactions[currentUserId];
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

    // Typing indicator text (simple placeholder)
    const typingIndicatorText = () => {
        if (typingUsers.length === 0) return null;
                if (typingUsers.length === 1) return `${typingUsers[0]} is typing...`;
                if (typingUsers.length === 2)
                return `${typingUsers[0]} and ${typingUsers[1]} are typing...`;
                return `${typingUsers.length} people are typing...`;
    };

                return (
                <SafeAreaView className="flex-1 bg-white dark:bg-[#0e0c19]">
                    {/* Header */}
                    <ChatHeader
                        name="Wybble Team"
                        time={currentTime}
                        imageUrl={require("../../assets/images/wybble-team.png")}
                        onBack={() => router.back()}
                        isGroup={true}
                        baseRoute="/groupcall"
                        chatId={groupId}
                    />

                    {/* Chat messages area */}
                    <View className="flex-1 relative">
                        {loading && (
                            <View
                                style={{
                                    position: "absolute",
                                    top: 20,
                                    left: 0,
                                    right: 0,
                                    alignItems: "center",
                                    zIndex: 10,
                                }}
                            >
                                <ActivityIndicator size="small" color="#3b82f6" />
                            </View>
                        )}

                        <ScrollView
                            ref={scrollViewRef}
                            className="px-2 py-2"
                            onScroll={handleScroll}
                            scrollEventThrottle={16}
                        >
                            {/* Example date separator, you can add logic to show dynamic dates */}
                            <View className="self-center bg-[#1f2c34] px-3 py-1 rounded-full my-2">
                                <Text className="text-white text-xs">{todayDate}</Text>
                            </View>

                            {/* Render all messages */}
                            {messages.map(renderMessage)}
                        </ScrollView>

                        {/* Typing indicator */}
                        {typingUsers.length > 0 && (
                            <View
                                style={{
                                    position: "absolute",
                                    bottom: 60,
                                    left: 10,
                                    right: 10,
                                    backgroundColor: "#1f2c34",
                                    padding: 6,
                                    borderRadius: 12,
                                    alignItems: "center",
                                }}
                            >
                                <Text style={{ color: "#a0aec0", fontStyle: "italic" }}>
                                    {typingIndicatorText()}
                                </Text>
                            </View>
                        )}

                        {/* Scroll to bottom button */}
                        {showScrollToBottom && (
                            <TouchableOpacity
                                onPress={scrollToBottom}
                                style={{
                                    position: "absolute",
                                    bottom: 10,
                                    right: 10,
                                    backgroundColor: "#4b5563",
                                    padding: 10,
                                    borderRadius: 30,
                                    zIndex: 10,
                                }}
                            >
                                <ChevronsDown size={24} color="#fff" />
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Input box for sending messages */}
                    <View className="bg-[#0B141A]">
                        <GroupChatInputBox
                            onMessageSent={onSendMessage}
                            senderId={currentUserId || ""}
                            groupId={groupId}
                        />
                    </View>
                </SafeAreaView>
                );
}



