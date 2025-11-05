import { createSlice } from '@reduxjs/toolkit';
import {
  getUserChatThunk,
  getUserMetricsThunk,
  getUserOrderThunk,
  getUserSubjectThunk,
  getUserVerificationThunk,
  getVendorDetailThunk,
  getVendorInventoryThunk,
  getVendorItemThunk,
  getVendorMetricsThunk,
  getVendorStoreListThunk,
} from '../thunks/dashboard';

// Define a type for the slice state

// Define the initial state using that type
interface State {
  userMetrics: any[];
  vendorMetrics: any[];
  userOrder: any[];
  userVerification: null;
  userSubject: any[];
  userChat: any[];
  vendorDetails: any[];
  vendorInventory: any[];
  vendorStoreList: any[];
  vendorItems: any[];
  notifications: any[];
}
const initialState: State = {
  userMetrics: [],
  vendorMetrics: [],
  userOrder: [],
  userVerification: null,
  userSubject: [],
  userChat: [],
  vendorDetails: [],
  vendorInventory: [],
  vendorStoreList: [],
  vendorItems: [],
  notifications: [],
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    resetVendorStoreList: (state) => {
      state.vendorStoreList = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(getUserMetricsThunk.fulfilled, (state, action) => {
      state.userMetrics = action.payload;
    });
    builder.addCase(getVendorMetricsThunk.fulfilled, (state, action) => {
      state.vendorMetrics = action.payload;
    });
    builder.addCase(getUserOrderThunk.fulfilled, (state, action) => {
      state.userOrder = action.payload;
    });
    builder.addCase(getUserVerificationThunk.fulfilled, (state, action) => {
      state.userVerification = action.payload;
    });
    builder.addCase(getUserSubjectThunk.fulfilled, (state, action) => {
      state.userSubject = action.payload;
    });
    builder.addCase(getUserChatThunk.fulfilled, (state, action) => {
      state.userChat = action.payload;
    });
    builder.addCase(getVendorDetailThunk.fulfilled, (state, action) => {
      state.vendorDetails = action.payload;
    });
    builder.addCase(getVendorInventoryThunk.fulfilled, (state, action) => {
      state.vendorInventory = action.payload;
    });
    builder.addCase(getVendorStoreListThunk.fulfilled, (state, action) => {
      state.vendorStoreList = action.payload;
    });
    builder.addCase(getVendorItemThunk.fulfilled, (state, action) => {
      state.vendorItems = action.payload;
    });
  },
});

// Other code such as selectors can use the imported `RootState` type
// export const selectFile = (state: RootState) => state.home.files;
export const {resetVendorStoreList} = dashboardSlice.actions;
export default dashboardSlice.reducer;
