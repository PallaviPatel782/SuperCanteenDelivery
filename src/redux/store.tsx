import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slices/GetProfileSlice";
import assignedOrdersReducer from './slices/assignedOrdersSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    profile: profileReducer,
    assignedOrders: assignedOrdersReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
