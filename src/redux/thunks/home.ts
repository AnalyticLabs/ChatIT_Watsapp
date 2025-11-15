import { createAsyncThunk } from '@reduxjs/toolkit';
import { logToConsole, showErrorToast } from '../../utils/functions';
import {
  addCartService,
  changeCartDateService,
  changeOrderDateService,
  getBrandListService,
  getCartService,
  getMessageListService,
  getProducCatListService,
  getProducSubCatListService,
  getproducSubCatService,
  getProductListingService,
  getVendorListService,
  getVendorReviewsService,
  removeUnavailableItemService,
  updateNotificationCount,
} from '../../services/Home';

export const getproductSubCategoriesThunk = createAsyncThunk(
  'home/productSubCategories',
  async () => {
    try {
      const res = await getproducSubCatService();
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

export const getVendorListingThunk = createAsyncThunk(
  'home/vendorListing',
  // async (query: string) => {
  // async ({ query, cb }: { query: string; cb: (data: any) => void }) => {
  async ({ query, cb }: { query: string; cb?: (data: any) => void }) => {
    try {
      const res = await getVendorListService(query);
      if (res.data.status) {
        cb?.(res.data.data); // Only call cb if it's provided
        return res.data.data;
      }
      return {};
    } catch (e: any) {
      logToConsole(e.response.data || e.message);
      return {};
    }
  },
);

export const getProductListingThunk = createAsyncThunk(
  'home/productListing',
  async ({ query, cb }: { query: string; cb?: (data: any) => void }) => {
    try {
      const res = await getProductListingService(query);
      if (res?.data?.status) {
        cb?.(res?.data?.data);
        return res.data.data;
      }
      return {};
    } catch (e: any) {
      logToConsole(e?.response?.data || e?.message);
      showErrorToast(e?.response?.data?.message)
      return {};
    }
  },
);

export const getProductCatListingThunk = createAsyncThunk(
  'home/productCatListing',
  async () => {
    try {
      const res = await getProducCatListService();
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

export const getProductSubCatListingThunk = createAsyncThunk(
  'home/productSubCatListing',
  async (query: string) => {
    try {
      const res = await getProducSubCatListService(query);
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

export const getBrandListingThunk = createAsyncThunk(
  'home/productBrandListing',
  async () => {
    try {
      const res = await getBrandListService();
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

export const getVendorReviewsThunk = createAsyncThunk(
  'home/VendorReviews',
  async ({ query, cb }: { query: string; cb: (res: any) => void }) => {
    try {
      const res = await getVendorReviewsService(query);
      if (res.data.status) {
        cb(res.data);
        return res.data.data;
      }
      return {};
    } catch (e: any) {
      logToConsole(e.response.data || e.message);
      return {};
    }
  },
);

export const getCartThunk = createAsyncThunk(
  'home/GetCart',
  async ({ cb, nb }: { cb?: (res: any) => void, nb?: (err?: any) => void }) => {
    try {
      const res = await getCartService();
      if (res.data?.status) {
        if (cb) cb(res.data);
        return res.data.data;
      }
      return [];
    } catch (e: any) {
      logToConsole(e.response?.data || e.message);
      if (nb) nb(e); // <-- Use nb here

      return [];
    }
  },
);


export const getDateChangeThunk = createAsyncThunk(
  'home/changeDate',
  async ({ data, cb }: { data: string; cb?: (res: any) => void }) => {
    try {
      const res = await changeCartDateService(data);
      if (res.data.status) {
        if (cb) cb(res.data);
        return res.data.data;
      }
      return [];
    } catch (e: any) {
      logToConsole(e.response.data || e.message);
      return [];
    }
  },
);

export const removeUnavailableItemsThunk = createAsyncThunk(
  'home/removeUnavailableItems',
  async ({ data, cb }: { data: string; cb?: (res: any) => void }) => {
    try {
      const res = await removeUnavailableItemService(data);
      if (res.data.status) {
        if (cb) cb(res.data);
        return res.data.data;
      }
      return [];
    } catch (e: any) {
      logToConsole(e.response.data || e.message);
      return [];
    }
  },
);
export const updateNotificationCountThunk = createAsyncThunk(
  'home/updateCount',
  async ({ data, cb }: { data: string; cb?: (res: any) => void }) => {
    try {
      const res = await updateNotificationCount(data);
      if (res.data.status) {
        if (cb) cb(res.data);
        return [];
      }
      return [];
    } catch (e: any) {
      logToConsole(e.response.data || e.message);
      return [];
    }
  },
);

export const getUnreadMsgCountThunk = createAsyncThunk("socket/MsgCount",
  async () => {
    try {
      const res = await getMessageListService();
      if (res.data.status) {
        return res.data.data;
      }
      return {};
    } catch (e: any) {
      logToConsole(e.response.data || e.message);
      return {};
    }
  });

// export const addCartThunk = createAsyncThunk('home/addCart', async () => {
//     try {
//         const res = await addCartService();
//         if (res.data.status) {
//             return res.data.data;
//         }
//         return {};
//     } catch (e: any) {
//         logToConsole(e.response.data || e.message);
//         return {};
//     }
// });
