import { colors } from "../colors";
import { labels } from "../labels";
import { screenName } from "../screenName";

export const threeDotsOption = [
    {
        id: 1,
        name : labels.ViewContact,
        iconName : 'person-circle-outline',
        iconType : "Ionicons",
        iconSize : 18,
        screenName : screenName.ChatView,
    },
    {
        id: 2,
        name : labels.MarkAsRead,
        iconName : 'checkmark-circle-outline',
        iconType : "Ionicons",
        iconSize : 18,
        screenName : screenName.ChatView,}]

export const profilePic = [
    {
        id: 1,
        status: labels.everyOne,
    },
    {
        id: 2,
        status: labels.myContact,
    },
    {
        id: 3,
        status: labels.myConExpect,
    },
    {
        id: 4,
        status: labels.nobody,
    },
]

export const lastSee = [
    {
        id: 1,
        status: labels.everyOne,
    },
    {
        id: 2,
        status: labels.sameaslastSeen

    }
]


export const groupsData = [
    {
        id: 1,
        status: labels.everyOne,
    },
    {
        id: 2,
        status: labels.myContact,
    },
    {
        id: 3,
        status: labels.myConExpect,
    },
]


export const chooseTheme =[
    {
        id:1,
        status:labels.systemDefault
    },
    {
        id:2,
        status:labels.light
    },
    {
        id:3,
        status:labels.dark
    }
]

export const clearAllChats =[
    {
        id:1,
        status:labels.deleteMsg1
    },
    {
        id:2,
        status:labels.deleteMsg2
    },
]

export const deleteAllChats =[
    {
        id:1,
        status:labels.deleteMsg1,
        iconSize : 20,
        screenName : screenName.ChatView,
    },
]

export const CallThreeDotsOption = [
    {
        id: 1,
        name : labels.RemoveFromCallLog,
        iconName : 'delete',
        iconType : "AntDesign",
        iconSize : 16,
    },
    {
        id: 2,
        name : labels.Block,
        iconName : 'block',
        iconType : "entypo",
        iconSize : 16,
    },
]

export const muteNotificationdata = [
    {
        id : 1,
        name : '15 Minutes',
    },
    {
        id : 2,
        name : '1 Hour',
    },
    {
        id : 3,
        name : '1 Day',
    },
    {
        id : 4,
        name : '1 Week',
    },
    {
        id : 5,
        name : '1 Month',
    },
    {
        id : 6,
        name : '1 Year',
    },
    {
        id : 7,
        name : 'Always',
    },
]

export const statusPrivacydata = [
    {
        id : 1,
        name : 'My Contacts',
    },
    {
        id : 2,
        name : 'My Contacts Except Only',
    },
    {
        id : 3,
        name : 'Only Share with',
    },
]

export const LanguagesData = [
    {
        id : 1,
        name : 'English',
    },
    {
        id : 2,
        name : 'French',
    },
    {
        id : 3,
        name : 'Japanese',
    },
]

export const chatViewModalData = [
    {
        id: 1,
        iconName: 'person-circle-outline',
        iconSize: 16,
        iconColor: colors.blackVar1,
        iconType: 'Ionicons',
        text: labels.ViewContact,
        screenName: screenName.ChooseWallpaper,

    },
    {
        id: 2,
        iconName: 'photo',
        iconSize: 16,
        iconColor: colors.blackVar1,
        iconType: 'FontAwesome',
        text: labels.Media,
        screenName: screenName.ChooseWallpaper,

    },
    {
        id: 3,
        iconName: 'search',
        iconSize: 16,
        iconColor: colors.blackVar1,
        iconType: 'Feather',
        text: labels.Search,
        screenName: screenName.ChooseWallpaper,

    },
    {
        id: 4,
        iconName: 'microphone-off',
        iconSize: 16,
        iconColor: colors.blackVar1,
        iconType: 'MaterialCommunityIcons',
        text: labels.MuteNotification,
        screenName: screenName.ChooseWallpaper,

    },
    {
        id: 5,
        iconName: 'window-maximize',
        iconSize: 16,
        iconColor: colors.blackVar1,
        iconType: 'FontAwesome',
        text: labels.Wallpaper,
        screenName: screenName.ChooseWallpaper,

    },
    {
        id: 6,
        iconName: 'thumbs-down',
        iconSize: 16,
        iconColor: colors.blackVar1,
        iconType: 'Feather',
        text: labels.Report,
        screenName: screenName.ChooseWallpaper,

    },
    {
        id: 7,
        iconName: 'block-flipped',
        iconSize: 16,
        iconColor: colors.blackVar1,
        iconType: 'MaterialIcons',
        text: labels.Block,
        screenName: screenName.ChooseWallpaper,

    },
    {
        id: 8,
        iconName: 'trash-2',
        iconSize: 16,
        iconColor: colors.blackVar1,
        iconType: 'Feather',
        text: labels.ClearChat,
        screenName: screenName.ChooseWallpaper,

    },
]

export const HaederChangechatViewModalData = [
    {
        id: 1,
        iconName: 'copy',
        iconSize: 16,
        iconColor: colors.blackVar1,
        iconType: 'Feather',
        text: 'Copy',
        screenName: screenName.ChooseWallpaper,

    },
    {
        id: 2,
        iconName: 'thumbs-down',
        iconSize: 16,
        iconColor: colors.blackVar1,
        iconType: 'Feather',
        text: 'Report',
        screenName: screenName.ChooseWallpaper,

    },

]

export const SendMsgModalData = [
    {
        id: 1,
        iconName: 'info',
        iconSize: 16,
        iconColor: colors.blackVar1,
        iconType: 'Feather',
        text: 'Info',
        screenName: screenName.ChooseWallpaper,

    },
    {
        id: 2,
        iconName: 'copy',
        iconSize: 16,
        iconColor: colors.blackVar1,
        iconType: 'Feather',
        text: 'Copy',
        screenName: screenName.ChooseWallpaper,

    },
    {
        id: 3,
        iconName: 'pencil',
        iconSize: 16,
        iconColor: colors.blackVar1,
        iconType: 'SimpleLineIcons',
        text: 'Edit',
        screenName: screenName.ChooseWallpaper,

    },

]