import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ContactItem {
  id: string | number;
  contName: string;
  phone: string | null;
  profImg: string | null;
  location: any | null;
}

export interface GroupedContacts {
  [letter: string]: ContactItem[];
}

interface HomeState {
  contacts: ContactItem[];
  groupedContacts: GroupedContacts;
}

const initialState: HomeState = {
  contacts: [],
  groupedContacts: {},
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setAllContacts: (state, action: PayloadAction<ContactItem[]>) => {
      state.contacts = action.payload;
    },

    setGroupedContacts: (state, action: PayloadAction<GroupedContacts>) => {
      state.groupedContacts = action.payload;
    },

    resetContacts: (state) => {
      state.contacts = [];
      state.groupedContacts = {};
    },
  },
});

export const {
  setAllContacts,
  setGroupedContacts,
  resetContacts,
} = homeSlice.actions;

export default homeSlice.reducer;
