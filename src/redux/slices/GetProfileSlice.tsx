import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api"; 
import { GET_PROFILE } from "../../utils/apis/BASE_URL";

export interface DeliveryBoy {
  _id: string;
  name: string;
  email: string;
  contactNo: string;
  profilePhoto?: string;
  pendingCodAmount?: number;
  totalCodCollected?: number;
  lastSettlementAt?: string;
  address?: {
    street: string;
    area: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

interface ProfileState {
  loading: boolean;
  data: DeliveryBoy | null;
  error: string | null;
}

const initialState: ProfileState = {
  loading: false,
  data: null,
  error: null,
};

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const res = await api.get(GET_PROFILE);
      return res.data.deliveryBoy;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch profile");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
