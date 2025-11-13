// CONVERSATIONS
import { instance } from './config';
import { URL } from './Endpoints';

export const getConversationsService = () => instance.get(URL.CONVERSATIONS)
// export const getMessagesService = (data: any) => {instance.get(URL.CONVERSATIONS + data),console.log(URL.CONVERSATIONS + data,'-=-=-=-=-=-=-')}
// ✅ service
export const getMessagesService = async (data: any) => {
    const url = `${URL.CONVERSATIONS}${data}`;
    try {
        const response = await instance.get(url);
        return response;
    } catch (error) {
        console.log('getMessagesService error:', error?.response?.data || error);
        throw error;
    }
};

export const sendMessageService = (payload: any) =>
    instance.post(`${URL.SEND_MESSAGE}`, payload, {
        headers: { "Content-Type": "application/json" },
    });

export const createGroupService = (data) =>
    instance.post(URL?.GROUP_CREATE, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });


export const getUserGroupsService = () =>
    instance.get(URL?.USER_GROUPS);

export const sendGroupMessageService = (payload: any) =>
    instance.post(URL?.SEND_GROUP_MESSAGE, payload, {
        headers: { "Content-Type": "application/json" },
    });

export const getGroupMessagesService = async (data: any) => {
    const url = `${URL.GROUP_MESSAGES}/${data}`;
    try {
        const response = await instance.get(url);
        return response;
    } catch (error) {
        console.log('getMessagesService error:', error?.response?.data || error);
        throw error;
    }
}

export const getPaymentCardService = () => instance.get(URL.PAYMENT_CARD);
export const deletePaymentCardService = (query: any) => instance.delete(URL.PAYMENT_CARD + query);

export const notificationListService = (query: string) =>
    instance.get(URL.GET_NOTIFICATION + query);