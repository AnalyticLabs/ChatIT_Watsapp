import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TabType = "Chats" | "Status" | "Calls";

export interface CallItem {
  id: string;
  name: string;
  time: string;
  status: string;
  avatar: string;
  type: string;
}

export interface ChatProfileItem {
  id: string;
  name: string;
  time: string;
  message: string;
  avatar: string;
}

interface DashboardState {
  activeTab: TabType;
  selectedCallIds: string[];
  calls: CallItem[];
  profileData: ChatProfileItem[];
  selectedChatId: string | null;
}

const initialState: DashboardState = {
  activeTab: "Chats",
  selectedCallIds: [],
  calls: [],
  profileData: [],
  selectedChatId: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<TabType>) {
      state.activeTab = action.payload;
    },
    setCalls(state, action: PayloadAction<CallItem[]>) {
      state.calls = action.payload;
    },
    setProfileData(state, action: PayloadAction<ChatProfileItem[]>) {
      state.profileData = action.payload;
    },
    setSelectedChatId(state, action: PayloadAction<string | null>) {
      state.selectedChatId = action.payload;
    },
    toggleSelectCall(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.selectedCallIds.includes(id)) {
        state.selectedCallIds = state.selectedCallIds.filter((x) => x !== id);
      } else {
        state.selectedCallIds.push(id);
      }
    },
    clearSelectedCalls(state) {
      state.selectedCallIds = [];
    },
    deleteSelectedCalls(state) {
      state.calls = state.calls.filter(
        (call) => !state.selectedCallIds.includes(call.id)
      );
      state.selectedCallIds = [];
    },
  },
});

export const {
  setActiveTab,
  setCalls,
  setProfileData,
  toggleSelectCall,
  clearSelectedCalls,
  deleteSelectedCalls,
  setSelectedChatId,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
