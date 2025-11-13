import { CommonModal } from "../../components/commonModal";
import { labels } from "../labels";
import { screenName } from "../screenName";

export const privacyData = [
    {
        id: 1,
        heading:labels.ProfilePic,
        status:labels.everyOne,
        },
    {
        id: 2,
        heading:labels.lastseen,
        status:labels.everyOne,
    },
    {
        id: 3,
        heading:labels.groups,
        status:labels.everyOne,
        screenName:screenName.Privacy
    },
    {
        id: 4,
        heading:labels.status,
        status:labels.everyOne,
    },
    {
        id: 5,
        heading:labels.readreceipts,
        status:labels.everyOne,
    },
    {
        id: 6,
        heading:labels.blockCon,
        status:labels.blockNum,
        screenName:screenName.BlockedContacts
    },
];