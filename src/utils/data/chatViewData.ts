import { AddView } from "../../components/chatViewComponents";
import { colors } from "../colors";


// export const chatMessages = [
//     { id: 1, message: receiveMessage1(), type: "receivemsg", time: "8:16 PM" },
//     { id: 2, message: sentMessage1("Good Morning Mam"), type: "sentmsg", time: "8:17 PM", icon: Bluetick() },
//     { id: 3, message: receiveMessage2(), type: "receivemsg", time: "8:16 PM" },
//     { id: 4, message: SentMessage2(), type: "sentmsg", time: "8:17 PM", icon: Bluetick() },
//     { id: 5, message: SentMessage6(), type: "sentmsg" },
//     { id: 6, message: receiveMessage3(), type: "receivemsg", time: "8:16 PM" },
//     { id: 7, message: sentMessage3(), type: "sentmsg", time: "8:17 PM", icon: Bluetick() ,msg:Reactmsg()},
//     { id: 8, message: receiveMessage4(), type: "receivemsg", time: "8:16 PM" },
//     { id: 9, message: sentMessage4(), type: "sentmsg", time: "8:17 PM", icon: Tick(),text:'Edited',iconName:'circle',iconType:'font-awesome'},
//     { id: 10, message: sentMessage5(), type: "sentmsg"}

//   ];

  export const Emojidata = [
    { id: 1, emoji: '😀' },
    { id: 2, emoji: '😍' },
    { id: 3, emoji: '👍' },
    { id: 4, emoji: '😎' },
    { id: 5, emoji: '😍' },
    { id: 7, emoji: AddView() },
  ];

  export const tabs = [
    { label: "All", count: 1 },
    { label: "👍", count: 1 },
  ];

  export const MessageStatusData = [{
    id: 1,
    status: 'Read',
    time: 'Today at 7:12 AM',
    iconName: 'check-all',
    iconType: 'MaterialCommunityIcons',
    iconColor: colors.blueVar1


},
{
    id: 2,
    status: 'Delivered',
    time: 'Today at 7:09 AM',
    iconName: 'check-all',
    iconType: 'MaterialCommunityIcons',
    iconColor: colors.greyVar4


},
{
    id: 3,
    status: 'Sent',
    time: 'Today at 7:09 AM',
    iconName: 'done',
    iconType: 'MaterialIcons',
    iconColor: colors.greyVar4

},


]