import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { ASSIGNED_ORDERS } from "../../utils/apis/BASE_URL";

export const fetchAssignedOrders = createAsyncThunk(
    "orders/fetchAssignedOrders",
    async (_, thunkAPI) => {
        try {
            const res = await api.get(ASSIGNED_ORDERS);
            return res.data.orders;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to fetch assigned orders"
            );
        }
    }
);

const assignedOrdersSlice = createSlice({
  name: "assignedOrders",
  initialState: {
    loading: false,
    data: [] as any[],
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignedOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssignedOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAssignedOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});


export default assignedOrdersSlice.reducer;
