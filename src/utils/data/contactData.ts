import { labels } from "../labels";
import { ContactImg1, ContactImg2, ContactImg3, ContactImg4, ContactImg5, ContactImg6, ContactImg7, ContactImg8, ContactImg9 } from "../svg";

export const contactList = [
    {
        id: 1,
        contName: labels.alexander,
        location: labels.location1,
        profImg: ContactImg1(),
    },
    {
        id: 2,
        contName: labels.annette,
        location: labels.location2,
        profImg: ContactImg2(),
    },
    {
        id: 3,
        contName: labels.bacon,
        location: labels.location2,
        profImg: ContactImg3(),
    },
    {
        id: 4,
        contName: labels.bennett,
        location: labels.location3,
        profImg: ContactImg4(),
    },
    {
        id: 5,
        contName: labels.charles,
        location: labels.location4,
        profImg: ContactImg5(),
    },
    {
        id: 6,
        contName: labels.dina,
        location: labels.location5,
        profImg: ContactImg6(),
    },
    {
        id: 7,
        contName: labels.debra,
        location: labels.location6,
        profImg: ContactImg7(),
    },
    {
        id: 8,
        contName: labels.elaine,
        location: labels.location5,
        profImg: ContactImg8(),
    },
    {
        id: 9,
        contName: labels.edward,
        location: labels.location6,
        profImg: ContactImg9(),
    },


]


export const contactThreeDotIcon = [
    {
        id: 1,
        name: labels.share,
        iconName: 'share-google',
        iconType: 'EvilIcons',
        iconSize: 20,

    },
    {
        id: 2,
        name: labels.edit,
        iconName: 'pencil',
        iconType: "octions",
        iconSize: 20,
    },
    {
        id: 3,
        name: labels.block,
        iconName: 'block-flipped',
        iconType: "MaterialIcons",
        iconSize: 20,
    },
    {
        id: 4,
        name: labels.delete,
        iconName: 'delete',
        iconType: "AntDesign",
        iconSize: 20,

    },

]

export const personDetail = [
    {
        id: 1,
        subTitle: labels.PhoneNo,
        title: labels.phNumber,
        iconName: 'phone',
        iconType: 'Feather',
        iconSize: 20,

    },
    {
        id: 2,
        subTitle: labels.InfoEmail,
        title: labels.emailaddress,
        iconName: 'envelope',
        iconType: 'SimpleLineIcons',
        iconSize: 20,
    },
    {
        id: 3,
        subTitle: labels.dob,
        title: labels.Date,
        iconName: 'calendar-blank',
        iconType: 'MaterialCommunityIcons',
        iconSize: 20,
    },

]

export const editContact = [
    {
        key: 'name',
        label: labels.Horace1,
        iconName: 'user',
        iconType: 'Feather',
    },
    {
        key: 'hello',
        label: labels.Keene,
        iconName: 'user',
        iconType: 'Feather',
    },
    {
        key: 'email',
        label: labels.InfoEmail,
        iconName: 'envelope',
        iconType: 'SimpleLineIcons',
    },
    {
        key: 'phoneNo',
        label: labels.PhoneNo,
        iconName: 'phone',
        iconType: 'Feather',
    },
    {
        key: 'dob',
        label: labels.Date,
        iconName: 'calendar-blank',
        iconType: 'MaterialCommunityIcons',
    },
    {
        key: 'country',
        label: labels.inivitemsg,
        iconName: 'message-text-outline',
        iconType: 'MaterialCommunityIcons',
    },

];

export const addContactData = [
    {
        key: 'firstName',
        label: labels.firstName,
        iconName: 'user',
        iconType: 'Feather',
    },
    {
        key: 'lastName',
        label: labels.lastName,
        iconName: 'user',
        iconType: 'Feather',
    },
    {
        key: 'email',
        label: labels.emailaddress,
        iconName: 'envelope',
        iconType: 'SimpleLineIcons',
    },
    {
        key: 'phoneNo',
        label: labels.phNumber,
        iconName: 'phone',
        iconType: 'Feather',
    },
    {
        key: 'dob',
        label: labels.dob,
        iconName: 'calendar-blank',
        iconType: 'MaterialCommunityIcons',
    },
    {
        key: 'message',
        label: labels.inivitemsg,
        iconName: 'chatbox-ellipses-outline',
        iconType: 'Ionicons',
    },
];