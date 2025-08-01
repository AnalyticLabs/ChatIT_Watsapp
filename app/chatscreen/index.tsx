// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   SafeAreaView,
//   TouchableOpacity,
//   Pressable,
//   Modal,
//   Image,
// } from "react-native";
// import { ChevronsDown } from "lucide-react-native";
// import { ChatHeader } from "~/components/ChatHeader";
// import { router } from "expo-router";
// import { ChatInputBox } from "~/components/ChatInputBox";
// import { useSelector } from "react-redux";
// import { RootState } from "~/store";
// import axiosInstance from "~/config/axiosInstance";
// import socket from "~/lib/socket/socket";
// import { Video, ResizeMode } from "expo-av";

// const MessageStatus = ({ status }: { status: string }) => {
//   switch (status) {
//     case "sent":
//       return <Text className="ml-1 text-white">✓</Text>;
//     case "delivered":
//       return <Text className="ml-1 text-white">✓✓</Text>;
//     case "seen":
//       return <Text className="ml-1 text-blue-400">✓✓</Text>;
//     default:
//       return null;
//   }
// };

// export default function ChatScreen() {
//   const scrollViewRef = useRef<ScrollView>(null);
//   const [showScrollToBottom, setShowScrollToBottom] = useState(false);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [conversationId, setConversationId] = useState<string | null>(null);

//   const [deleteModalVisible, setDeleteModalVisible] = useState(false);
//   const [messageToDelete, setMessageToDelete] = useState<any>(null);

//   const [imageModalVisible, setImageModalVisible] = useState(false);
//   const [imageToShow, setImageToShow] = useState<string | null>(null);

//   const [videoModalVisible, setVideoModalVisible] = useState(false);
//   const [videoToPlay, setVideoToPlay] = useState<string | null>(null);

//   const currentUser = useSelector((state: RootState) => state.auth.user);

//   const selectedChatId = useSelector(
//     (state: RootState) => state.dashboard.selectedChatId
//   );

//   const profile = useSelector((state: RootState) =>
//     state.dashboard.profileData.find((item) => item.id === selectedChatId)
//   );

//   const name = profile?.name ?? "Unknown";
//   const time = profile?.time ?? "";
//   const imageUrl = profile?.avatar
//     ? { uri: profile.avatar }
//     : require("../../assets/images/Avtar.png");

//   const scrollToBottom = () => {
//     scrollViewRef.current?.scrollToEnd({ animated: true });
//     setShowScrollToBottom(false);
//   };

//   const handleScroll = (event: any) => {
//     const yOffset = event.nativeEvent.contentOffset.y;
//     const contentHeight = event.nativeEvent.contentSize.height;
//     const layoutHeight = event.nativeEvent.layoutMeasurement.height;

//     const isNearBottom = yOffset + layoutHeight >= contentHeight - 100;
//     setShowScrollToBottom(!isNearBottom);
//   };

//   const fetchMessages = async () => {
//     if (!conversationId) return;

//     try {
//       const res = await axiosInstance.get(
//         `/chat/conversations/${conversationId}/messages`
//       );
//       setMessages(res.data.data);
//       scrollToBottom();
//     } catch (err) {
//       console.error("Fetch messages error:", err);
//     }
//   };

//   useEffect(() => {
//     if (!selectedChatId) return;

//     const fetchOrCreateConversation = async () => {
//       try {
//         const res = await axiosInstance.get("/chat/conversations");
//         const conv = res.data.data.find((c: any) =>
//           c.participants.some((p: any) => p._id === selectedChatId)
//         );

//         if (conv) {
//           setConversationId(conv._id);
//         } else {
//           setConversationId(null);
//           setMessages([]);
//         }
//       } catch (err) {
//         console.error("Error getting conversation:", err);
//       }
//     };

//     fetchOrCreateConversation();
//   }, [selectedChatId]);

//   useEffect(() => {
//     fetchMessages();
//   }, [conversationId]);

//   useEffect(() => {
//     const handleReceive = (newMessage: any) => {
//       if (newMessage.conversation === conversationId) {
//         setMessages((prev) => [...prev, newMessage]);
//         scrollToBottom();
//       }
//     };
//     socket.on("receive_message", handleReceive);
//     return () => {
//       socket.off("receive_message", handleReceive);
//     };
//   }, [conversationId]);

//   const handleMessageSent = (newMsg: any) => {
//     setMessages((prev) => [...prev, newMsg]);
//     if (!conversationId && newMsg.conversation) {
//       setConversationId(newMsg.conversation);
//     }
//     scrollToBottom();
//   };

//   const onLongPressMessage = (msg: any) => {
//     setMessageToDelete(msg);
//     setDeleteModalVisible(true);
//   };

//   const deleteMessage = async () => {
//     if (!messageToDelete) return;
//     try {
//       await axiosInstance.delete(`/chat/messages/${messageToDelete._id}`);
//       setMessages((prev) =>
//         prev.filter((msg) => msg._id !== messageToDelete._id)
//       );
//       setDeleteModalVisible(false);
//       setMessageToDelete(null);
//     } catch (err) {
//       console.error("Delete message error:", err);
//     }
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-white dark:bg-[#0e0c19]">
//       <ChatHeader
//         name={name}
//         time={time}
//         imageUrl={imageUrl}
//         onBack={() => router.back()}
//         isGroup={false}
//         baseRoute="/call"
//         chatId={selectedChatId ?? ""}
//         receiverId={selectedChatId ?? ""}
//       />

//       <View className="flex-1">
//         {conversationId ? (
//           <ScrollView
//             ref={scrollViewRef}
//             className="px-2 py-2 space-y-2"
//             onScroll={handleScroll}
//             scrollEventThrottle={16}
//           >
//             {messages.map((msg, index) => {
//               const isOwnMessage = msg.sender._id === currentUser?._id;
//               const time = new Date(msg.createdAt).toLocaleTimeString([], {
//                 hour: "2-digit",
//                 minute: "2-digit",
//               });

//               return (
//                 <Pressable
//                   key={msg._id || index}
//                   onLongPress={() => onLongPressMessage(msg)}
//                   className={`mb-3 max-w-[80%] px-4 py-2 rounded-xl ${isOwnMessage ? "self-end bg-blue-600" : "self-start bg-[#202c33]"
//                     }`}
//                 >
//                   {msg.contentType === "image" ? (
//                     <Pressable
//                       onPress={() => {
//                         setImageToShow(msg.imageOrVideoUrl);
//                         setImageModalVisible(true);
//                       }}
//                     >
//                       <Image
//                         source={{ uri: msg.imageOrVideoUrl }}
//                         style={{ width: 200, height: 200, borderRadius: 10 }}
//                         resizeMode={ResizeMode.COVER}
//                       />
//                     </Pressable>
//                   ) : msg.contentType === "video" ? (
//                     <Pressable
//                       onPress={() => {
//                         setVideoToPlay(msg.imageOrVideoUrl);
//                         setVideoModalVisible(true);
//                       }}
//                       style={{ position: "relative" }}
//                     >
//                       <Video
//                         source={{ uri: msg.imageOrVideoUrl }}
//                         style={{ width: 200, height: 200, borderRadius: 10 }}
//                         resizeMode={ResizeMode.COVER}
//                         shouldPlay={false}
//                         isMuted
//                       />
//                       <View
//                         style={{
//                           position: "absolute",
//                           top: 0,
//                           left: 0,
//                           width: 200,
//                           height: 200,
//                           justifyContent: "center",
//                           alignItems: "center",
//                         }}
//                       >
//                         <View
//                           style={{
//                             backgroundColor: "rgba(0,0,0,0.6)",
//                             width: 48,
//                             height: 48,
//                             borderRadius: 24,
//                             paddingBottom: 8,
//                             justifyContent: "center",
//                             alignItems: "center",
//                           }}
//                         >
//                           <Text style={{ color: "white", fontSize: 24 }}>▶</Text>
//                         </View>
//                       </View>
//                     </Pressable>

//                   ) : (
//                     <Text className="text-white text-base">{msg.content}</Text>
//                   )}

//                   <View className="flex-row justify-end items-center mt-1">
//                     <Text
//                       className={`text-xs ${isOwnMessage ? "text-gray-100" : "text-gray-400"
//                         }`}
//                     >
//                       {time}  {<MessageStatus status={msg.status} />}
//                     </Text>
//                   </View>
//                 </Pressable>
//               );
//             })}
//           </ScrollView>
//         ) : (
//           <View className="flex-1 justify-center items-center">
//             <Text className="text-gray-500 text-lg">
//               No messages yet. Start the conversation!
//             </Text>
//           </View>
//         )}

//         {showScrollToBottom && (
//           <TouchableOpacity
//             onPress={scrollToBottom}
//             className="absolute bottom-4 right-4 bg-gray-800 p-2 rounded-full"
//           >
//             <ChevronsDown size={24} color="#fff" />
//           </TouchableOpacity>
//         )}
//       </View>

//       <Modal
//         visible={deleteModalVisible}
//         transparent={true}
//         animationType="fade"
//         onRequestClose={() => setDeleteModalVisible(false)}
//       >
//         <View className="flex-1 justify-center items-center bg-black/50 px-4">
//           <View className="bg-white p-6 rounded-xl w-full max-w-sm">
//             <Text className="text-lg font-semibold mb-4">
//               Delete this message?
//             </Text>
//             <View className="flex-row justify-end gap-4">
//               <TouchableOpacity
//                 onPress={() => setDeleteModalVisible(false)}
//               >
//                 <Text className="text-blue-600 font-medium">Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={deleteMessage}>
//                 <Text className="text-red-600 font-medium">Delete</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       <Modal
//         visible={imageModalVisible}
//         transparent={true}
//         animationType="fade"
//         onRequestClose={() => setImageModalVisible(false)}
//       >
//         <View className="flex-1 justify-center items-center bg-black/90">
//           <TouchableOpacity
//             className="absolute top-10 right-6 z-10"
//             onPress={() => setImageModalVisible(false)}
//           >
//             <Text className="text-white text-lg font-bold">Close</Text>
//           </TouchableOpacity>

//           <Image
//             source={{ uri: imageToShow! }}
//             style={{ width: "90%", height: "80%", borderRadius: 10 }}
//             resizeMode="contain"
//           />
//         </View>
//       </Modal>

//       <Modal
//         visible={videoModalVisible}
//         transparent={true}
//         animationType="fade"
//         onRequestClose={() => setVideoModalVisible(false)}
//       >
//         <View className="flex-1 justify-center items-center bg-black/90">
//           <TouchableOpacity
//             className="absolute top-10 right-6 z-10"
//             onPress={() => setVideoModalVisible(false)}
//           >
//             <Text className="text-white text-lg font-bold">Close</Text>
//           </TouchableOpacity>

//           <Video
//             source={{ uri: videoToPlay! }}
//             style={{ width: "90%", height: "80%", borderRadius: 10 }}
//             useNativeControls
//             resizeMode={ResizeMode.CONTAIN}
//             shouldPlay
//           />
//         </View>
//       </Modal>

//       <View className="bg-[#0B141A]">
//         <ChatInputBox
//           senderId={currentUser?._id ?? ""}
//           receiverId={selectedChatId ?? ""}
//           socket={socket}
//           onMessageSent={handleMessageSent}
//         />
//       </View>
//     </SafeAreaView>
//   );
// }



// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   SafeAreaView,
//   TouchableOpacity,
//   Pressable,
//   Modal,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { ChevronsDown } from "lucide-react-native";
// import { ChatHeader } from "~/components/ChatHeader";
// import { router } from "expo-router";
// import { ChatInputBox } from "~/components/ChatInputBox";
// import { useSelector } from "react-redux";
// import { RootState } from "~/store";
// import axiosInstance from "~/config/axiosInstance";
// import socket from "~/lib/socket/socket";
// import { Video, ResizeMode } from "expo-av";

// export default function ChatScreen() {
//   const scrollViewRef = useRef<ScrollView>(null);
//   const [showScrollToBottom, setShowScrollToBottom] = useState(false);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [conversationId, setConversationId] = useState<string | null>(null);

//   const [deleteModalVisible, setDeleteModalVisible] = useState(false);
//   const [messageToDelete, setMessageToDelete] = useState<any>(null);

//   const [imageModalVisible, setImageModalVisible] = useState(false);
//   const [imageToShow, setImageToShow] = useState<string | null>(null);

//   const [videoModalVisible, setVideoModalVisible] = useState(false);
//   const [videoToPlay, setVideoToPlay] = useState<string | null>(null);

//   const [isTyping, setIsTyping] = useState(false);
//   const [lastReadId, setLastReadId] = useState<string | null>(null);

//   const currentUser = useSelector((state: RootState) => state.auth.user);
//   const selectedChatId = useSelector(
//     (state: RootState) => state.dashboard.selectedChatId
//   );
//   const profile = useSelector((state: RootState) =>
//     state.dashboard.profileData.find((item) => item.id === selectedChatId)
//   );

//   const name = profile?.name ?? "Unknown";
//   const time = profile?.time ?? "";
//   const imageUrl = profile?.avatar
//     ? { uri: profile.avatar }
//     : require("../../assets/images/Avtar.png");

//   const scrollToBottom = () => {
//     scrollViewRef.current?.scrollToEnd({ animated: true });
//     setShowScrollToBottom(false);
//   };

//   const handleScroll = (e: any) => {
//     const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
//     const isNearBottom =
//       layoutMeasurement.height + contentOffset.y >= contentSize.height - 100;
//     setShowScrollToBottom(!isNearBottom);
//   };

//   const fetchMessages = async () => {
//     if (!conversationId) return;
//     try {
//       const res = await axiosInstance.get(
//         `/chat/conversations/${conversationId}/messages`
//       );
//       setMessages(res.data.data);
//       scrollToBottom();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     if (!selectedChatId) return;
//     async function setup() {
//       const res = await axiosInstance.get("/chat/conversations");
//       const conv = res.data.data.find((c: any) =>
//         c.participants.some((p: any) => p._id === selectedChatId)
//       );
//       setConversationId(conv?._id ?? null);
//     }
//     setup();
//   }, [selectedChatId]);

//   useEffect(() => {
//     fetchMessages();
//   }, [conversationId]);

//   // Scroll on new messages
//   useEffect(() => {
//     if (messages.length) {
//       const t = setTimeout(() => scrollToBottom(), 100);
//       return () => clearTimeout(t);
//     }
//   }, [messages]);

//   useEffect(() => {
//     const onReceive = (msg: any) => {
//       if (msg.conversation === conversationId) {
//         setMessages((prev) => [...prev, msg]);
//         socket.emit("mark_read", { messageId: msg._id, conversationId });
//         setLastReadId(msg._id);
//       }
//     };
//     const onTyping = ({ from }: { from: string }) => {
//       if (from === selectedChatId) setIsTyping(true);
//       setTimeout(() => setIsTyping(false), 2000);
//     };

//     socket.on("receive_message", onReceive);
//     socket.on("typing", onTyping);

//     return () => {
//       socket.off("receive_message", onReceive);
//       socket.off("typing", onTyping);
//     };
//   }, [conversationId, selectedChatId]);

//   const handleMessageSent = (newMsg: any) => {
//     setMessages((prev) => [...prev, newMsg]);
//     scrollToBottom();
//   };

//   const onLongPressMessage = (msg: any) => {
//     setMessageToDelete(msg);
//     setDeleteModalVisible(true);
//   };

//   const deleteMessage = async () => {
//     if (!messageToDelete) return;
//     await axiosInstance.delete(`/chat/messages/${messageToDelete._id}`);
//     setMessages((prev) =>
//       prev.filter((m) => m._id !== messageToDelete._id)
//     );
//     setMessageToDelete(null);
//     setDeleteModalVisible(false);
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//       style={{ flex: 1 }}
//     >
//       <SafeAreaView className="flex-1 bg-white dark:bg-[#0e0c19]">
//         <ChatHeader
//           name={name}
//           time={time}
//           imageUrl={imageUrl}
//           onBack={() => router.back()}
//           isGroup={false}
//           baseRoute="/call"
//           chatId={selectedChatId ?? ""}
//           receiverId={selectedChatId ?? ""}
//         />

//         <View className="flex-1">
//           {conversationId ? (
//             <ScrollView
//               ref={scrollViewRef}
//               className="px-2 py-2 space-y-2"
//               onScroll={handleScroll}
//               scrollEventThrottle={16}
//             >
//               {messages.map((msg, idx) => {
//                 const mine = msg.sender._id === currentUser?._id;
//                 const t = new Date(msg.createdAt).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 });
//                 const showRead = msg._id === lastReadId && !mine;

//                 return (
//                   <Pressable
//                     key={msg._id ?? idx}
//                     onLongPress={() => onLongPressMessage(msg)}
//                     className={`mb-3 max-w-[80%] px-4 py-2 rounded-xl ${
//                       mine ? "self-end bg-blue-600" : "self-start bg-[#202c33]"
//                     }`}
//                   >
//                     {msg.contentType === "image" ? (
//                       <Pressable onPress={() => {
//                         setImageToShow(msg.imageOrVideoUrl);
//                         setImageModalVisible(true);
//                       }}>
//                         <Image
//                           source={{ uri: msg.imageOrVideoUrl }}
//                           style={{ width: 200, height: 200, borderRadius: 10 }}
//                           resizeMode={ResizeMode.COVER}
//                         />
//                       </Pressable>
//                     ) : msg.contentType === "video" ? (
//                       <Pressable onPress={() => {
//                         setVideoToPlay(msg.imageOrVideoUrl);
//                         setVideoModalVisible(true);
//                       }} style={{ position: "relative" }}>
//                         <Video
//                           source={{ uri: msg.imageOrVideoUrl }}
//                           style={{ width: 200, height: 200, borderRadius: 10 }}
//                           resizeMode={ResizeMode.COVER}
//                           shouldPlay={false}
//                           isMuted
//                         />
//                         <View style={{
//                           position: "absolute", top: 0, left: 0,
//                           width: 200, height: 200,
//                           justifyContent: "center", alignItems: "center"}}>
//                           <View style={{
//                             backgroundColor: "rgba(0,0,0,0.6)",
//                             width: 48, height: 48, borderRadius: 24,
//                             justifyContent: "center", alignItems: "center"
//                           }}>
//                             <Text style={{ color: "white", fontSize: 24 }}>▶</Text>
//                           </View>
//                         </View>
//                       </Pressable>
//                     ) : (
//                       <Text className="text-white text-base">{msg.content}</Text>
//                     )}
//                     <View className="flex-row justify-end items-center mt-1">
//                       <Text className={`text-xs ${
//                         mine ? "text-gray-100" : "text-gray-400"
//                       }`}>
//                         {t} {mine && <MessageStatus status={msg.status} />}
//                         {showRead && <Text className="text-xs text-green-400 ml-1">read</Text>}
//                       </Text>
//                     </View>
//                   </Pressable>
//                 );
//               })}
//             </ScrollView>
//           ) : (
//             <View className="flex-1 justify-center items-center">
//               <Text className="text-gray-500 text-lg">
//                 No messages yet. Start the conversation!
//               </Text>
//             </View>
//           )}

//           {showScrollToBottom && (
//             <TouchableOpacity
//               onPress={scrollToBottom}
//               className="absolute bottom-4 right-4 bg-gray-800 p-2 rounded-full"
//             >
//               <ChevronsDown size={24} color="#fff" />
//             </TouchableOpacity>
//           )}
//         </View>

//         {imageModalVisible && (
//           <Modal visible transparent animationType="fade" onRequestClose={() => setImageModalVisible(false)}>
//             <View className="flex-1 justify-center items-center bg-black/90">
//               <TouchableOpacity className="absolute top-10 right-6 z-10" onPress={() => setImageModalVisible(false)}>
//                 <Text className="text-white text-lg font-bold">Close</Text>
//               </TouchableOpacity>
//               <Image source={{ uri: imageToShow! }} style={{ width: "90%", height: "80%", borderRadius: 10 }} resizeMode="contain" />
//             </View>
//           </Modal>
//         )}

//         {videoModalVisible && (
//           <Modal visible transparent animationType="fade" onRequestClose={() => setVideoModalVisible(false)}>
//             <View className="flex-1 justify-center items-center bg-black/90">
//               <TouchableOpacity className="absolute top-10 right-6 z-10" onPress={() => setVideoModalVisible(false)}>
//                 <Text className="text-white text-lg font-bold">Close</Text>
//               </TouchableOpacity>
//               <Video source={{ uri: videoToPlay! }} style={{ width: "90%", height: "80%", borderRadius: 10 }} useNativeControls resizeMode={ResizeMode.CONTAIN} shouldPlay />
//             </View>
//           </Modal>
//         )}

//         <View className="bg-[#0B141A]">
//           <ChatInputBox
//             senderId={currentUser?._id ?? ""}
//             receiverId={selectedChatId ?? ""}
//             socket={socket}
//             onMessageSent={handleMessageSent}
//             onTyping={() => {
//               socket.emit("typing", { to: selectedChatId });
//             }}
//           />
//         </View>
//       </SafeAreaView>
//     </KeyboardAvoidingView>
//   );
// }

// const MessageStatus = ({ status }: { status: string }) => {
//   switch (status) {
//     case "sent":
//       return <Text className="ml-1 text-white">✓</Text>;
//     case "delivered":
//       return <Text className="ml-1 text-white">✓✓</Text>;
//     case "seen":
//       return <Text className="ml-1 text-blue-400">✓✓</Text>;
//     default:
//       return null;
//   }
// };







// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   SafeAreaView,
//   TouchableOpacity,
//   Pressable,
//   Modal,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   FlatList,
// } from "react-native";
// import { ChevronsDown } from "lucide-react-native";
// import { ChatHeader } from "~/components/ChatHeader";
// import { router } from "expo-router";
// import { ChatInputBox } from "~/components/ChatInputBox";
// import { useSelector } from "react-redux";
// import { RootState } from "~/store";
// import axiosInstance from "~/config/axiosInstance";
// import socket from "~/lib/socket/socket";
// import { Video, ResizeMode } from "expo-av";

// // Simple emoji list for reactions
// const EMOJIS = ["👍", "❤️", "😂", "😮", "😢"];
// // const EMOJIS = ["👍", "❤️", "😂", "😮", "😢", "👏"];

// export default function ChatScreen() {
//   const scrollViewRef = useRef<ScrollView>(null);
//   const [showScrollToBottom, setShowScrollToBottom] = useState(false);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [conversationId, setConversationId] = useState<string | null>(null);

//   const [deleteModalVisible, setDeleteModalVisible] = useState(false);
//   const [messageToDelete, setMessageToDelete] = useState<any>(null);

//   const [reactionModalVisible, setReactionModalVisible] = useState(false);
//   const [messageToReact, setMessageToReact] = useState<any>(null);

//   const [imageModalVisible, setImageModalVisible] = useState(false);
//   const [imageToShow, setImageToShow] = useState<string | null>(null);

//   const [videoModalVisible, setVideoModalVisible] = useState(false);
//   const [videoToPlay, setVideoToPlay] = useState<string | null>(null);

//   const [isTyping, setIsTyping] = useState(false);
//   const [lastReadId, setLastReadId] = useState<string | null>(null);

//   const currentUser = useSelector((state: RootState) => state.auth.user);
//   const selectedChatId = useSelector(
//     (state: RootState) => state.dashboard.selectedChatId
//   );
//   const profile = useSelector((state: RootState) =>
//     state.dashboard.profileData.find((item) => item.id === selectedChatId)
//   );

//   const name = profile?.name ?? "Unknown";
//   const time = profile?.time ?? "";
//   const imageUrl = profile?.avatar
//     ? { uri: profile.avatar }
//     : require("../../assets/images/Avtar.png");

//   const scrollToBottom = () => {
//     scrollViewRef.current?.scrollToEnd({ animated: true });
//     setShowScrollToBottom(false);
//   };

//   const handleScroll = (e: any) => {
//     const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
//     const isNearBottom =
//       layoutMeasurement.height + contentOffset.y >= contentSize.height - 100;
//     setShowScrollToBottom(!isNearBottom);
//   };

//   const fetchMessages = async () => {
//     if (!conversationId) return;
//     try {
//       const res = await axiosInstance.get(
//         `/chat/conversations/${conversationId}/messages`
//       );
//       setMessages(res.data.data);
//       scrollToBottom();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     if (!selectedChatId) return;
//     async function setup() {
//       const res = await axiosInstance.get("/chat/conversations");
//       const conv = res.data.data.find((c: any) =>
//         c.participants.some((p: any) => p._id === selectedChatId)
//       );
//       setConversationId(conv?._id ?? null);
//     }
//     setup();
//   }, [selectedChatId]);

//   useEffect(() => {
//     fetchMessages();
//   }, [conversationId]);

//   // Scroll on new messages
//   useEffect(() => {
//     if (messages.length) {
//       const t = setTimeout(() => scrollToBottom(), 100);
//       return () => clearTimeout(t);
//     }
//   }, [messages]);

//   useEffect(() => {
//     const onReceive = (msg: any) => {
//       if (msg.conversation === conversationId) {
//         setMessages((prev) => [...prev, msg]);
//         socket.emit("mark_read", { messageId: msg._id, conversationId });
//         setLastReadId(msg._id);
//       }
//     };
//     const onTyping = ({ from }: { from: string }) => {
//       if (from === selectedChatId) setIsTyping(true);
//       setTimeout(() => setIsTyping(false), 2000);
//     };

//     socket.on("receive_message", onReceive);
//     socket.on("typing", onTyping);

//     return () => {
//       socket.off("receive_message", onReceive);
//       socket.off("typing", onTyping);
//     };
//   }, [conversationId, selectedChatId]);

//   const handleMessageSent = (newMsg: any) => {
//     setMessages((prev) => [...prev, newMsg]);
//     scrollToBottom();
//   };

//   // Delete message modal handlers
//   const onLongPressMessage = (msg: any) => {
//     setMessageToDelete(msg);
//     setDeleteModalVisible(true);
//   };

//   const deleteMessage = async () => {
//     if (!messageToDelete) return;
//     try {
//       await axiosInstance.delete(`/chat/messages/${messageToDelete._id}`);
//       setMessages((prev) =>
//         prev.filter((m) => m._id !== messageToDelete._id)
//       );
//     } catch (error) {
//       console.error("Failed to delete message:", error);
//     }
//     setMessageToDelete(null);
//     setDeleteModalVisible(false);
//   };

//   // Reaction modal handlers
//   const openReactionModal = (msg: any) => {
//     setMessageToReact(msg);
//     setReactionModalVisible(true);
//   };

//   const addReaction = (emoji: string) => {
//     if (!messageToReact) return;

//     // Update reactions locally (you can extend this to call backend)
//     setMessages((prevMessages) =>
//       prevMessages.map((m) => {
//         if (m._id === messageToReact._id) {
//           // Prepare reactions object, keys are emoji, values are arrays of userIds who reacted
//           const reactions = m.reactions || {};
//           const usersReacted = reactions[emoji] || [];

//           // Toggle reaction by current user
//           const userHasReacted = usersReacted.includes(currentUser._id);
//           let newUsersReacted;

//           if (userHasReacted) {
//             // Remove user reaction
//             newUsersReacted = usersReacted.filter((u: string) => u !== currentUser._id);
//           } else {
//             // Add user reaction
//             newUsersReacted = [...usersReacted, currentUser._id];
//           }

//           return {
//             ...m,
//             reactions: {
//               ...reactions,
//               [emoji]: newUsersReacted,
//             },
//           };
//         }
//         return m;
//       })
//     );

//     setReactionModalVisible(false);
//   };

//   // Render reactions below message bubble
//   const renderReactions = (msg: any) => {
//     if (!msg.reactions) return null;
//     // Convert reactions object to array of {emoji, count, reactedByUser}
//     const reactionEntries = Object.entries(msg.reactions).filter(([emoji, users]: any) => users.length > 0);
//     if (reactionEntries.length === 0) return null;

//     return (
//       <View
//         style={{
//           flexDirection: "row",
//           marginTop: 4,
//           marginLeft: 8,
//           flexWrap: "wrap",
//         }}
//       >
//         {reactionEntries.map(([emoji, users]: any) => {
//           const count = users.length;
//           const reactedByUser = users.includes(currentUser._id);
//           return (
//             <TouchableOpacity
//               key={emoji}
//               onPress={() => addReaction(emoji)} // toggle reaction on tap
//               style={{
//                 backgroundColor: reactedByUser ? "#3b82f6" : "#2c2f33",
//                 paddingHorizontal: 6,
//                 paddingVertical: 2,
//                 borderRadius: 12,
//                 marginRight: 6,
//                 marginBottom: 4,
//                 flexDirection: "row",
//                 alignItems: "center",
//               }}
//               activeOpacity={0.7}
//             >
//               <Text style={{ color: reactedByUser ? "white" : "lightgray", fontSize: 14 }}>
//                 {emoji} {count}
//               </Text>
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     );
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//       style={{ flex: 1 }}
//     >
//       <SafeAreaView className="flex-1 bg-white dark:bg-[#0e0c19]">
//         <ChatHeader
//           name={name}
//           time={time}
//           imageUrl={imageUrl}
//           onBack={() => router.back()}
//           isGroup={false}
//           baseRoute="/call"
//           chatId={selectedChatId ?? ""}
//           receiverId={selectedChatId ?? ""}
//         />

//         <View className="flex-1">
//           {conversationId ? (
//             <ScrollView
//               ref={scrollViewRef}
//               className="px-2 py-2 space-y-2"
//               onScroll={handleScroll}
//               scrollEventThrottle={16}
//             >
//               {messages.map((msg, idx) => {
//                 const mine = msg.sender._id === currentUser?._id;
//                 const t = new Date(msg.createdAt).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 });
//                 const showRead = msg._id === lastReadId && !mine;

//                 return (
//                   <Pressable
//                     key={msg._id ?? idx}
//                     onLongPress={() => onLongPressMessage(msg)}
//                     onPress={() => openReactionModal(msg)}
//                     className={`mb-3 max-w-[80%] px-4 py-2 rounded-xl ${
//                       mine ? "self-end bg-blue-600" : "self-start bg-[#202c33]"
//                     }`}
//                   >
//                     {msg.contentType === "image" ? (
//                       <Pressable onPress={() => {
//                         setImageToShow(msg.imageOrVideoUrl);
//                         setImageModalVisible(true);
//                       }}>
//                         <Image
//                           source={{ uri: msg.imageOrVideoUrl }}
//                           style={{ width: 200, height: 200, borderRadius: 10 }}
//                           resizeMode={ResizeMode.COVER}
//                         />
//                       </Pressable>
//                     ) : msg.contentType === "video" ? (
//                       <Pressable onPress={() => {
//                         setVideoToPlay(msg.imageOrVideoUrl);
//                         setVideoModalVisible(true);
//                       }} style={{ position: "relative" }}>
//                         <Video
//                           source={{ uri: msg.imageOrVideoUrl }}
//                           style={{ width: 200, height: 200, borderRadius: 10 }}
//                           resizeMode={ResizeMode.COVER}
//                           shouldPlay={false}
//                           isMuted
//                         />
//                         <View style={{
//                           position: "absolute", top: 0, left: 0,
//                           width: 200, height: 200,
//                           justifyContent: "center", alignItems: "center"}}>
//                           <View style={{
//                             backgroundColor: "rgba(0,0,0,0.6)",
//                             width: 48, height: 48, borderRadius: 24,
//                             justifyContent: "center", alignItems: "center"
//                           }}>
//                             <Text style={{ color: "white", fontSize: 24 }}>▶</Text>
//                           </View>
//                         </View>
//                       </Pressable>
//                     ) : (
//                       <Text className="text-white text-base">{msg.content}</Text>
//                     )}

//                     {/* Render reactions */}
//                     {renderReactions(msg)}

//                     <View className="flex-row justify-end items-center mt-1">
//                       <Text className={`text-xs ${
//                         mine ? "text-gray-100" : "text-gray-400"
//                       }`}>
//                         {t} {mine && <MessageStatus status={msg.status} />}
//                         {showRead && <Text className="text-xs text-green-400 ml-1">read</Text>}
//                       </Text>
//                     </View>
//                   </Pressable>
//                 );
//               })}
//             </ScrollView>
//           ) : (
//             <View className="flex-1 justify-center items-center">
//               <Text className="text-gray-500 text-lg">
//                 No messages yet. Start the conversation!
//               </Text>
//             </View>
//           )}

//           {showScrollToBottom && (
//             <TouchableOpacity
//               onPress={scrollToBottom}
//               className="absolute bottom-4 right-4 bg-gray-800 p-2 rounded-full"
//             >
//               <ChevronsDown size={24} color="#fff" />
//             </TouchableOpacity>
//           )}
//         </View>

//         {/* Delete confirmation modal */}
//         <Modal
//           visible={deleteModalVisible}
//           transparent
//           animationType="fade"
//           onRequestClose={() => setDeleteModalVisible(false)}
//         >
//           <View style={{
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center",
//             backgroundColor: "rgba(0,0,0,0.5)",
//             padding: 20,
//           }}>
//             <View style={{
//               backgroundColor: "white",
//               borderRadius: 10,
//               padding: 20,
//               width: "80%",
//               alignItems: "center",
//             }}>
//               <Text style={{ fontSize: 18, marginBottom: 20 }}>
//                 Are you sure you want to delete this message?
//               </Text>
//               <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
//                 <TouchableOpacity
//                   onPress={() => setDeleteModalVisible(false)}
//                   style={{
//                     flex: 1,
//                     padding: 10,
//                     marginRight: 10,
//                     backgroundColor: "#ccc",
//                     borderRadius: 5,
//                     alignItems: "center",
//                   }}
//                 >
//                   <Text>Cancel</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={deleteMessage}
//                   style={{
//                     flex: 1,
//                     padding: 10,
//                     backgroundColor: "red",
//                     borderRadius: 5,
//                     alignItems: "center",
//                   }}
//                 >
//                   <Text style={{ color: "white" }}>Delete</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </Modal>

//         {/* Reaction modal */}
//         <Modal
//           visible={reactionModalVisible}
//           transparent
//           animationType="fade"
//           onRequestClose={() => setReactionModalVisible(false)}
//         >
//           <View style={{
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center",
//             backgroundColor: "rgba(0,0,0,0.5)",
//             padding: 10,
//           }}>
//             <View style={{
//               backgroundColor: "white",
//               borderRadius: 10,
//               padding: 10,
//               width: "80%",
//               alignItems: "center",
//               flexDirection: "row",
//               justifyContent: "space-around",
//             }}>
//               {EMOJIS.map((emoji) => (
//                 <TouchableOpacity
//                   key={emoji}
//                   onPress={() => addReaction(emoji)}
//                   style={{ padding: 10 }}
//                 >
//                   <Text style={{ fontSize: 28 }}>{emoji}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//             <TouchableOpacity
//               onPress={() => setReactionModalVisible(false)}
//               style={{
//                 marginTop: 20,
//                 backgroundColor: "#ccc",
//                 padding: 10,
//                 borderRadius: 5,
//                 width: "80%",
//                 alignItems: "center",
//               }}
//             >
//               <Text>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </Modal>

//         {imageModalVisible && (
//           <Modal visible transparent animationType="fade" onRequestClose={() => setImageModalVisible(false)}>
//             <View className="flex-1 justify-center items-center bg-black/90">
//               <TouchableOpacity className="absolute top-10 right-6 z-10" onPress={() => setImageModalVisible(false)}>
//                 <Text className="text-white text-lg font-bold">Close</Text>
//               </TouchableOpacity>
//               <Image source={{ uri: imageToShow! }} style={{ width: "90%", height: "80%", borderRadius: 10 }} resizeMode="contain" />
//             </View>
//           </Modal>
//         )}

//         {videoModalVisible && (
//           <Modal visible transparent animationType="fade" onRequestClose={() => setVideoModalVisible(false)}>
//             <View className="flex-1 justify-center items-center bg-black/90">
//               <TouchableOpacity className="absolute top-10 right-6 z-10" onPress={() => setVideoModalVisible(false)}>
//                 <Text className="text-white text-lg font-bold">Close</Text>
//               </TouchableOpacity>
//               <Video source={{ uri: videoToPlay! }} style={{ width: "90%", height: "80%", borderRadius: 10 }} useNativeControls resizeMode={ResizeMode.CONTAIN} shouldPlay />
//             </View>
//           </Modal>
//         )}

//         <View className="bg-[#0B141A]">
//           <ChatInputBox
//             senderId={currentUser?._id ?? ""}
//             receiverId={selectedChatId ?? ""}
//             socket={socket}
//             onMessageSent={handleMessageSent}
//             onTyping={() => {
//               socket.emit("typing", { to: selectedChatId });
//             }}
//           />
//         </View>
//       </SafeAreaView>
//     </KeyboardAvoidingView>
//   );
// }

// const MessageStatus = ({ status }: { status: string }) => {
//   switch (status) {
//     case "sent":
//       return <Text className="ml-1 text-white">✓</Text>;
//     case "delivered":
//       return <Text className="ml-1 text-white">✓✓</Text>;
//     case "seen":
//       return <Text className="ml-1 text-blue-400">✓✓</Text>;
//     default:
//       return null;
//   }
// };





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
              {messages.map((msg, idx) => {
                const mine = msg.sender._id === currentUser?._id;
                const t = new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                const showRead = msg._id === lastReadId && !mine;

                return (
                  <Pressable
                    key={msg._id ?? idx}
                    onLongPress={() => onLongPressMessage(msg)}
                    onPress={() => openReactionModal(msg)}
                    className={`mb-3 max-w-[80%] px-4 py-2 rounded-xl ${
                      mine ? "self-end bg-blue-600" : "self-start bg-[#202c33]"
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
                        className={`text-xs ${
                          mine ? "text-gray-100" : "text-gray-400"
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
            onTyping={() => {
              socket.emit("typing", { to: selectedChatId });
            }}
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









// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   SafeAreaView,
//   TouchableOpacity,
//   Pressable,
//   Modal,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { ChevronsDown } from "lucide-react-native";
// import { ChatHeader } from "~/components/ChatHeader";
// import { router } from "expo-router";
// import { ChatInputBox } from "~/components/ChatInputBox";
// import { useSelector } from "react-redux";
// import { RootState } from "~/store";
// import axiosInstance from "~/config/axiosInstance";
// import socket from "~/lib/socket/socket";
// import { Video, ResizeMode } from "expo-av";

// import { encryptData, decryptData } from "~/utils/encryption";
// import { getSecretKey } from "~/utils/secureStore";

// const EMOJIS = ["👍", "❤️", "😂", "😮", "😢"];

// export default function ChatScreen() {
//   const scrollViewRef = useRef<ScrollView>(null);
//   const [showScrollToBottom, setShowScrollToBottom] = useState(false);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [conversationId, setConversationId] = useState<string | null>(null);

//   const [deleteModalVisible, setDeleteModalVisible] = useState(false);
//   const [messageToDelete, setMessageToDelete] = useState<any>(null);

//   const [reactionModalVisible, setReactionModalVisible] = useState(false);
//   const [messageToReact, setMessageToReact] = useState<any>(null);

//   const [imageModalVisible, setImageModalVisible] = useState(false);
//   const [imageToShow, setImageToShow] = useState<string | null>(null);

//   const [videoModalVisible, setVideoModalVisible] = useState(false);
//   const [videoToPlay, setVideoToPlay] = useState<string | null>(null);

//   const [isTyping, setIsTyping] = useState(false);
//   const [lastReadId, setLastReadId] = useState<string | null>(null);

//   const [secretKey, setSecretKey] = useState<string | null>(null);

//   const currentUser = useSelector((state: RootState) => state.auth.user);
//   const selectedChatId = useSelector(
//     (state: RootState) => state.dashboard.selectedChatId
//   );
//   const profile = useSelector((state: RootState) =>
//     state.dashboard.profileData.find((item) => item.id === selectedChatId)
//   );

//   const name = profile?.name ?? "Unknown";
//   const time = profile?.time ?? "";
//   const imageUrl = profile?.avatar
//     ? { uri: profile.avatar }
//     : require("../../assets/images/Avtar.png");

//   // Load secret key on mount
//   useEffect(() => {
//     async function loadKey() {
//       const key = await getSecretKey();
//       setSecretKey(key);
//     }
//     loadKey();
//   }, []);

//   const scrollToBottom = () => {
//     scrollViewRef.current?.scrollToEnd({ animated: true });
//     setShowScrollToBottom(false);
//   };

//   const handleScroll = (e: any) => {
//     const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
//     const isNearBottom =
//       layoutMeasurement.height + contentOffset.y >= contentSize.height - 100;
//     setShowScrollToBottom(!isNearBottom);
//   };

//   // Decrypt messages after fetching
//   const decryptMessages = (msgs: any[]) => {
//     if (!secretKey) return msgs;
//     return msgs.map((msg) => {
//       if (msg.contentType === "text" && msg.content) {
//         try {
//           const decrypted = decryptData(msg.content, secretKey);
//           return { ...msg, content: decrypted };
//         } catch {
//           return msg;
//         }
//       }
//       // For images/videos or other types, no decryption applied here
//       return msg;
//     });
//   };

//   const fetchMessages = async () => {
//     if (!conversationId) return;
//     try {
//       const res = await axiosInstance.get(
//         `/chat/conversations/${conversationId}/messages`
//       );
//       const decryptedMsgs = decryptMessages(res.data.data);
//       setMessages(decryptedMsgs);
//       scrollToBottom();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     if (!selectedChatId) return;
//     async function setup() {
//       const res = await axiosInstance.get("/chat/conversations");
//       const conv = res.data.data.find((c: any) =>
//         c.participants.some((p: any) => p._id === selectedChatId)
//       );
//       setConversationId(conv?._id ?? null);
//     }
//     setup();
//   }, [selectedChatId]);

//   useEffect(() => {
//     fetchMessages();
//   }, [conversationId, secretKey]);

//   // Scroll on new messages
//   useEffect(() => {
//     if (messages.length) {
//       const t = setTimeout(() => scrollToBottom(), 100);
//       return () => clearTimeout(t);
//     }
//   }, [messages]);

//   useEffect(() => {
//     if (!secretKey) return;

//     const onReceive = (msg: any) => {
//       if (msg.conversation === conversationId) {
//         let decryptedMsg = msg;
//         if (msg.contentType === "text" && msg.content) {
//           try {
//             const decryptedContent = decryptData(msg.content, secretKey);
//             decryptedMsg = { ...msg, content: decryptedContent };
//           } catch {
//             // ignore error, show encrypted text
//           }
//         }
//         setMessages((prev) => [...prev, decryptedMsg]);
//         socket.emit("mark_read", { messageId: msg._id, conversationId });
//         setLastReadId(msg._id);
//       }
//     };
//     const onTyping = ({ from }: { from: string }) => {
//       if (from === selectedChatId) setIsTyping(true);
//       setTimeout(() => setIsTyping(false), 2000);
//     };

//     socket.on("receive_message", onReceive);
//     socket.on("typing", onTyping);

//     return () => {
//       socket.off("receive_message", onReceive);
//       socket.off("typing", onTyping);
//     };
//   }, [conversationId, selectedChatId, secretKey]);

//   // Encrypt message before sending
//   const handleMessageSent = (newMsg: any) => {
//     if (!secretKey) {
//       // If no key yet, send as is (or handle differently)
//       setMessages((prev) => [...prev, newMsg]);
//       scrollToBottom();
//       return;
//     }

//     // Encrypt the content before appending locally and before sending to server/socket
//     const encryptedContent = newMsg.contentType === "text" && newMsg.content
//       ? encryptData(newMsg.content, secretKey)
//       : newMsg.content;

//     const encryptedMsg = { ...newMsg, content: encryptedContent };
//     setMessages((prev) => [...prev, newMsg]); // Show decrypted content locally
//     scrollToBottom();

//     // Emit/send the encrypted message via socket or axios here as needed
//     // You probably send it inside ChatInputBox, so make sure ChatInputBox calls this handler with raw content,
//     // and you override the sending method there to encrypt before actually sending to server.
//   };

//   // Delete message modal handlers
//   const onLongPressMessage = (msg: any) => {
//     setMessageToDelete(msg);
//     setDeleteModalVisible(true);
//   };

//   const deleteMessage = async () => {
//     if (!messageToDelete) return;
//     try {
//       await axiosInstance.delete(`/chat/messages/${messageToDelete._id}`);
//       setMessages((prev) =>
//         prev.filter((m) => m._id !== messageToDelete._id)
//       );
//     } catch (error) {
//       console.error("Failed to delete message:", error);
//     }
//     setMessageToDelete(null);
//     setDeleteModalVisible(false);
//   };

//   // Reaction modal handlers
//   const openReactionModal = (msg: any) => {
//     if (msg.sender._id === currentUser?._id) return; // prevent reacting to own msg
//     setMessageToReact(msg);
//     setReactionModalVisible(true);
//   };

//   const addReaction = (emoji: string) => {
//     if (!messageToReact || messageToReact.sender._id === currentUser._id) return;

//     setMessages((prevMessages) =>
//       prevMessages.map((m) => {
//         if (m._id === messageToReact._id) {
//           const userReactions = m.userReactions || {};
//           const current = userReactions[currentUser._id];

//           const newUserReactions =
//             current === emoji
//               ? Object.fromEntries(Object.entries(userReactions).filter(([uid]) => uid !== currentUser._id))
//               : { ...userReactions, [currentUser._id]: emoji };

//           return { ...m, userReactions: newUserReactions };
//         }
//         return m;
//       })
//     );

//     setReactionModalVisible(false);
//   };

//   // Aggregate reactions count from userReactions map
//   const aggregateReactions = (userReactions: Record<string, string>) => {
//     const agg: Record<string, number> = {};
//     Object.values(userReactions).forEach((emoji) => {
//       agg[emoji] = (agg[emoji] || 0) + 1;
//     });
//     return agg;
//   };

//   // Render reactions badges below text messages (still keep for text)
//   const renderReactions = (msg: any) => {
//     if (!msg.userReactions) return null;

//     const agg = aggregateReactions(msg.userReactions);
//     const emojis = Object.keys(agg);
//     if (emojis.length === 0) return null;

//     return (
//       <View
//         style={{
//           flexDirection: "row",
//           marginTop: 4,
//           marginLeft: 8,
//           flexWrap: "wrap",
//         }}
//       >
//         {emojis.map((emoji) => {
//           const count = agg[emoji];
//           const reactedByUser = Object.entries(msg.userReactions).some(
//             ([userId, e]) => userId === currentUser._id && e === emoji
//           );
//           return (
//             <TouchableOpacity
//               key={emoji}
//               onPress={() => addReaction(emoji)} // toggle reaction on tap
//               style={{
//                 backgroundColor: reactedByUser ? "#3b82f6" : "#2c2f33",
//                 paddingHorizontal: 6,
//                 paddingVertical: 2,
//                 borderRadius: 12,
//                 marginRight: 6,
//                 marginBottom: 4,
//                 flexDirection: "row",
//                 alignItems: "center",
//               }}
//               activeOpacity={0.7}
//             >
//               <Text
//                 style={{ color: reactedByUser ? "white" : "lightgray", fontSize: 14 }}
//               >
//                 {emoji} {count}
//               </Text>
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     );
//   };

//   // Render single user's reaction as floating badge for ALL messages (text/image/video)
//   const renderSingleReactionBadge = (msg: any) => {
//     if (!msg.userReactions) return null;
//     const userEmoji = msg.userReactions[currentUser._id];
//     if (!userEmoji) return null;

//     return (
//       <View
//         style={{
//           position: "absolute",
//           bottom: -10, // half outside
//           right: -10, // half outside
//           backgroundColor: "#3b82f6",
//           borderRadius: 12,
//           paddingHorizontal: 6,
//           paddingVertical: 2,
//           zIndex: 10,
//           elevation: 10,
//           shadowColor: "#000",
//           shadowOpacity: 0.3,
//           shadowRadius: 3,
//         }}
//       >
//         <Text style={{ color: "white", fontSize: 16 }}>{userEmoji}</Text>
//       </View>
//     );
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//       style={{ flex: 1 }}
//     >
//       <SafeAreaView className="flex-1 bg-white dark:bg-[#0e0c19]">
//         <ChatHeader
//           name={name}
//           time={time}
//           imageUrl={imageUrl}
//           onBack={() => router.back()}
//           isGroup={false}
//           baseRoute="/call"
//           chatId={selectedChatId ?? ""}
//           receiverId={selectedChatId ?? ""}
//         />

//         <View className="flex-1">
//           {conversationId ? (
//             <ScrollView
//               ref={scrollViewRef}
//               className="px-2 py-2 space-y-2"
//               onScroll={handleScroll}
//               scrollEventThrottle={16}
//             >
//               {messages.map((msg, idx) => {
//                 const mine = msg.sender._id === currentUser?._id;
//                 const t = new Date(msg.createdAt).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 });
//                 const showRead = msg._id === lastReadId && !mine;

//                 return (
//                   <Pressable
//                     key={msg._id ?? idx}
//                     onLongPress={() => onLongPressMessage(msg)}
//                     onPress={() => openReactionModal(msg)}
//                     className={`mb-3 max-w-[80%] px-4 py-2 rounded-xl ${
//                       mine ? "self-end bg-blue-600" : "self-start bg-[#202c33]"
//                     }`}
//                     style={{ position: "relative" }} // Important for badge position
//                   >
//                     {msg.contentType === "image" ? (
//                       <Pressable
//                         onPress={() => {
//                           setImageToShow(msg.imageOrVideoUrl);
//                           setImageModalVisible(true);
//                         }}
//                       >
//                         <Image
//                           source={{ uri: msg.imageOrVideoUrl }}
//                           style={{ width: 200, height: 200, borderRadius: 10 }}
//                           resizeMode={ResizeMode.COVER}
//                         />
//                       </Pressable>
//                     ) : msg.contentType === "video" ? (
//                       <Pressable
//                         onPress={() => {
//                           setVideoToPlay(msg.imageOrVideoUrl);
//                           setVideoModalVisible(true);
//                         }}
//                       >
//                         <Video
//                           source={{ uri: msg.imageOrVideoUrl }}
//                           style={{ width: 200, height: 200, borderRadius: 10 }}
//                           resizeMode={ResizeMode.COVER}
//                           shouldPlay={false}
//                           isMuted
//                         />
//                         <View
//                           style={{
//                             position: "absolute",
//                             top: 0,
//                             left: 0,
//                             width: 200,
//                             height: 200,
//                             justifyContent: "center",
//                             alignItems: "center",
//                           }}
//                         >
//                           <View
//                             style={{
//                               backgroundColor: "rgba(0,0,0,0.6)",
//                               width: 48,
//                               height: 48,
//                               borderRadius: 24,
//                               justifyContent: "center",
//                               alignItems: "center",
//                             }}
//                           >
//                             <Text style={{ color: "white", fontSize: 24 }}>▶</Text>
//                           </View>
//                         </View>
//                       </Pressable>
//                     ) : (
//                       <Text className="text-white text-base">{msg.content}</Text>
//                     )}

//                     {renderSingleReactionBadge(msg)}

//                     {msg.contentType === "text" && renderReactions(msg)}

//                     <View className="flex-row justify-end items-center mt-1">
//                       <Text
//                         className={`text-xs ${
//                           mine ? "text-gray-100" : "text-gray-400"
//                         }`}
//                       >
//                         {t} {mine && <MessageStatus status={msg.status} />}
//                         {showRead && (
//                           <Text className="text-xs text-green-400 ml-1">read</Text>
//                         )}
//                       </Text>
//                     </View>
//                   </Pressable>
//                 );
//               })}
//             </ScrollView>
//           ) : (
//             <View className="flex-1 justify-center items-center">
//               <Text className="text-gray-500 text-lg">
//                 No messages yet. Start the conversation!
//               </Text>
//             </View>
//           )}

//           {showScrollToBottom && (
//             <TouchableOpacity
//               onPress={scrollToBottom}
//               className="absolute bottom-4 right-4 bg-gray-800 p-2 rounded-full"
//             >
//               <ChevronsDown size={24} color="#fff" />
//             </TouchableOpacity>
//           )}
//         </View>

//         {/* Delete confirmation modal */}
//         <Modal
//           visible={deleteModalVisible}
//           transparent
//           animationType="fade"
//           onRequestClose={() => setDeleteModalVisible(false)}
//         >
//           <View
//             style={{
//               flex: 1,
//               justifyContent: "center",
//               alignItems: "center",
//               backgroundColor: "rgba(0,0,0,0.5)",
//               padding: 20,
//             }}
//           >
//             <View
//               style={{
//                 backgroundColor: "white",
//                 borderRadius: 10,
//                 padding: 20,
//                 width: "80%",
//                 alignItems: "center",
//               }}
//             >
//               <Text style={{ fontSize: 18, marginBottom: 20 }}>
//                 Are you sure you want to delete this message?
//               </Text>
//               <View
//                 style={{ flexDirection: "row", justifyContent: "space-around", width: "100%" }}
//               >
//                 <TouchableOpacity
//                   onPress={() => setDeleteModalVisible(false)}
//                   style={{
//                     backgroundColor: "#ccc",
//                     paddingVertical: 10,
//                     paddingHorizontal: 20,
//                     borderRadius: 6,
//                   }}
//                 >
//                   <Text>Cancel</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={deleteMessage}
//                   style={{
//                     backgroundColor: "red",
//                     paddingVertical: 10,
//                     paddingHorizontal: 20,
//                     borderRadius: 6,
//                   }}
//                 >
//                   <Text style={{ color: "white" }}>Delete</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </Modal>

//         {/* Reaction selector modal */}
//         <Modal
//           visible={reactionModalVisible}
//           transparent
//           animationType="fade"
//           onRequestClose={() => setReactionModalVisible(false)}
//         >
//           <View
//             style={{
//               flex: 1,
//               justifyContent: "center",
//               alignItems: "center",
//               backgroundColor: "rgba(0,0,0,0.5)",
//               padding: 20,
//             }}
//           >
//             <View
//               style={{
//                 backgroundColor: "white",
//                 borderRadius: 10,
//                 padding: 10,
//                 flexDirection: "row",
//                 justifyContent: "space-around",
//                 width: "80%",
//               }}
//             >
//               {EMOJIS.map((emoji) => (
//                 <TouchableOpacity
//                   key={emoji}
//                   onPress={() => addReaction(emoji)}
//                   style={{
//                     padding: 10,
//                   }}
//                 >
//                   <Text style={{ fontSize: 28 }}>{emoji}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//             <TouchableOpacity
//               onPress={() => setReactionModalVisible(false)}
//               style={{
//                 marginTop: 16,
//                 backgroundColor: "#ccc",
//                 paddingVertical: 10,
//                 paddingHorizontal: 20,
//                 borderRadius: 6,
//               }}
//             >
//               <Text style={{ fontSize: 16 }}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </Modal>

//         {imageModalVisible && (
//           <Modal
//             visible
//             transparent
//             animationType="fade"
//             onRequestClose={() => setImageModalVisible(false)}
//           >
//             <View className="flex-1 justify-center items-center bg-black/90">
//               <TouchableOpacity
//                 className="absolute top-10 right-6 z-10"
//                 onPress={() => setImageModalVisible(false)}
//               >
//                 <Text className="text-white text-lg font-bold">Close</Text>
//               </TouchableOpacity>
//               <Image
//                 source={{ uri: imageToShow! }}
//                 style={{ width: "90%", height: "80%", borderRadius: 10 }}
//                 resizeMode="contain"
//               />
//             </View>
//           </Modal>
//         )}

//         {videoModalVisible && (
//           <Modal
//             visible
//             transparent
//             animationType="fade"
//             onRequestClose={() => setVideoModalVisible(false)}
//           >
//             <View className="flex-1 justify-center items-center bg-black/90">
//               <TouchableOpacity
//                 className="absolute top-10 right-6 z-10"
//                 onPress={() => setVideoModalVisible(false)}
//               >
//                 <Text className="text-white text-lg font-bold">Close</Text>
//               </TouchableOpacity>
//               <Video
//                 source={{ uri: videoToPlay! }}
//                 style={{ width: "90%", height: "80%", borderRadius: 10 }}
//                 useNativeControls
//                 resizeMode={ResizeMode.CONTAIN}
//                 shouldPlay
//               />
//             </View>
//           </Modal>
//         )}

//         <View className="bg-[#0B141A]">
//           <ChatInputBox
//             senderId={currentUser?._id ?? ""}
//             receiverId={selectedChatId ?? ""}
//             socket={socket}
//             onMessageSent={(msg) => {
//               // Encrypt before sending to server/socket
//               if (!secretKey) {
//                 handleMessageSent(msg);
//                 socket.emit("send_message", msg);
//                 return;
//               }

//               const encryptedContent = msg.contentType === "text" && msg.content
//                 ? encryptData(msg.content, secretKey)
//                 : msg.content;

//               const encryptedMsg = { ...msg, content: encryptedContent };

//               socket.emit("send_message", encryptedMsg);

//               // Show decrypted message locally for UX
//               handleMessageSent(msg);
//             }}
//             onTyping={() => {
//               socket.emit("typing", { to: selectedChatId });
//             }}
//           />
//         </View>
//       </SafeAreaView>
//     </KeyboardAvoidingView>
//   );
// }

// const MessageStatus = ({ status }: { status: string }) => {
//   switch (status) {
//     case "sent":
//       return <Text className="ml-1 text-white">✓</Text>;
//     case "delivered":
//       return <Text className="ml-1 text-white">✓✓</Text>;
//     case "seen":
//       return <Text className="ml-1 text-blue-400">✓✓</Text>;
//     default:
//       return null;
//   }
// };
