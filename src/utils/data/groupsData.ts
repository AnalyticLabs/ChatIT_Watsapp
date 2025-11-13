import { isDark } from "../../theme/themeContext";
import { colors } from "../colors";
import { labels } from "../labels";
import { Chatimg1Img, Chatimg2Img, Chatimg3Img, Chatimg4Img, Chatimg5Img, Chatimg6Img, Chatimg7Img, GroupImg1Img, GroupImg2Img, GroupImg3Img, GroupImg4Img, GroupImg5Img, GroupImg6Img, GroupImg7Img, MediaImg1, MediaImg2, MediaImg3, MediaImg4 } from "../png";
import { screenName } from "../screenName";

export const allGroupsData = [
    {
        id: 1,
        name: labels.UIUXDesigner,
        profileImg: GroupImg1Img,
        time: labels.Time1020,
        isAdmin: 'true'
    },
    {
        id: 2,
        name: labels.GraphicsTeam,
        profileImg: GroupImg2Img,
        time: labels.Time0953,
        isAdmin: 'false'
    },
    {
        id: 3,
        name: labels.HTMLTeam,
        profileImg: GroupImg3Img,
        time: labels.Time0721,
        isAdmin: 'true'
    },
    {
        id: 4,
        name: labels.ColumbusStudios,
        profileImg: GroupImg4Img,
        time: labels.Yesterday,
        isAdmin: 'false'
    },
    {
        id: 5,
        name: labels.ThemeforestGroup,
        profileImg: GroupImg5Img,
        time: labels.Aug1523,
        isAdmin: 'true'
    },
    {
        id: 6,
        name: labels.CompetitionTeam,
        profileImg: GroupImg6Img,
        time: labels.Time1020,
        isAdmin: 'false'
    },
    {
        id: 7,
        name: labels.CricketTeam,
        profileImg: GroupImg7Img,
        time: labels.Time1020,
        isAdmin: 'true'
    },
    {
        id: 8,
        name: labels.Dreamsguys,
        profileImg: GroupImg7Img,
        time: labels.Time1020,
        isAdmin: 'false'
    },
    {
        id: 9,
        name: labels.ThemeforestGroup,
        profileImg: GroupImg5Img,
        time: labels.Time1020,
        isAdmin: 'true'
    },
    {
        id: 10,
        name: labels.CompetitionTeam,
        profileImg: GroupImg6Img,
        time: labels.Time1020,
        isAdmin: 'false'
    },
]

export const GroupChatViewModalData = [
    {
        id: 1,
        iconName: 'info',
        iconSize: 16,
        iconColor: isDark() ? colors.greyVar3 : colors.blackVar1,
        iconType: 'Feather',
        text: labels.GroupInfo,
    },
    {
        id: 2,
        iconName: 'photo',
        iconSize: 16,
        iconColor: isDark() ? colors.greyVar3 : colors.blackVar1,
        iconType: 'FontAwesome',
        text: labels.GroupMedia,
    },
    {
        id: 3,
        iconName: 'search',
        iconSize: 16,
        iconColor: isDark() ? colors.greyVar3 : colors.blackVar1,
        iconType: 'Feather',
        text: labels.Search,
    },
    {
        id: 4,
        iconName: 'microphone-off',
        iconSize: 16,
        iconColor: isDark() ? colors.greyVar3 : colors.blackVar1,
        iconType: 'MaterialCommunityIcons',
        text: labels.MuteNotification,
    },
    {
        id: 5,
        iconName: 'wallpaper',
        iconSize: 16,
        iconColor: isDark() ? colors.greyVar3 : colors.blackVar1,
        iconType: 'MaterialCommunityIcons',
        text: labels.Wallpaper,
    },
    {
        id: 6,
        iconName: 'thumbs-down',
        iconSize: 16,
        iconColor: isDark() ? colors.greyVar3 : colors.blackVar1,
        iconType: 'Feather',
        text: labels.Report,
    },
    {
        id: 7,
        iconName: 'block-flipped',
        iconSize: 16,
        iconColor: isDark() ? colors.greyVar3 : colors.blackVar1,
        iconType: 'MaterialIcons',
        text: labels.Block,
    },
    {
        id: 8,
        iconName: 'delete',
        iconSize: 16,
        iconColor: isDark() ? colors.greyVar3 : colors.blackVar1,
        iconType: 'AntDesign',
        text: labels.ClearChat,
    },
]

export const groupMediaData = [
    {
        id: 1,
        image: MediaImg1
    },
    {
        id: 2,
        image: MediaImg2
    },
    {
        id: 3,
        image: MediaImg3
    },
    {
        id: 4,
        image: MediaImg4
    }
]

export const groupsData = [{
    id: 1,
    img: Chatimg1Img,
    name: labels.MarkVilliams,
    personName: labels.Sleeping,
    status: 'inactive',
    isAdmin: 'true',
},
{
    id: 2,
    img: Chatimg2Img,
    name: labels.ElizabethSosa,
    personName: labels.Available,
    status: 'inactive',
    isAdmin: 'true',
},
{
    id: 3,
    img: Chatimg3Img,
    name: labels.MichaelHoward,
    personName: labels.AtWork,
    status: 'active',
    isAdmin: 'false',
},
{
    id: 4,
    img: Chatimg4Img,
    name: labels.horaceKeene,
    personName: labels.CantTalk,
    status: 'active',
    isAdmin: 'false',
},
{
    id: 5,
    img: Chatimg5Img,
    name: labels.HollisTran,
    personName: labels.Busy,
    status: 'inactive',
    isAdmin: 'false',
},
]

export const colorIconsData = [
    {
        id: 1,
        name: 'Starred Messages',
        iconName: 'star-outline',
        iconType: "Ionicons",
        iconSize: 14,
        iconColor: colors.yellow,
        bgcolor: colors.yellowVar1,
        screenName: screenName.Chats,
    },
    {
        id: 2,
        name: 'Mute Notifications',
        iconName: 'microphone-off',
        iconType: "MaterialCommunityIcons",
        iconSize: 14,
        iconColor: colors.blueVar3,
        bgcolor: colors.blueVar4,
        screenName: screenName.Chats,
    },
    {
        id: 3,
        name: 'Encryption',
        iconName: 'lock',
        iconType: "FontAwesome",
        iconSize: 14,
        iconColor: colors.green,
        bgcolor: colors.greenVar1,
        screenName: screenName.Chats,
    },
]

export const colorIconsAdminData = [
    {
        id: 1,
        name: 'Private Group',
        iconName: 'shield',
        iconType: "Feather",
        iconSize: 14,
        iconColor: colors.primaryVar3,
        bgcolor: colors.primaryVar1,
        screenName: screenName.Chats,
    },
    {
        id: 2,
        name: 'Starred Messages',
        iconName: 'star-outline',
        iconType: "Ionicons",
        iconSize: 14,
        iconColor: colors.yellow,
        bgcolor: colors.yellowVar1,
        screenName: screenName.Chats,
    },
    {
        id: 3,
        name: 'Mute Notifications',
        iconName: 'microphone-off',
        iconType: "MaterialCommunityIcons",
        iconSize: 14,
        iconColor: colors.blueVar3,
        bgcolor: colors.blueVar4,
        screenName: screenName.Chats,
    },
    {
        id: 4,
        name: 'Encryption',
        iconName: 'lock',
        iconType: "FontAwesome",
        iconSize: 14,
        iconColor: colors.green,
        bgcolor: colors.greenVar1,
        screenName: screenName.Chats,
    },
    {
        id: 5,
        name: 'Group Settings',
        iconName: 'settings-outline',
        iconType: "Ionicons",
        iconSize: 14,
        iconColor: colors.primaryVar3,
        bgcolor: colors.primaryVar1,
        screenName: screenName.GroupSettings,
    },
]

export const colorIconsDataSecond = [
    {
        id: 1,
        name: 'Exit Group',
        iconName: 'logout',
        iconType: "SimpleLineIcons",
        iconSize: 14,
        iconColor: isDark() ? colors.redVar2 : colors.red,
        bgcolor: isDark() ? `rgba(200, 16, 46, 0.2)` : colors.redVar1,
        screenName: screenName.Chats,
    },
    {
        id: 2,
        name: 'Report User',
        iconName: 'thumbs-down',
        iconType: "Feather",
        iconSize: 14,
        iconColor: colors.primaryVar3,
        bgcolor: isDark() ? `rgba(127,17,224,0.1)` : colors.primaryVar1,
        screenName: screenName.Chats,
    },
    // {
    //     id: 3,
    //     name: 'Delete Chat',
    //     iconName: 'delete',
    //     iconType: "AntDesign",
    //     iconSize: 20,
    //     iconColor: colors.red,
    //     bgcolor: colors.redVar1,
    //     screenName: screenName.ChatView,
    // },
]

export const GroupSettingData = [
    {
        id: 1,
        name: labels.EditGroupSetting,
        iconName: 'pencil-outline',
        iconType: "MaterialCommunityIcons",
        iconSize: 14,
        iconColor: colors.primaryVar3,
        bgcolor: isDark() ? `rgba(104, 10, 131, 0.2)` :  colors.primaryVar1,
    },
    {
        id: 2,
        name: labels.SendMessage,
        iconName: 'chatbox-ellipses-outline',
        iconType: "Ionicons",
        iconSize: 14,
        iconColor: colors.primaryVar3,
        bgcolor: isDark() ? `rgba(104, 10, 131, 0.2)` : colors.primaryVar1,
    },
    {
        id: 3,
        name: labels.AddOtherParticipants,
        iconName: 'person-add',
        iconType: "octicons",
        iconSize: 14,
        iconColor: colors.primaryVar3,
        bgcolor: isDark() ? `rgba(104, 10, 131, 0.2)` : colors.primaryVar1,
    },
    {
        id: 4,
        name: labels.ApproveNewParticipants,
        iconName: 'person-add',
        iconType: "octicons",
        iconSize: 14,
        iconColor: colors.primaryVar3,
        bgcolor: isDark() ? `rgba(104, 10, 131, 0.2)` : colors.primaryVar1,
    },
    {
        id: 5,
        name: labels.EditGroupAdmins,
        iconName: 'person-add',
        iconType: "octicons",
        iconSize: 14,
        iconColor: colors.primaryVar3,
        bgcolor: isDark() ? `rgba(104, 10, 131, 0.2)` : colors.primaryVar1,
    },
]

export const createGroupUserSelectData = [{
    id: 1,
    img: Chatimg1Img,
    name: labels.MarkVilliams,
    note: labels.Sleeping,
    status: 'inactive',
    isAdmin: 'true',
    isSelected : false,
},
{
    id: 2,
    img: Chatimg2Img,
    name: labels.ElizabethSosa,
    note: labels.Available,
    status: 'inactive',
    isAdmin: 'true',
    isSelected : false,
},
{
    id: 3,
    img: Chatimg3Img,
    name: labels.MichaelHoward,
    note: labels.AtWork,
    status: 'active',
    isAdmin: 'false',
    isSelected : false,
},
{
    id: 4,
    img: Chatimg4Img,
    name: labels.horaceKeene,
    note: labels.CantTalk,
    status: 'active',
    isAdmin: 'false',
    isSelected : false,
},
{
    id: 5,
    img: Chatimg5Img,
    name: labels.HollisTran,
    note: labels.Busy,
    status: 'inactive',
    isAdmin: 'false',
    isSelected : false,
},
{
    id: 6,
    img: Chatimg6Img,
    name: labels.DebraJones,
    note: labels.InaMeeting,
    status: 'inactive',
    isAdmin: 'false',
    isSelected : false,
},
{
    id: 7,
    img: Chatimg7Img,
    name: labels.JamesAlbert,
    note: labels.AtMovies,
    status: 'active',
    isAdmin: 'false',
    isSelected : false,
},
// {
//     id: 8,
//     img: Chatimg4Img,
//     name: labels.horaceKeene,
//     note: labels.CantTalk,
//     status: 'active',
//     isAdmin: 'false',
//     isSelected : false,
// },
// {
//     id: 9,
//     img: Chatimg5Img,
//     name: labels.HollisTran,
//     note: labels.Busy,
//     status: 'inactive',
//     isAdmin: 'false',
//     isSelected : false,
// },
]