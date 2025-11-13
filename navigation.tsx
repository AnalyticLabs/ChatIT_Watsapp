import { createNavigationContainerRef, DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import CreateNewPassword from './src/pages/authentication/createNewPassword';
import ForgetPassword from './src/pages/authentication/forgetPassword';
import LoginEmail from './src/pages/authentication/loginEmail';
import SignUp from './src/pages/authentication/signUp';
import Verification from './src/pages/authentication/verification';
import WelcomePage from './src/pages/authentication/welcomePage';
import CallHistory from './src/pages/calls/callHistory';
import Calling from './src/pages/calls/calling';
import Calls from './src/pages/calls/calls';
import GroupAudioCallAttend from './src/pages/calls/groupAudioCallAttend';
import GroupVideoCallAttend from './src/pages/calls/groupVideoCallAttend';
import SingleAudioCallAttend from './src/pages/calls/singleAudioCallAttend';
import SingleAudioCallRing from './src/pages/calls/singleAudioCallRing';
import SingleVideoCallAttend from './src/pages/calls/singleVideoCallAttend';
import Chats from './src/pages/chat/chats';
import Forward from './src/pages/chat/forward';
import NewChat from './src/pages/chat/newChat';
import ChatView from './src/pages/chatView/chatView';
import UserProfile from './src/pages/chatView/userProfile';
import ChooseWallper from './src/pages/chooseWallpaper';
import AddContact from './src/pages/contact/addContact';
import ContactDetails from './src/pages/contact/contactDetails';
import ContactPage from './src/pages/contact/contactPage';
import EditContact from './src/pages/contact/editContact';
import CreateGroup from './src/pages/groups/createGroup';
import CreateGroupUserSelect from './src/pages/groups/createGroupUserSelect';
import GroupChatting from './src/pages/groups/groupChatting';
import GroupChattingAdmin from './src/pages/groups/groupChattingAdmin';
import GroupInfo from './src/pages/groups/groupInfo';
import GroupInfoAdmin from './src/pages/groups/groupInfoAdmin';
import GroupSettings from './src/pages/groups/groupSettings';
import Groups from './src/pages/groups/groups';
import Invitefriend from './src/pages/invitefriend';
import ImageScreen from './src/pages/media/image';
import ImageView from './src/pages/media/imageView';
import Link from './src/pages/media/link';
import Media from './src/pages/media/media';
import Video from './src/pages/media/video';
import VideoView from './src/pages/media/videoView';
import MessageInfo from './src/pages/messageInfo';
import EditAccountSettings from './src/pages/settings/editAccountSettings';
import AccountSettings from './src/pages/settings/accountSettings';
import BlockedContacts from './src/pages/settings/blockedContacts';
import ChatSettings from './src/pages/settings/chatSettings';
import DeleteAccount from './src/pages/settings/deleteAccount';
import ManageDevices from './src/pages/settings/manageDevices';
import Notification from './src/pages/settings/notification';
import Password from './src/pages/settings/password';
import Privacy from './src/pages/settings/privacy';
import PrivacyPolicy from './src/pages/settings/privacyPolicy';
import SettingsScreen from './src/pages/settings/settingsScreen';
import SocialProfiles from './src/pages/settings/socialProfiles';
import StatusMyContactsExceptOnly from './src/pages/settings/statusMyContactsExceptOnly';
import StatusOnlyShareWith from './src/pages/settings/statusOnlyShareWith';
import StarredMessages from './src/pages/starredMessages';
import FriendStatus from './src/pages/status/friendStatus';
import MyStatus from './src/pages/status/myStatus';
import NoStatus from './src/pages/status/noStatus';
import StatusAdd from './src/pages/status/statusAdd';
import VerifyCode from './src/pages/verifyCode';
import { useTheme } from './src/theme/themeContext';
import TermsAndConditions from './src/utils/data/termsAndConditions';
import { screenName } from './src/utils/screenName';
import { colors } from './src/utils/colors';
import MainStack from './src/navigation/MainStack';
import { get } from './src/utils/storage';
import { TOKEN_KEY } from './src/services/Endpoints';
import { useAppDispatch, useAppSelector } from './src/redux/hooks';
import { setIsLoggedIn } from './src/redux/slices/authSlice';
import { socket } from './src/utils/socket';
import AuthStackNavigator from './src/navigation/AuthStack';

const Stack = createNativeStackNavigator();
interface NavigationProps {
    initialRouteName: string;
}

export const screenOptions = {
    cardStyle: {
        backgroundColor: colors.white,
    },
    tabBarHideOnKeyboard: true,
    // cardStyleInterpolator: slide,
    headerShown: false,

};

export const navigationRef = createNavigationContainerRef();

const HomeNavigation = (props: NavigationProps) => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={props.initialRouteName}>
            {/* <Stack.Screen name={screenName.WelcomePage} component={WelcomePage} /> */}
            <Stack.Screen name={screenName.LoginEmail} component={LoginEmail} />
            <Stack.Screen name={screenName.ForgetPassword} component={ForgetPassword} />
            <Stack.Screen name={screenName.Verification} component={Verification} />
            <Stack.Screen name={screenName.SignUp} component={SignUp} />
            <Stack.Screen name={screenName.Chats} component={Chats} />
            <Stack.Screen name={screenName.ChatView} component={ChatView} />
            <Stack.Screen name={screenName.UserProfile} component={UserProfile} />
            <Stack.Screen name={screenName.CreateNewPassword} component={CreateNewPassword} />
            <Stack.Screen name={screenName.AddContact} component={AddContact} />
            <Stack.Screen name={screenName.ContactPage} component={ContactPage} />
            <Stack.Screen name={screenName.SettingsScreen} component={SettingsScreen} />
            <Stack.Screen name={screenName.SocialProfiles} component={SocialProfiles} />
            <Stack.Screen name={screenName.Password} component={Password} />
            <Stack.Screen name={screenName.Group} component={Groups} />
            <Stack.Screen name={screenName.GroupChatting} component={GroupChatting} />
            <Stack.Screen name={screenName.GroupChattingAdmin} component={GroupChattingAdmin} />
            <Stack.Screen name={screenName.GroupInfo} component={GroupInfo} />
            <Stack.Screen name={screenName.GroupInfoAdmin} component={GroupInfoAdmin} />
            <Stack.Screen name={screenName.SingleAudioCallRing} component={SingleAudioCallRing} />
            <Stack.Screen name={screenName.SingleAudioCallAttend} component={SingleAudioCallAttend} />
            <Stack.Screen name={screenName.Calling} component={Calling} />
            <Stack.Screen name={screenName.SingleVideoCall} component={SingleVideoCallAttend} />
            <Stack.Screen name={screenName.GroupAudioCallAttend} component={GroupAudioCallAttend} />
            <Stack.Screen name={screenName.GroupVideoCallAttend} component={GroupVideoCallAttend} />
            <Stack.Screen name={screenName.Media} component={Media} />
            <Stack.Screen name={screenName.Image} component={ImageScreen} />
            <Stack.Screen name={screenName.ImageView} component={ImageView} />
            <Stack.Screen name={screenName.Video} component={Video} />
            <Stack.Screen name={screenName.Link} component={Link} />
            <Stack.Screen name={screenName.VideoView} component={VideoView} />
            <Stack.Screen name={screenName.StarredMsg} component={StarredMessages} />
            <Stack.Screen name={screenName.Privacy} component={Privacy} />
            <Stack.Screen name={screenName.ChatSettings} component={ChatSettings} />
            <Stack.Screen name={screenName.Calls} component={Calls} />
            <Stack.Screen name={screenName.CallHistory} component={CallHistory} />
            <Stack.Screen name={screenName.GroupSettings} component={GroupSettings} />
            <Stack.Screen name={screenName.VerifyCode} component={VerifyCode} />
            <Stack.Screen name={screenName.ChooseWallpaper} component={ChooseWallper} />
            <Stack.Screen name={screenName.Notification} component={Notification} />
            <Stack.Screen name={screenName.TermsAndCondition} component={TermsAndConditions} />
            <Stack.Screen name={screenName.CreateGroup} component={CreateGroup} />
            <Stack.Screen name={screenName.CreateGroupUserSelect} component={CreateGroupUserSelect} />
            <Stack.Screen name={screenName.AccountSettings} component={AccountSettings} />
            <Stack.Screen name={screenName.StatusMyContactExcept} component={StatusMyContactsExceptOnly} />
            <Stack.Screen name={screenName.StatusOnlyShareWith} component={StatusOnlyShareWith} />
            <Stack.Screen name={screenName.EditAccountSettings} component={EditAccountSettings} />
            <Stack.Screen name={screenName.DeleteAccount} component={DeleteAccount} />
            <Stack.Screen name={screenName.BlockedContacts} component={BlockedContacts} />
            <Stack.Screen name={screenName.NewChat} component={NewChat} />
            <Stack.Screen name={screenName.ForwardTo} component={Forward} />
            <Stack.Screen name={screenName.InviteFriend} component={Invitefriend} />
            <Stack.Screen name={screenName.MessageInfo} component={MessageInfo} />
            <Stack.Screen name={screenName.Managedevices} component={ManageDevices} />
            <Stack.Screen name={screenName.PrivacyPolicy} component={PrivacyPolicy} />
            <Stack.Screen name={screenName.NoStatus} component={NoStatus} />
            <Stack.Screen name={screenName.StatusAdd} component={StatusAdd} />
            <Stack.Screen name={screenName.MyStatus} component={MyStatus} />
            <Stack.Screen name={screenName.FriendStatus} component={FriendStatus} />
            <Stack.Screen name={screenName.EditContact} component={EditContact} />
            <Stack.Screen name={screenName.ContactDetails} component={ContactDetails} />
        </Stack.Navigator>
    );
};
interface RootNavigationProps {
    initialRouteName: string;
};

const RootNavigation = (props: RootNavigationProps) => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector(state => state.auth);
    const checkIsLoggedIn = async () => {
        const token = await get(TOKEN_KEY);

        if (token !== null) {
            dispatch(setIsLoggedIn(true));
        }
    };

    useEffect(() => {
        checkIsLoggedIn();
    }, [isAuthenticated]);

    return (
        <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
            {/* <HomeNavigation initialRouteName={props.initialRouteName} /> */}

            <Stack.Navigator screenOptions={screenOptions}>
                {!isAuthenticated ?
                    <Stack.Screen name={'AuthStack'} component={AuthStackNavigator} />
                    : <Stack.Screen name={'MainStack'} component={MainStack} />

                }
                {/* <Stack.Screen name={screenName.Chats} component={Chats} /> */}
                <Stack.Screen name={screenName.ChatView} component={ChatView} />
                <Stack.Screen name={screenName.UserProfile} component={UserProfile} />
                <Stack.Screen name={screenName.CreateNewPassword} component={CreateNewPassword} />
                <Stack.Screen name={screenName.AddContact} component={AddContact} />
                <Stack.Screen name={screenName.ContactPage} component={ContactPage} />
                <Stack.Screen name={screenName.SettingsScreen} component={SettingsScreen} />
                <Stack.Screen name={screenName.SocialProfiles} component={SocialProfiles} />
                <Stack.Screen name={screenName.Password} component={Password} />
                <Stack.Screen name={screenName.Group} component={Groups} />
                <Stack.Screen name={screenName.GroupChatting} component={GroupChatting} />
                <Stack.Screen name={screenName.GroupChattingAdmin} component={GroupChattingAdmin} />
                <Stack.Screen name={screenName.GroupInfo} component={GroupInfo} />
                <Stack.Screen name={screenName.GroupInfoAdmin} component={GroupInfoAdmin} />
                <Stack.Screen name={screenName.SingleAudioCallRing} component={SingleAudioCallRing} />
                <Stack.Screen name={screenName.SingleAudioCallAttend} component={SingleAudioCallAttend} />
                <Stack.Screen name={screenName.Calling} component={Calling} />
                <Stack.Screen name={screenName.SingleVideoCall} component={SingleVideoCallAttend} />
                <Stack.Screen name={screenName.GroupAudioCallAttend} component={GroupAudioCallAttend} />
                <Stack.Screen name={screenName.GroupVideoCallAttend} component={GroupVideoCallAttend} />
                <Stack.Screen name={screenName.Media} component={Media} />
                <Stack.Screen name={screenName.Image} component={ImageScreen} />
                <Stack.Screen name={screenName.ImageView} component={ImageView} />
                <Stack.Screen name={screenName.Video} component={Video} />
                <Stack.Screen name={screenName.Link} component={Link} />
                <Stack.Screen name={screenName.VideoView} component={VideoView} />
                <Stack.Screen name={screenName.StarredMsg} component={StarredMessages} />
                <Stack.Screen name={screenName.Privacy} component={Privacy} />
                <Stack.Screen name={screenName.ChatSettings} component={ChatSettings} />
                <Stack.Screen name={screenName.Calls} component={Calls} />
                <Stack.Screen name={screenName.CallHistory} component={CallHistory} />
                <Stack.Screen name={screenName.GroupSettings} component={GroupSettings} />
                <Stack.Screen name={screenName.VerifyCode} component={VerifyCode} />
                <Stack.Screen name={screenName.ChooseWallpaper} component={ChooseWallper} />
                <Stack.Screen name={screenName.Notification} component={Notification} />
                <Stack.Screen name={screenName.TermsAndCondition} component={TermsAndConditions} />
                <Stack.Screen name={screenName.CreateGroup} component={CreateGroup} />
                <Stack.Screen name={screenName.CreateGroupUserSelect} component={CreateGroupUserSelect} />
                <Stack.Screen name={screenName.AccountSettings} component={AccountSettings} />
                <Stack.Screen name={screenName.StatusMyContactExcept} component={StatusMyContactsExceptOnly} />
                <Stack.Screen name={screenName.StatusOnlyShareWith} component={StatusOnlyShareWith} />
                <Stack.Screen name={screenName.EditAccountSettings} component={EditAccountSettings} />
                <Stack.Screen name={screenName.DeleteAccount} component={DeleteAccount} />
                <Stack.Screen name={screenName.BlockedContacts} component={BlockedContacts} />
                <Stack.Screen name={screenName.NewChat} component={NewChat} />
                <Stack.Screen name={screenName.ForwardTo} component={Forward} />
                <Stack.Screen name={screenName.InviteFriend} component={Invitefriend} />
                <Stack.Screen name={screenName.MessageInfo} component={MessageInfo} />
                <Stack.Screen name={screenName.Managedevices} component={ManageDevices} />
                <Stack.Screen name={screenName.PrivacyPolicy} component={PrivacyPolicy} />
                <Stack.Screen name={screenName.NoStatus} component={NoStatus} />
                <Stack.Screen name={screenName.StatusAdd} component={StatusAdd} />
                <Stack.Screen name={screenName.MyStatus} component={MyStatus} />
                <Stack.Screen name={screenName.FriendStatus} component={FriendStatus} />
                <Stack.Screen name={screenName.EditContact} component={EditContact} />
                <Stack.Screen name={screenName.ContactDetails} component={ContactDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigation;