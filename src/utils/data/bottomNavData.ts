import { labels } from "../labels";
import { screenName } from "../screenName";

export const bottomNavData = [
    {
        id: 1,
        name : labels.chat,
        iconName : 'chatbox-ellipses-outline',
        iconType : "Ionicons",
        iconSize : 20,
        screenName : screenName.Chats,
    },
    {
        id: 2,
        name : labels.Group,
        iconName : 'users',
        iconType : "Feather",
        iconSize : 20,
        screenName : screenName.Group,
    },
    {
        id: 3,
        name : labels.Status,
        iconName : 'record-circle-outline',
        iconType : "MaterialCommunityIcons",
        iconSize : 22,
        screenName : screenName.NoStatus,
    },
    {
        id: 4,
        name : labels.Contact,
        iconName : 'person-circle-outline',
        iconType : "Ionicons",
        iconSize : 22,
        screenName : screenName.ContactPage,
    },
    {
        id: 5,
        name : labels.Call,
        iconName : 'phone',
        iconType : "Feather",
        iconSize : 18,
        screenName : screenName.Calls,
    },
]