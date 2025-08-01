// redux/callSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Caller {
  _id: string;
  name: string;
  avatar: string;
}

interface CallState {
  incomingCaller: Caller | null;
}

const initialState: CallState = {
  incomingCaller: null,
};

const callSlice = createSlice({
  name: "call",
  initialState,
  reducers: {
    setIncomingCaller: (state, action: PayloadAction<Caller>) => {
      state.incomingCaller = action.payload;
    },
    clearIncomingCaller: (state) => {
      state.incomingCaller = null;
    },
  },
});

export const { setIncomingCaller, clearIncomingCaller } = callSlice.actions;
export default callSlice.reducer;
