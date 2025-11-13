import { labels } from "../labels";
import { MutePic1, MutePic2, StatusPic1, StatusPic2, StatusPic3, StatusPic4, StatusPic5, UserImg, ViewPic1, ViewPic2, ViewPic3 } from "../png";

export const allStatusModalData = [
    {
        id: 1,
        name : labels.Delete,
        iconName : 'delete',
        iconType : "AntDesign",
        iconSize : 20,
    },
    {
        id: 5,
        name : labels.Block,
        iconName : 'block',
        iconType : "entypo",
        iconSize : 20,
    },
]

export const statusData=[
    {
        id:1,
        name:labels.ElizabethSosa,
        image : StatusPic1,
        time:labels.justNow
    },
    {
        id:2,
        name:labels.MichaelHoward,
        image : StatusPic2,
        time:labels.oneMinAgo

    },
    {
        id:3,
        name:labels.horaceKeene,
        image : StatusPic3,
        time:labels.fourFiveMinAgo
    },
    {
        id:4,
        name:labels.HollisTran,
        image : StatusPic4,
        time:labels.todayTime1
    },
    {
        id:5,
        name:labels.JamesAlbert,
        image : StatusPic5,
        time:labels.todayTime2
    },
    
]

export const viewedStatusData=[
    {
        id:1,
        name:labels.DinaBrown,
        image : ViewPic1,
        time:labels.viewedTime1
    },
    {
        id:2,
        name:labels.elaine,
        image : ViewPic2,
        time:labels.viewedTime2

    },
    {
        id:3,
        name:labels.edward,
        image : ViewPic3,
        time:labels.viewedTime3
    },
  
    
]

export const mutedStatusData=[
    {
        id:1,
        name:labels.bennett,
        image : MutePic1,
        time:labels.muteTime1
    },
    {
        id:2,
        name:labels.alexander,
        image : MutePic2,
        time:labels.muteTime2

    },
    {
        id:3,
        name:labels.ElizabethSosa,
        image : MutePic1,
        time:labels.muteTime2
    },
  
    
]

export const recentstatusData=[
    {
        id:1,
        name:labels.ElizabethSosa,
        image : StatusPic1,
        time:labels.justNow
    },
    {
        id:2,
        name:labels.MichaelHoward,
        image : StatusPic2,
        time:labels.oneMinAgo

    },
    {
        id:3,
        name:labels.horaceKeene,
        image : StatusPic3,
        time:labels.fourFiveMinAgo
    },
    {
        id:4,
        name:labels.HollisTran,
        image : StatusPic4,
        time:labels.todayTime1
    },
    {
        id:5,
        name:labels.JamesAlbert,
        image : StatusPic5,
        time:labels.todayTime2
    },
    {
        id:6,
        name:labels.DinaBrown,
        image : ViewPic1,
        time:labels.todayTime2
    },
    {
        id:7,
        name:labels.elaine,
        image : ViewPic2,
        time:labels.todayTime2
    },
    {
        id:8,
        name:labels.edward,
        image : ViewPic3,
        time:labels.todayTime2
    },
    {
        id:9,
        name:labels.bennett,
        image : MutePic1,
        time:labels.todayTime2
    },
    
]

export const myStatusView=[
    {
        id:1,
        name:labels.ElizabethSosa,
        image : StatusPic1,
        time:labels.justNow
    },
    {
        id:2,
        name:labels.horaceKeene,
        image : StatusPic3,
        time:labels.today4Minago
    },
    {
        id:3,
        name:labels.JamesAlbert,
        image : StatusPic5,
        time:labels.todayTime840
    },
    {
        id:4,
        name:labels.DinaBrown,
        image : ViewPic1,
        time:labels.yesterday1139
    }
]

export const friendStatusModal =[
    {
        id:1,
        title:labels.mute,
        iconName:'mute',
        iconType:'octicons',
        iconSize:25,
    },
    {
        id:2,
        title:labels.Message,
        iconName:'message1',
        iconType:'AntDesign',
        iconSize:25,
    },
    {
        id:3,
        title:labels.voiceCall,
        iconName:'call-outline',
        iconType:'Ionicons',
        iconSize:25,
    },
    {
        id:4,
        title:labels.videoCall,
        iconName:'video',
        iconType:'Feather',
        iconSize:25,
    },
    {
        id:5,
        title:labels.viewContact,
        iconName:'account-box-outline',
        iconType:'MaterialCommunityIcons',
        iconSize:25,
    },
    {
        id:6,
        title:labels.report,
        iconName:'thumbs-o-down',
        iconType:'font-awesome',
        iconSize:25,
    }
]

export const threeDotIcon = [
    {
        id: 1,
        name : labels.delete,
        iconName : 'delete',
        iconType : "AntDesign",
        iconSize : 20,
      
    },
    {
        id: 5,
        name : labels.forward,
        iconName : 'arrow-undo-outline',
        iconType : "Ionicons",
        iconSize : 20,
    },
]