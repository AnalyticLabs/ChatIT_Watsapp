// import React from "react";
// import { View, Text, Image, TouchableOpacity } from "react-native";
// import { styles } from "../screens/Chats/style";

// interface ChatItemProps {
//   chat: any;
//   onPress: () => void;
// }

// const ChatItem: React.FC<ChatItemProps> = ({ chat, onPress }) => {
//   return (
//     <TouchableOpacity style={styles.chatItem} onPress={onPress}>
//       <Image source={{ uri: chat.avatar }} style={styles.avatar} />
//       <View style={styles.chatContent}>
//         <View style={styles.chatHeader}>
//           <Text style={styles.chatName}>{chat.name}</Text>
//           <Text style={styles.chatTime}>{chat.time}</Text>
//         </View>
//         <View style={styles.chatFooter}>
//           <Text numberOfLines={1} style={styles.lastMessage}>
//             {chat.lastMessage}
//           </Text>
//           {chat.unread > 0 && (
//             <View style={styles.unreadBadge}>
//               <Text style={styles.unreadText}>{chat.unread}</Text>
//             </View>
//           )}
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default ChatItem;

import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "../screens/Chats/style";
import IMAGES from "../utils/IMAGES";

interface ChatItemProps {
  chat: any;
  currentUserId: string; // add this prop to identify opponent
  onPress: () => void;
}


const ChatItem: React.FC<ChatItemProps> = ({ chat, currentUserId, onPress }) => {
  // find the opponent participant (not the current user)
  const opponent = chat.participants?.find(
    (p: any) => p._id !== currentUserId
  );
  
  const opponentName = opponent?._id || "Unknown";
  const contact = opponent?.phoneSuffix + opponent?.phoneNumber;
  const lastMessage = chat.lastMessage?.content || "";
  const time = new Date(chat.lastMessage?.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const unread = chat.unreadCount || 0;

  return (
    <TouchableOpacity style={styles.chatItem} onPress={onPress}>
      <Image
        source={IMAGES.placeholder} // fallback image
        style={styles.avatar}
      />
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{contact}</Text>
          <Text style={styles.chatTime}>{time}</Text>
        </View>
        <View style={styles.chatFooter}>
          <Text numberOfLines={1} style={styles.lastMessage}>
            {lastMessage}
          </Text>
          {unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
