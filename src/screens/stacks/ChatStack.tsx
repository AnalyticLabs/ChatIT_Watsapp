import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import ChatListScreen from "../Chats/ChatListScreen";
import ArchivedChatsScreen from "../Chats/ArchivedChatsScreen";
import ChatScreen from "../Chats/ChatScreen";
import { SCREENS } from "../../utils/constants";
import { screenOptions } from "../rootstack";
import ExampleSheet from '../../components/Examplee';
import ContactInfo from '../ContactInfo';
import UsersListScreen from '../Chats/UsersListScreen';

const ChatStack = createStackNavigator();

const ChatStackNavigator = () => {
  return (
    <ChatStack.Navigator
      initialRouteName={SCREENS.Chat}
      screenOptions={screenOptions}
      >
      <ChatStack.Screen
        name="Chat"
        component={ChatListScreen}
        options={{ title: "WhatsApp" }}
      />
      <ChatStack.Screen
        name="ArchivedChats"
        component={ArchivedChatsScreen}
        options={{ title: "Archived Chats" }}
      />
      {/* <ChatStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ title: "ChatRoom",}}
      /> */}
      <ChatStack.Screen
        name="ExampleSheet"
        component={ExampleSheet}
        options={{ title: "ExampleSheet" }}
      />
      {/* <ChatStack.Screen
        name="ContactInfo"
        component={ContactInfo}
        options={{ title: "ContactInfo" }}
      /> */}
      <ChatStack.Screen
        name="UsersList"
        component={UsersListScreen}
        options={{ title: "UsersList" }}
      />
    </ChatStack.Navigator>
  );
}

export default ChatStackNavigator;