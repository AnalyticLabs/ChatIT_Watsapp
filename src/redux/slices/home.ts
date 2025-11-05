import { createSlice } from '@reduxjs/toolkit';
import {
  getBrandListingThunk,
  getCartThunk,
  getDateChangeThunk,
  getProductCatListingThunk,
  getProductListingThunk,
  getproductSubCategoriesThunk,
  getProductSubCatListingThunk,
  getVendorListingThunk,
  getUnreadMsgCountThunk,
  getVendorReviewsThunk,
  removeUnavailableItemsThunk,
  updateNotificationCountThunk,
} from '../thunks/home';

// Define a type for the slice state

interface FilterData {
  search?: string;
  startDate?: string;
  endDate?: string;
  rent?: boolean;
  distance?: number | string;
  startPrice?: number | string;
  endPrice?: number | string;
  sort?: string;
  categories?: string[];
  subCategories?: string[];
  brands?: string[];
  vendors?: string[];
  currentLat?: number;
  currentLng?: number;
}

// Define the initial state using that type
interface State {
  subCategories: any[];
  products: any[];
  categoryList: any[];
  subCategoriesList: any[];
  brandList: any[];
  VendorList: any[];
  VendorListCount: number;
  VendorReviews: any[];
  cart: any[];
  messages: number;
  notificationCount: any[];
  date: any[];
  rentActive: boolean;
  filterData: FilterData;
  vendorFilterData: object;
}

const initialState: State = {
  subCategories: [],
  products: [],
  categoryList: [],
  subCategoriesList: [],
  brandList: [],
  VendorList: [],
  VendorListCount: 0,
  VendorReviews: [],
  cart: [],
  messages: 0,
  notificationCount: [],
  date: [],
  rentActive: true,
  filterData: {},
  vendorFilterData: {}

};

export const homeSlice = createSlice({
  name: 'home',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUnReadCountForMesage: (state, action) => {
      state.messages = action.payload;
    },
    setNotificationCount: (state, action) => {
      state.notificationCount = action.payload;
    },
    setFilterDate: (state, action) => {
      state.date = action.payload;
    },
    setRentActiveSlice: (state, action) => {
      state.rentActive = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
    resetFilterData: (state) => {
      state.filterData = {}
    },
    setVendorFilterData: (state, action) => {
      state.vendorFilterData = action.payload;
    },
    resetVendorStore: (state) => {
      state.vendorFilterData = {}
    },
    resetProductStore: (state) => {
      state.products = []
    }
  },
  extraReducers: builder => {
    builder.addCase(getproductSubCategoriesThunk.fulfilled, (state, action) => {
      state.subCategories = action.payload;
    });
    builder.addCase(getVendorListingThunk.fulfilled, (state, action) => {
      state.VendorList = action.payload?.list;
      state.VendorListCount = action.payload?.count;
    });
    builder.addCase(getProductListingThunk.fulfilled, (state, action) => {
      let newarr = [...action.payload];
      state.products = newarr;
    });
    builder.addCase(getProductCatListingThunk.fulfilled, (state, action) => {
      state.categoryList = action.payload;
    });
    builder.addCase(getProductSubCatListingThunk.fulfilled, (state, action) => {
      state.subCategoriesList = action.payload;
    });
    builder.addCase(getBrandListingThunk.fulfilled, (state, action) => {
      state.brandList = action.payload;
    });
    builder.addCase(getUnreadMsgCountThunk.fulfilled, (state, action) => {
      state.messages = action.payload;
    });
    builder.addCase(getVendorReviewsThunk.fulfilled, (state, action) => {
      state.VendorReviews = action.payload;
    });
    builder.addCase(getCartThunk.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addCase(getDateChangeThunk.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addCase(removeUnavailableItemsThunk.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addCase(updateNotificationCountThunk.fulfilled, (state, action) => {
      state.notificationCount = action.payload;
    });
  },
});

// Other code such as selectors can use the imported `RootState` type
// export const selectFile = (state: RootState) => state.home.files;
export const { setUnReadCountForMesage, setNotificationCount, setFilterDate, resetProductStore, setRentActiveSlice, setFilterData,
  resetFilterData, resetVendorStore, setVendorFilterData } = homeSlice.actions;

export default homeSlice.reducer;
