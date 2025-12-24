import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LOGIN_API } from "../../utils/apis/BASE_URL";

interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: true,  
  error: null,
};

/* ================= LOGIN ================= */
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    payload: { contactNo: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(LOGIN_API, payload);

      if (!res.data?.success) {
        return rejectWithValue(res.data?.message || "Login failed");
      }

      await AsyncStorage.setItem("authToken", res.data.token);
      await AsyncStorage.setItem(
        "userInfo",
        JSON.stringify(res.data.deliveryBoy)
      );

      return {
        token: res.data.token,
        user: res.data.deliveryBoy,
      };
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

/* ================= LOGOUT ================= */
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await AsyncStorage.removeItem("authToken");
  await AsyncStorage.removeItem("userInfo");
  return true;
});

/* ================= RESTORE AUTH ================= */
export const restoreAuth = createAsyncThunk("auth/restore", async () => {
  const token = await AsyncStorage.getItem("authToken");
  const userInfo = await AsyncStorage.getItem("userInfo");

  if (token && userInfo) {
    return {
      token,
      user: JSON.parse(userInfo),
    };
  }

  return {
    token: null,
    user: null,
  };
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* RESTORE */
      .addCase(restoreAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(restoreAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })

      /* LOGIN */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* LOGOUT */
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.error = null;
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
