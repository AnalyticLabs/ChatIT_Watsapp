import moment from 'moment';
import Toast from 'react-native-toast-message';
import { showMessage, hideMessage } from "react-native-flash-message";


import { REGEX_CONST } from './regex';
import { color } from 'react-native-elements/dist/helpers';
import { colors } from './colors';

export const logToConsole = (...args: any) => {
  if (__DEV__ && console.tron) {
    console.tron.log(...args);
  } else {
    console.log(...args);
  }
};

export const validateEmail = (email: string) => {
  return REGEX_CONST.EMAIL_REGEX.test(email);
};

export const validatePassword = (password: any) => {
  return REGEX_CONST.PASSWORD_REGEX.test(password);
};

export const getTimeDifference = (targetTime: string) => {
  const now = moment();
  const target = moment(targetTime);
  const diffMinutes = target.diff(now, 'minutes');

  const isPast = diffMinutes < 0;
  const absMinutes = Math.abs(diffMinutes);
  const hours = Math.floor(absMinutes / 60);
  const minutes = absMinutes % 60;

  let result = '';
  if (hours > 0) result += `${hours}hr `;
  if (minutes > 0) result += `${minutes}mins`;

  if (!result) result = 'Just now';
  else result = isPast ? `${result.trim()} ago` : `In ${result.trim()}`;

  return result;
};

// export const showSuccessToast = (text: string) => {
//   Toast.show({ type: 'success', text1: text });
// };

// export const showErrorToast = (text: string) => {
//   Toast.show({ type: 'error', text1: text });
// };

export const showSuccessToast = async (msg: string) => {
  showMessage({
    message: msg,
    type: 'success',
    backgroundColor: colors.primaryVar0,
    color: colors.black,
    icon: 'success',
    iconProps: {
      tintColor: colors.black,
    },
    floating: true,
    style: {
      alignItems: 'center',
      gap: 5,
    },
    // titleStyle: { ...styles.poppinsMedium },
  });
};


export const showErrorToast = async (msg: string) => {
  showMessage({
    message: msg,
    type: 'danger',
    backgroundColor: colors.red,
    color: colors.white,
    icon: 'danger',
    floating: true,
    style: {
      alignItems: 'center',
      gap: 5,
    },
    // titleStyle: { ...styles.poppinsMedium },
  });
};

// utils/messageFormatter.ts

// export const formatMessage = (msg: any, currentUserId: string) => ({
//   id: msg?._id,
//   text: msg?.content || "",
//   senderName: msg?.sender?.username || "",
//   senderAvatar: msg?.sender?.profilePicture || "",
//   isOwn: msg?.sender?._id === currentUserId,
//   time: new Date(msg?.createdAt || Date.now()).toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//   }),
//   type: msg?.contentType || "text",
//   status: msg?.messageStatus || "sent",
// });

export const formatMessage = (msg, currentUserId) => ({
  _id: msg?._id, // 👈 keep the same name as backend
  text: msg?.content || "",
  senderName: msg?.sender?.username || "",
  senderAvatar: msg?.sender?.profilePicture || "",
  isOwn: msg?.sender?._id === currentUserId,
  time: new Date(msg?.createdAt || Date.now()).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
  type: msg?.contentType || "text",
  status: msg?.messageStatus || "sent",
});



export const formatContact = (contact) => {
  if (!contact) return null;

  // 1️⃣ Get first phone number
  const phone =
    contact?.phoneNumbers?.length > 0
      ? contact.phoneNumbers[0].number
      : null;

  // 2️⃣ Get display name (fallback to "Contact")
  const contName = contact?.displayName?.trim()
    ? contact.displayName
    : "Contact";

  // 3️⃣ Get thumbnail / profile image
  const profImg = contact?.thumbnailPath || null;

  // 4️⃣ Location is not usually included in contacts → return null
  const location =
    contact?.postalAddresses?.length > 0
      ? contact.postalAddresses[0] // may contain street/city/state
      : null;

  return {
    contName,
    phone,
    profImg,
    location,
  };
};

const normalizePhone = (num) => {
  if (!num) return ""; // return empty string if null/undefined

  return num
    .toString()
    .replace(/[^0-9]/g, "")
    .replace(/^91/, "");
};

export const mergeRegisteredWithContacts = (registeredUsers, deviceContacts) => {
  return registeredUsers.map(user => {
    const userPhone = normalizePhone(user.phoneNumber);

    // find contact in device by phone match
    const matchedContact = deviceContacts.find(contact => {
      const contactPhone = normalizePhone(contact.phone);
      return contactPhone === userPhone;
    });

    return {
      ...user,
      contName: matchedContact?.contName || null,
      contProfImg: matchedContact?.profImg || null,
      contLocation: matchedContact?.location || null,
      isInContacts: !!matchedContact
    };
  }).filter(item => item.isInContacts);
};

