import { createAsyncThunk } from '@reduxjs/toolkit';
import { logToConsole } from '../../utils/functions';
import {
  deleteInventoryService,
  getInventoryService,
  getNotificationService,
  getStoreListingService,
  getUserMetricsService,
  getUserOrderService,
  getVendorItemsService,
  getVendorMetricsService,
  userChatService,
  userSubjectService,
  userVerificationService,
  vendorDetailService,
} from '../../services/Dashboard';

export const getUserMetricsThunk = createAsyncThunk(
  'home/userMetrics',
  async (query: string) => {
    try {
      const res = await getUserMetricsService(query);
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

export const getVendorMetricsThunk = createAsyncThunk(
  'home/productListing',
  async (query: string) => {
    try {
      const res = await getVendorMetricsService(query);
      if (res?.data?.status) {
        // cb();
        return res?.data?.data;
      }
      return {};
    } catch (e: any) {
      logToConsole(e.response.data || e.message);
      return {};
    }
  },
);

export const getUserOrderThunk = createAsyncThunk(
  'home/userOrder',
  async ({ query, cb }: { query: string; cb?: (data: any) => void }) => {
    try {
      const res = await getUserOrderService(query);
      if (res.data.status) {
        cb?.(res?.data?.data)
        return res.data.data;
      }
      return {};
    } catch (e: any) {
      logToConsole(e.response.data || e.message);
      return {};
    }
  },
);

export const getUserVerificationThunk = createAsyncThunk(
  'home/userVerification',
  async () => {
    try {
      const res = await userVerificationService();
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

export const getUserSubjectThunk = createAsyncThunk(
  'home/userSubject',
  async () => {
    try {
      const res = await userSubjectService();
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

export const getUserChatThunk = createAsyncThunk(
  'home/userChat',
  async ({ query, cb }: { query: string; cb: (data: any) => void }) => {
    try {
      const res = await userChatService(query);
      if (res.data.status) {
        cb(res?.data?.data);
        return res.data.data;
      }
      return {};
    } catch (e: any) {
      logToConsole(e.response.data || e.message);
      return {};
    }
  },
);

export const getVendorDetailThunk = createAsyncThunk(
  'home/vendorDetail',
  async () => {
    try {
      const res = await vendorDetailService();
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
// deleteInventoryService
export const getVendorInventoryThunk = createAsyncThunk(
  'home/vendorInventory',
  async (query: string) => {
    try {
      const res = await getInventoryService(query);
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

export const getVendorStoreListThunk = createAsyncThunk(
  'home/vendorStoreList',
  async ({ query, cb }: { query: string; cb: (data: any) => void }) => {
    try {
      const res = await getStoreListingService(query);
      if (res.data.status) {
        cb(res?.data?.data?.products);
        return res.data.data;
      }
      return {};
    } catch (e: any) {
      logToConsole(e.response.data || e.message);
      return {};
    }
  },
);

export const getVendorItemThunk = createAsyncThunk(
  'home/vendorItems',
  async (query: string) => {
    try {
      const res = await getVendorItemsService(query);
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