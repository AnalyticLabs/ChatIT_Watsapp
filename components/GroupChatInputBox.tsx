// import React, { useState } from "react";
// import {
//   View,
//   TextInput,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { Smile, Paperclip, Camera, Mic, SendHorizontal } from "lucide-react-native";
// import { useColorScheme } from "~/lib/useColorScheme";
// import { sendMessageAPI } from "~/api/chatApi";

// type Props = {
//   senderId: string;
//   receiverId: string;
//   socket?: any;
//   onMessageSent?: (message: any) => void;
// };

// export const GroupChatInputBox = ({ senderId, receiverId, socket, onMessageSent }: Props) => {
//   const [message, setMessage] = useState("");
//   const { isDarkColorScheme } = useColorScheme();

//   // Send text message
//   const handleSendText = async () => {
//     const trimmedMessage = message.trim();
//     if (!trimmedMessage) return;

//     setMessage("");

//     try {
//       const newMessage = await sendMessageAPI({
//         senderId,
//         receiverId,
//         content: trimmedMessage,
//         messageStatus: "sent",
//       });

//       socket?.emit("send_message", newMessage);
//       onMessageSent?.(newMessage);
//     } catch (err) {
//       console.error("Send message error:", err);
//     }
//   };

//   // Pick and send media (image or video)
//   const handlePickMedia = async (mediaType: "image" | "video") => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes:
//         mediaType === "image"
//           ? ImagePicker.MediaTypeOptions.Images
//           : ImagePicker.MediaTypeOptions.Videos,
//       allowsEditing: true,
//       quality: 0.7,
//     });

//     if (!result.canceled && result.assets.length > 0) {
//       const mediaUri = result.assets[0].uri;
//       try {
//         const newMessage = await sendMessageAPI({
//           senderId,
//           receiverId,
//           messageStatus: "sent",
//           mediaUri,
//         });

//         socket?.emit("send_message", newMessage);
//         onMessageSent?.(newMessage);
//       } catch (err) {
//         console.error("Send media message error:", err);
//       }
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//       keyboardVerticalOffset={90}
//       className="px-2 pt-1 pb-3 border-t-2 border-gray-200 dark:border-white/10 bg-white dark:bg-[#0e0c19]"
//     >
//       <View className="flex-row items-center rounded-full bg-slate-200 dark:bg-gray-800 px-3 py-1">
//         <TouchableOpacity className="mr-2">
//           <Smile size={22} color={isDarkColorScheme ? "#ffffff" : "#000000"} />
//         </TouchableOpacity>

//         <TextInput
//           placeholder="Message"
//           placeholderTextColor={isDarkColorScheme ? "#cccccc" : "#5e5d5d"}
//           multiline
//           value={message}
//           onChangeText={setMessage}
//           className="flex-1 text-black dark:text-white px-2 text-lg max-h-24"
//         />

//         <TouchableOpacity className="mx-1" onPress={() => handlePickMedia("image")}>
//           <Paperclip size={22} color={isDarkColorScheme ? "#ffffff" : "#000000"} />
//         </TouchableOpacity>

//         <TouchableOpacity className="mx-1" onPress={() => handlePickMedia("video")}>
//           <Camera size={22} color={isDarkColorScheme ? "#ffffff" : "#000000"} />
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={handleSendText}
//           className="ml-1.5 p-2 bg-blue-600 rounded-full"
//         >
//           {message.trim() ? (
//             <SendHorizontal size={22} color="white" />
//           ) : (
//             <Mic size={22} color="white" />
//           )}
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };





import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Smile, Paperclip, Camera, Mic, SendHorizontal } from "lucide-react-native";
import { useColorScheme } from "~/lib/useColorScheme";
import { useDispatch } from "react-redux";
import { sendGroupMessage } from "~/features/groupChat/groupChatActions";

type Props = {
  senderId: string;
  groupId: string;
  socket?: any;
  onMessageSent?: (message: any) => void;
};

export const GroupChatInputBox = ({ senderId, groupId, socket, onMessageSent }: Props) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { isDarkColorScheme } = useColorScheme();

  // Send text message
  const handleSendText = async () => {
    const trimmed = message?.toString().trim();
    if (!trimmed) return;
    setMessage("");

    try {
      const result: any = await dispatch<any>(
        sendGroupMessage({
          groupId,
          senderId,
          content: trimmed,
          messageStatus: "sent",
        })
      );

      const newMessage = result?.payload;

      socket?.emit("send_group_message", newMessage);
      onMessageSent?.(newMessage);
    } catch (err) {
      console.error("Send group message error:", err);
    }
  };

  // Pick and send media (image or video)
  const handlePickMedia = async (mediaType: "image" | "video") => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        mediaType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      const mediaUri = result.assets[0].uri;

      try {
        const result: any = await dispatch<any>(
          sendGroupMessage({
            groupId,
            senderId,
            messageStatus: "sent",
            mediaUri,
          })
        );

        const newMessage = result?.payload;

        socket?.emit("send_group_message", newMessage);
        onMessageSent?.(newMessage);
      } catch (err) {
        console.error("Send media group message error:", err);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
      className="px-2 pt-1 pb-3 border-t-2 border-gray-200 dark:border-white/10 bg-white dark:bg-[#0e0c19]"
    >
      <View className="flex-row items-center rounded-full bg-slate-200 dark:bg-gray-800 px-3 py-1">
        <TouchableOpacity className="mr-2">
          <Smile size={22} color={isDarkColorScheme ? "#ffffff" : "#000000"} />
        </TouchableOpacity>

        <TextInput
          placeholder="Message"
          placeholderTextColor={isDarkColorScheme ? "#cccccc" : "#5e5d5d"}
          multiline
          value={message}
          onChangeText={setMessage}
          className="flex-1 text-black dark:text-white px-2 text-lg max-h-24"
        />

        <TouchableOpacity className="mx-1" onPress={() => handlePickMedia("image")}>
          <Paperclip size={22} color={isDarkColorScheme ? "#ffffff" : "#000000"} />
        </TouchableOpacity>

        <TouchableOpacity className="mx-1" onPress={() => handlePickMedia("video")}>
          <Camera size={22} color={isDarkColorScheme ? "#ffffff" : "#000000"} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSendText}
          className="ml-1.5 p-2 bg-blue-600 rounded-full"
        >
          {message?.toString().trim() ? (
            <SendHorizontal size={22} color="white" />
          ) : (
            <Mic size={22} color="white" />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
