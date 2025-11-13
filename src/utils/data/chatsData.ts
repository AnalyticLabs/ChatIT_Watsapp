import { color } from "react-native-elements/dist/helpers"
import { labels } from "../labels"
import { Chatimg1Img, Chatimg2Img, Chatimg3Img, Chatimg4Img, Chatimg5Img, Chatimg6Img, Chatimg7Img, Chatimg8Img, Chatimg9Img } from "../png"

export const allChatsData = [
    {
        id: 1,
        name : labels.MarkVilliams,
        profileImg : Chatimg1Img,
        time : labels.Time1020,
        status : 'active'
    },
    {
        id: 2,
        name : labels.ElizabethSosa,
        profileImg : Chatimg2Img,
        time : labels.Time1020,
    },
    {
        id: 3,
        name : labels.MichaelHoward,
        profileImg : Chatimg3Img,
        time : labels.Time1020,
        status : 'active'
    },
    {
        id: 4,
        name : labels.horaceKeene,
        profileImg : Chatimg4Img,
        time : labels.Time1020,
        status : 'active'
    },
    {
        id: 5,
        name : labels.HollisTran,
        profileImg : Chatimg5Img,
        time : labels.Time1020,
        status : 'inactive'
    },
    {
        id: 6,
        name : labels.JamesAlbert,
        profileImg : Chatimg6Img,
        time : labels.Time1020,
        status : 'active'
    },
    {
        id: 7,
        name : labels.DinaBrown,
        profileImg : Chatimg7Img,
        time : labels.Time1020,
        status : 'inactive'
    },
    {
        id: 8,
        name : 'Hollis Tran',
        profileImg : Chatimg8Img,
        time : labels.Time1020,
        status : 'inactive'
    },
    {
        id: 9,
        name : labels.JamesAlbert,
        profileImg : Chatimg6Img,
        time : labels.Time1020,
        status : 'active'
    },
    {
        id: 10,
        name : labels.DinaBrown,
        profileImg : Chatimg7Img,
        time : labels.Time1020,
        status : 'inactive'
    },
]


export const PinnedChatsdata = [
    {
        id: 1,
        name : labels.MarkVilliams,
        profileImg : Chatimg1Img,
        time : labels.Time1020,
        status : 'active'
    },
    {
        id: 2,
        name : labels.ElizabethSosa,
        profileImg : Chatimg2Img,
        time : labels.Time1020,
        status : 'inactive'
    },
    {
        id: 3,
        name : labels.MichaelHoward,
        profileImg : Chatimg3Img,
        time : labels.Time1020,
        status : 'active'
    },
    {
        id: 4,
        name : labels.horaceKeene,
        profileImg : Chatimg4Img,
        time : labels.Time1020,
        status : 'active'
    },
    {
        id: 5,
        name : labels.HollisTran,
        profileImg : Chatimg5Img,
        time : labels.Time1020,
        status : 'inactive'
    },
    {
        id: 6,
        name : labels.JamesAlbert,
        profileImg : Chatimg6Img,
        time : labels.Time1020,
        status : 'active'
    },
    {
        id: 7,
        name : labels.DinaBrown,
        profileImg : Chatimg7Img,
        time : labels.Time1020,
        status : 'inactive'
    },
    {
        id: 8,
        name : labels.JudyMercer,
        profileImg : Chatimg8Img,
        time : labels.Time1020,
        status : 'inactive'
    },
    {
        id: 9,
        name : labels.JamesAlbert,
        profileImg : Chatimg7Img,
        time : labels.Time1020,
        status : 'inactive'
    },
    {
        id: 10,
        name : labels.JudyMercer,
        profileImg : Chatimg8Img,
        time : labels.Time1020,
        status : 'inactive'
    },
]

export const chatSettings=[
    {
        id:1,
        chatSettings:labels.theme
    },
    {
        id:2,
        chatSettings:labels.wallpaper
    },
    {
        id:3,
        chatSettings:labels.mediaVisibility
    },
    {
        id:4,
        chatSettings:labels.archieveAllChats
    },
    {
        id:5,
        chatSettings:labels.clearAllChats
    },
    {
        id:6,
        chatSettings:labels.deleteAllChats
    }

]

export const attachmentData = [
    {
        id : 1,
        name : labels.Document,
        iconName : 'file-text',
        iconType : 'Feather',
        iconSize : 16,
        iconColor : color.blackVar1,
    },
    {
        id : 2,
        name : labels.Camera,
        iconName : 'camera-outline',
        iconType : 'MaterialCommunityIcons',
        iconSize : 16,
        iconColor : color.blackVar1,
    },
    {
        id : 3,
        name : labels.Gallery,
        iconName : 'image',
        iconType : 'font-awesome',
        iconSize : 16,
        iconColor : color.blackVar1,
    },
    {
        id : 4,
        name : labels.Audio,
        iconName : 'volume-2',
        iconType : 'Feather',
        iconSize : 16,
        iconColor : color.blackVar1,
    },
    {
        id : 5,
        name : labels.Location,
        iconName : 'map-pin',
        iconType : 'Feather',
        iconSize : 16,
        iconColor : color.blackVar1,
    },
    {
        id : 6,
        name : labels.Contact,
        iconName : 'user',
        iconType : 'Feather',
        iconSize : 16,
        iconColor : color.blackVar1,
    },
]

export const newChatData = [{
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
    img: Chatimg9Img,
    name: labels.DebraJones,
    note: labels.InaMeeting,
    status: 'inactive',
    isAdmin: 'false',
    isSelected : false,
},
{
    id: 7,
    img: Chatimg6Img,
    name: labels.JamesAlbert,
    note: labels.AtMovies,
    status: 'active',
    isAdmin: 'false',
    isSelected : false,
},
{
    id: 8,
    img: Chatimg8Img,
    name: labels.JudyMercer,
    note: labels.AtGym,
    status: 'active',
    isAdmin: 'false',
    isSelected : false,
},
{
    id: 9,
    img: Chatimg7Img,
    name: labels.DinaBrown,
    note: labels.UrgentCallsOnly,
    status: 'inactive',
    isAdmin: 'false',
    isSelected : false,
},
]