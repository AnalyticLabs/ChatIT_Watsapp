import React from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
// import { useGetChatsQuery } from "../../services/chatApi";
import ChatItem from "../../components/ChatItem";
import { styles } from "./style";


const ArchivedChatsScreen = () => {
  // const { data: chats = [], isLoading } = useGetChatsQuery();

  const archived = chats?.filter((c: any) => c.isArchived);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#25D366" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Archived Chats</Text>

      {archived.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>No archived chats</Text>
        </View>
      ) : (
        <FlatList
          data={archived}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ChatItem chat={item} onPress={() => {}} />
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

export default ArchivedChatsScreen;
