import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/authTypes';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string, isAuthenticated: boolean }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    UpdateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      } else {
        state.user = action.payload as User;
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, setIsLoggedIn, UpdateUser, logout } = authSlice.actions;
export default authSlice.reducer;
