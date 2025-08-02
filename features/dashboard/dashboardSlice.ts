import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TabType = "Chats" | "Status" | "Calls";

export interface CallItem {
  id: string;
  name: string;
  time: string;
  status: string;
  avatar: string;
  type: string;
  createdAt: string;
}

export interface ChatProfileItem {
  id: string;
  name: string;
  time: string;
  message: string;
  avatar: string;
  createdAt: string;
}

export interface GroupItem {
  id: string;
  name: string;
  message: string;
  time: string;
  avatar: string;
  isGroup: true;
  createdAt: string;
}

interface DashboardState {
  activeTab: TabType;
  selectedCallIds: string[];
  calls: CallItem[];
  profileData: ChatProfileItem[];
  groups: GroupItem[];
  selectedChatId: string | null;
  searchText: string;
  isMoreDetailsOpen: boolean;
}

const initialState: DashboardState = {
  activeTab: "Chats",
  selectedCallIds: [],
  calls: [],
  profileData: [],
  groups: [],
  selectedChatId: null,
  searchText: "",
  isMoreDetailsOpen: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<TabType>) {
      state.activeTab = action.payload;
    },
    setIsMoreDetailsOpen: (state, action: PayloadAction<boolean>) => {
      state.isMoreDetailsOpen = action.payload;
    },
    setCalls(state, action: PayloadAction<CallItem[]>) {
      state.calls = action.payload;
    },
    setProfileData(state, action: PayloadAction<ChatProfileItem[]>) {
      state.profileData = action.payload;
    },
    setGroups(state, action: PayloadAction<GroupItem[]>) {
      state.groups = action.payload;
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
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const {
  setActiveTab,
  setCalls,
  setProfileData,
  setGroups,
  toggleSelectCall,
  clearSelectedCalls,
  deleteSelectedCalls,
  setSelectedChatId,
  setSearchText,
  setIsMoreDetailsOpen,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
