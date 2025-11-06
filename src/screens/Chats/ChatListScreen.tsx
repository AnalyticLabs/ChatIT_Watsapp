// import React, { useRef, useState } from "react";
// import {
//   View,
//   ActivityIndicator,
//   Animated,
//   TouchableOpacity,
//   Text,
//   Image,
// } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import ChatItem from "../../components/ChatItem";
// import { styles } from "./style";
// import { styles as commonStyles } from "../../assets/styles/index";
// import { getConversationsService } from "../../services/Chat";
// import { Plus } from "lucide-react-native"; // optional icon library
// import { useTheme } from "../../theme/ThemeProvider";
// import { useFocusEffect, useNavigation } from "@react-navigation/native";

// const ChatListScreen = () => {
//   const navigation = useNavigation();
//   const [chats, setChats] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const scrollY = useRef(new Animated.Value(0)).current;
//   const insets = useSafeAreaInsets();
//   const { colors } = useTheme();

//   const getConversations = async () => {
//     try {
//       setIsLoading(true);
//       const response = await getConversationsService();
//       if (response?.data) {
//         console.log(response?.data, 'response?.data');

//         setChats(response.data?.data);
//       }
//     } catch (error) {
//       console.log("Error fetching conversations:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useFocusEffect(
//     React.useCallback(() => {
//       getConversations();
//     }, [])
//   )

//   if (isLoading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color={colors.primary} />
//       </View>
//     );
//   }
//   return (
//     <View style={[styles.container, { marginTop: insets.top }]}>
//       <View style={styles.imageContainer} >
//         <Image source={require("../../assets/icons/Logo.jpeg")}
//           style={commonStyles.img}
//           resizeMode="cover"
//         />
//         <Text style={styles.logoText} >ChatIt</Text>
//       </View>
//       <Animated.FlatList
//         data={chats}
//         keyExtractor={(item) => item._id.toString()}
//         renderItem={({ item }) => (
//           <ChatItem
//             chat={item}
//             currentUserId={"6906430f57f3e6a23395d41a"}
//             onPress={() => {
//               navigation?.navigate("ChatScreen", {
//                 chatId: item._id,
//                 chatDetails: item.participants?.find(
//                   (p: any) => p._id !== "6906430f57f3e6a23395d41a"
//                 ),
//               });
//             }}
//           />
//         )}
//         contentContainerStyle={styles.listContainer}
//         scrollEventThrottle={16}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           { useNativeDriver: true }
//         )}
//       />

//       {/* Floating New Chat Button */}
//       <TouchableOpacity
//         style={styles.fab}
//         activeOpacity={0.8}
//         onPress={() => navigation.navigate("UsersList")}
//       >
//         {/* Optional icon */}
//         <Plus color="#fff" size={22} />
//         <Text style={styles.fabText}>New Chat</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={[styles.fab, { bottom: 90 }]}
//         activeOpacity={0.8}
//         onPress={() => navigation.navigate("CreateGroup")}
//       >
//         <Plus color="#fff" size={22} />
//         <Text style={styles.fabText}>New Group</Text>
//       </TouchableOpacity>

//     </View>
//   );
// };

// export default ChatListScreen;


import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Animated,
  FlatList,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Plus } from "lucide-react-native";

import ChatItem from "../../components/ChatItem";
import { styles } from "./style";
import { styles as commonStyles } from "../../assets/styles";
import { useTheme } from "../../theme/ThemeProvider";
import { getConversationsService, getUserGroupsService } from "../../services/Chat";
import { getUsersService } from "../../services/Auth";

const Tab = createMaterialTopTabNavigator();

const OneToOneChats = () => {
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { colors } = useTheme();

  const fetchChats = async () => {
    try {
      setLoading(true);
      const res = await getConversationsService();
      setChats(res?.data?.data || []);
    } catch (err) {
      console.log("❌ Fetch chats error:", err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchChats();
      getUser()
    }, [])
  );

  const getUser = async () => {
    try {
      setLoading(true);
      const res = await getUsersService();
      setUser(res?.data?.data || []);
    } catch (err) {
      console.log("❌ Fetch chats error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
console.log(user,'--------user');

  return (
    <FlatList
      data={chats}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <ChatItem
          chat={item}
          currentUserId={user?._id}
          onPress={() => {
            navigation.navigate("ChatScreen", {
              chatId: item._id,
              currentUserId:user?._id,
              chatDetails: item.participants?.find(
                (p) => p._id !== user?._id
              ),
            });
          }}
        />
      )}
      contentContainerStyle={{ paddingBottom: 100 }}
    />
  );
};

const GroupChats = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { colors } = useTheme();

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const res = await getUserGroupsService(); // your API: /api/group/user-groups
      setGroups(res?.data?.data || []);
    } catch (err) {
      console.log("❌ Fetch groups error:", err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchGroups();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={groups}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TouchableOpacity
          // onPress={() =>
          //   navigation.navigate("GroupChatScreen", { groupDetails: item })
          // }
          onPress={() => {
            navigation.navigate("ChatScreen", {
              chatId: item._id,
              chatDetails: {...item, isGroup: true}
            });
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 12,
            borderBottomWidth: 0.5,
            borderColor: "#ddd",
          }}
        >
          <Image
            source={{
              uri:
                item?.profilePicture ||
                "https://cdn-icons-png.flaticon.com/512/1246/1246338.png",
            }}
            style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }}
          />
          <View>
            <Text style={{ fontWeight: "bold", color: "#000", fontSize: 16 }}>
              {item.name}
            </Text>
            <Text style={{ color: "#555", marginTop: 4 }}>
              {item.description}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={{ paddingBottom: 100 }}
    />
  );
};

const ChatListScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { marginTop: insets.top }]}>
      {/* Header */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/icons/Logo.jpeg")}
          style={commonStyles.img}
          resizeMode="cover"
        />
        <Text style={styles.logoText}>ChatIt</Text>
      </View>

      {/* Top Tabs */}
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#fff",
            elevation: 0,
            borderBottomWidth: 1,
            borderColor: "#eee",
          },
          tabBarLabelStyle: {
            fontWeight: "600",
            fontSize: 15,
            textTransform: "none",
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.primary,
            height: 3,
            borderRadius: 3,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: "#888",
        }}
      >
        <Tab.Screen name="Chats" component={OneToOneChats} />
        <Tab.Screen name="Groups" component={GroupChats} />
      </Tab.Navigator>

      {/* Floating buttons */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("UsersList")}
      >
        <Plus color="#fff" size={22} />
        <Text style={styles.fabText}>New Chat</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.fab, { bottom: 90 }]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("CreateGroup")}
      >
        <Plus color="#fff" size={22} />
        <Text style={styles.fabText}>New Group</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatListScreen;
