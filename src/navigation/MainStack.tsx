import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector } from '../redux/hooks';
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

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const diet = useAppSelector(state => state.auth.user?.diet)
  const Tab = createBottomTabNavigator();

  // const initialRoute = diet ? screenName.MemberTabs : SCREENS.FillDetails
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      initialRouteName={screenName.Chats}
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.black },
        animation: 'slide_from_right',
      }}>
      <Tab.Screen name={screenName.Chats} component={Chats} />
      
    </Tab.Navigator>
  )
}

export default MainStack;
