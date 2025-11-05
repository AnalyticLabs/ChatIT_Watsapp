import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import Reactotron from '../../ReactotronConfig';
import authSlice from './slices/auth';
import homeSlice from './slices/home';
import dashboardSlice from './slices/dashboard';
import chatReducer from './slices/chat';
const rootReducer = combineReducers({
    auth: authSlice,
    home: homeSlice,
    dashboard: dashboardSlice,
    chat: chatReducer,
});
const store = configureStore({
    reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
