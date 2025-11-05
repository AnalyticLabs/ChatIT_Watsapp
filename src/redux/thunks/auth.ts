import { createAsyncThunk } from '@reduxjs/toolkit';
// import {
//   getProfileService,
// } from '../../services/auth';
import { logToConsole, showSuccessToast } from '../../utils/functions';
import { deletePaymentCardService, getPaymentCardService, getProfileService, notificationListService } from '../../services/Auth';

export const getProfileThunk = createAsyncThunk('auth/getProfile', async () => {
  try {
    const res = await getProfileService();
    if (res.data.status) {
      return res.data.data;
    }
    return {};
  } catch (e: any) {
    logToConsole(e.response.data || e.message);
    return {};
  }
});

export const getPaymentCardThunk = createAsyncThunk(
  'auth/paymentCard',
  async () => {
    try {
      const res = await getPaymentCardService();
      if (res.data.status) {
        return res.data.data;
      }
      return {};
    } catch (e: any) {
      logToConsole(e.response.data || e.message);
      return {};
    }
  },
);

export const deletePaymentCardThunk = createAsyncThunk(
  'auth/paymentCard',
  async (query: any, thunks) => {
    try {
      const res = await deletePaymentCardService(query);
      if (res.data.status) {
        thunks.dispatch(getPaymentCardThunk())
        showSuccessToast(res?.data?.message)
        return res.data.data;
      }
      return {};
    } catch (e: any) {
      logToConsole(e.response.data || e.message);
      return {};
    }
  },
);

export const getNotificationListThunk = createAsyncThunk(
  'home/notification',
  async ({ query, cb }: { query: string, cb?: (data: any) => void }) => {
    try {
      const res = await notificationListService(query);
      if (res.data.status) {
        cb?.(res?.data?.data);
        return res.data.data;
      }
      return {};
    } catch (e: any) {
      logToConsole(e.response.data || e.message);
      return {};
    }
  },
);