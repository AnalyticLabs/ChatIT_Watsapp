import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";
import { createConversationService } from "../../services/Chat"; // optional if you want to create a new one
import { getUsersService } from "../../services/Auth";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { navigationRef } from "../rootstack";
import { useTheme } from "../../theme/ThemeProvider";
import IMAGES from "../../utils/IMAGES";
import { useFocusEffect } from "@react-navigation/native";


const UsersListScreen = ({ navigation }: any) => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();


  // useEffect(() => {
  //   fetchUsers();
  // }, []);


  useFocusEffect(
    React.useCallback(() => {
      fetchUsers();
    }, [])
  )

  const fetchUsers = async () => {
    try {
      const res = await getUsersService();
      setUsers(res.data?.data || []);
    } catch (error) {
      console.log("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserPress = async (user: any) => {

    if (user.conversation) {
      // 🟢 Navigate to existing chat
      navigationRef.navigate("ChatScreen", {
        chatId: user.conversation._id,
        chatDetails: user,
      });
    } else {
      // 🆕 Create a new chat (if API available)
      try {
        // const res = await createConversationService({
        //   receiverId: user._id,
        // });
        // const newChatId = res.data?.data?._id;
        navigation.navigate("ChatScreen", {
          chatId: "",
          chatDetails: user,
        });
      } catch (error) {
        console.log("Error creating conversation:", error);
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { marginTop: insets.top }]}>
      <Text style={styles.headerTitle}>Select Contact</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userItem}
            onPress={() => handleUserPress(item)}
          >
            <Image
              source={item?.avatar ? {
                uri:
                  item?.avatar,
              } : IMAGES.placeholder}
              style={styles.userAvatar}
            />
            <View>
              <Text style={styles.userName}>
                {item.phoneSuffix} {item.phoneNumber}
              </Text>
              {item.conversation?.lastMessage ? (
                <Text style={styles.userSubtitle} numberOfLines={1}>
                  {item.conversation.lastMessage.content}
                </Text>
              ) : (
                <Text style={styles.userSubtitle}>Start new chat</Text>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default UsersListScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#000",
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e0e0e0",
  },
  userAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 12,
    backgroundColor: "#d9d9d9",
  },
  userName: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  userSubtitle: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
  },
});
