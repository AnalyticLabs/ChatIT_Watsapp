import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import LoginEmail from '../pages/authentication/loginEmail';
import ForgetPassword from '../pages/authentication/forgetPassword';
import CreateNewPassword from '../pages/authentication/createNewPassword';
import SignUp from '../pages/authentication/signUp';
import Verification from '../pages/authentication/verification';
import CallHistory from '../pages/calls/callHistory';
import Calling from '../pages/calls/calling';
import Calls from '../pages/calls/calls';
import GroupAudioCallAttend from '../pages/calls/groupAudioCallAttend';
import GroupVideoCallAttend from '../pages/calls/groupVideoCallAttend';
import SingleAudioCallAttend from '../pages/calls/singleAudioCallAttend';
import SingleAudioCallRing from '../pages/calls/singleAudioCallRing';
import SingleVideoCallAttend from '../pages/calls/singleVideoCallAttend';
import Chats from '../pages/chat/chats';
import Forward from '../pages/chat/forward';
import NewChat from '../pages/chat/newChat';
import ChatView from '../pages/chatView/chatView';
import UserProfile from '../pages/chatView/userProfile';
import ChooseWallper from '../pages/chooseWallpaper';
import AddContact from '../pages/contact/addContact';
import ContactDetails from '../pages/contact/contactDetails';
import ContactPage from '../pages/contact/contactPage';
import EditContact from '../pages/contact/editContact';
import CreateGroup from '../pages/groups/createGroup';
import CreateGroupUserSelect from '../pages/groups/createGroupUserSelect';
import GroupChatting from '../pages/groups/groupChatting';
import GroupChattingAdmin from '../pages/groups/groupChattingAdmin';
import GroupInfo from '../pages/groups/groupInfo';
import GroupInfoAdmin from '../pages/groups/groupInfoAdmin';
import GroupSettings from '../pages/groups/groupSettings';
import Groups from '../pages/groups/groups';
import Invitefriend from '../pages/invitefriend';
import ImageScreen from '../pages/media/image';
import ImageView from '../pages/media/imageView';
import Link from '../pages/media/link';
import Media from '../pages/media/media';
import Video from '../pages/media/video';
import VideoView from '../pages/media/videoView';
import MessageInfo from '../pages/messageInfo';
import EditAccountSettings from '../pages/settings/editAccountSettings';
import AccountSettings from '../pages/settings/accountSettings';
import BlockedContacts from '../pages/settings/blockedContacts';
import ChatSettings from '../pages/settings/chatSettings';
import DeleteAccount from '../pages/settings/deleteAccount';
import ManageDevices from '../pages/settings/manageDevices';
import Notification from '../pages/settings/notification';
import Password from '../pages/settings/password';
import Privacy from '../pages/settings/privacy';
import PrivacyPolicy from '../pages/settings/privacyPolicy';
import SettingsScreen from '../pages/settings/settingsScreen';
import SocialProfiles from '../pages/settings/socialProfiles';
import StatusMyContactsExceptOnly from '../pages/settings/statusMyContactsExceptOnly';
import StatusOnlyShareWith from '../pages/settings/statusOnlyShareWith';
import StarredMessages from '../pages/starredMessages';
import FriendStatus from '../pages/status/friendStatus';
import MyStatus from '../pages/status/myStatus';
import NoStatus from '../pages/status/noStatus';
import StatusAdd from '../pages/status/statusAdd';
import VerifyCode from '../pages/verifyCode';
import TermsAndConditions from '../utils/data/termsAndConditions';
import { screenName } from '../utils/screenName';
import { colors } from '../utils/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './CustomTabBar';
import AllCalls from '../components/calls/allCalls';
import { labels } from '../utils/labels';
import AppImage from '../components/AppImage';
import { styles } from '../../assets/styles';
import CustomIcon from '../utils/Icons';
import { fontValue } from '../utils/responsiveFont';
import { PermissionsAndroid, Platform } from 'react-native';
import Contacts from 'react-native-contacts';
import { setAllContacts } from '../redux/slices/home';
import { formatContact } from '../utils/functions';
import { getProfileService } from '../services/Auth';
import { setUser } from '../redux/slices/authSlice';


const Stack = createNativeStackNavigator();

const MainStack = () => {
  const dispatch = useAppDispatch();
  const BottomTabs = createBottomTabNavigator();

  const [contacts, setContacts] = useState([]);
  const [formattedContacts, setFormattedContacts] = useState([]);

  useEffect(() => {
    getContactsPermission();
    getUser();
  }, []);

  const getUser = async () => {
          try {
              const res = await getProfileService();
              dispatch(setUser(res?.data?.data || []));
              console.log(res?.data?.data, 'user-=-=-=-=-=-=-=-=-=-');
  
          } catch (err) {
              console.log("❌ Fetch chats error:", err);
          } 
      };

  const getContactsPermission = async () => {
    if (Platform.OS === 'android') {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      );

      if (permission === PermissionsAndroid.RESULTS.GRANTED) {
        loadContacts();
      } else {
        console.log("Contacts permission denied");
      }
    } else {
      loadContacts();
    }
  };

  const loadContacts = () => {
    Contacts.getAll()
      .then(cont => {
        setContacts(cont);
      })
      .catch(err => console.warn(err));
  };

  // *********** STORE HERE ************
  useEffect(() => {
    if (Array.isArray(contacts) && contacts.length > 0) {
      const formatted = contacts.map(formatContact);
      setFormattedContacts(formatted);   // local state
      dispatch(setAllContacts(formatted)); // redux store
    }
  }, [contacts]);

  return (
    <BottomTabs.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      initialRouteName={screenName.Chats}
      screenOptions={{
        headerShown: false,
        // contentStyle: {backgroundColor: colors.black},
        // animation: 'slide_from_right',
      }}>
      <BottomTabs.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <CustomIcon
              name={'chatbox-ellipses-outline'}
              type={'Ionicons'}
              size={fontValue(22)}
              color={colors.primaryVar2}
            />
          ),
          tabBarLabel: labels.chat,
          tabBarHideOnKeyboard: true,
        }}
        name={screenName.Chats} component={Chats} />
      <BottomTabs.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <CustomIcon
              name={'users'}
              type={'Feather'}
              size={fontValue(21)}
              color={colors.primaryVar2}
            />
          ),
          tabBarLabel: labels.Group,
          tabBarHideOnKeyboard: true,
        }}
        name={screenName.Group}

        component={Groups} />
      <BottomTabs.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <CustomIcon
              name={'record-circle-outline'}
              type={'MaterialCommunityIcons'}
              size={fontValue(23)}
              color={colors.primaryVar2}
            />
          ),
          tabBarLabel: labels.Status,
          tabBarHideOnKeyboard: true,
        }}
        name={screenName.NoStatus} component={NoStatus} />
      <BottomTabs.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <CustomIcon
              name={'person-circle-outline'}
              type={'Ionicons'}
              size={fontValue(22)}
              color={colors.primaryVar2}
            />
          ),
          tabBarLabel: labels.Contact,
          tabBarHideOnKeyboard: true,
        }}
        name={screenName.ContactPage} component={ContactPage} />
      <BottomTabs.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <CustomIcon
              name={'phone'}
              type={'Feather'}
              size={fontValue(20)}
              color={colors.primaryVar2}
            />
          ),
          tabBarLabel: labels.Call,
          tabBarHideOnKeyboard: true,
        }}
        name={screenName.Calls} component={Calls} />


    </BottomTabs.Navigator>
  );
};

export default MainStack;
