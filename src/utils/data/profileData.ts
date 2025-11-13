import { SocialMediaIcon } from "../../components/profile/profilecomponents";
import { colors } from "../colors";
import { GrpImg_1, GrpImg_2, MediaImg1, MediaImg2, MediaImg3, MediaImg4 } from "../png";
import { screenName } from "../screenName";


export const colorIconsData = [
    {
        id: 1,
        name: 'Starred Messages',
        iconName: 'star-outline',
        iconType: "Ionicons",
        iconSize: 14,
        iconColor: colors.yellow,
        bgcolor: colors.yellowVar1,
        
    },
    {
        id: 2,
        name: 'Mute Notifications',
        iconName: 'microphone-off',
        iconType: "MaterialCommunityIcons",
        iconSize: 14,
        iconColor: colors.blueVar3,
        bgcolor: colors.blueVar4,
    },
    {
        id: 3,
        name: 'Encryption',
        iconName: 'lock',
        iconType: "FontAwesome",
        iconSize: 14,
        iconColor: colors.green,
        bgcolor: colors.greenVar1,
        
    },
    {
        id: 4,
        name: 'Block User',
        iconName: 'block-flipped',
        iconType: "MaterialIcons",
        iconSize: 14,
        iconColor: colors.red,
        bgcolor: colors.redVar1,

    },
    {
        id: 5,
        name: 'Report User',
        iconName: 'thumbs-down',
        iconType: "Feather",
        iconSize: 14,
        iconColor: colors.primaryVar3,
        bgcolor: colors.primaryVar1,
    },
    {
        id: 6,
        name: 'Delete Chat',
        iconName: 'delete',
        iconType: "AntDesign",
        iconSize: 14,
        iconColor: colors.red,
        bgcolor: colors.redVar1,
    },
]
export const mediaData = [
    {
        id: 1,
        image:MediaImg1
    },
    {
        id: 2,
        image:MediaImg2
    },
    {
        id: 3,
        image:MediaImg3
    },
    {
        id: 4,
        image: MediaImg4
    }
]

export const groupsData = [{
    id: 1,
    img:GrpImg_1,
    grpName: 'Themeforest Group',
    personName: 'Mark Villiams, Elizabeth, Michael.....'
},
{
    id: 2,
    img:GrpImg_2,
    grpName: 'Graphics Designers',
    personName: 'Mark Villiams, Elizabeth, Michael.....'
}

]

export const InfoCardData = [{
    "Phone": "9988776655",
    "Email Address": 'info@example.com',
    "Social Media": SocialMediaIcon()
}]