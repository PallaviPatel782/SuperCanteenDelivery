import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import {
  ASSIGNED_ORDERS,
  REACHED_DROP,
  COMPLETE_ORDER,
  CUSTOMER_UNAVAILABLE,
} from "../../utils/apis/BASE_URL";

/* ================= FETCH ASSIGNED ORDERS ================= */

export const fetchAssignedOrders = createAsyncThunk<
  { orders: any[]; page: number },
  {
    status?: string;
    orderStatus?: string;
    page?: number;
    limit?: number;
  },
  { rejectValue: string }
>(
  "orders/fetchAssignedOrders",
  async (
    { status, orderStatus, page = 1, limit = 10 },
    thunkAPI
  ) => {
    try {
      const query = new URLSearchParams({
        ...(status && { status }),
        ...(orderStatus && { orderStatus }),
        page: page.toString(),
        limit: limit.toString(),
      }).toString();

      const res = await api.get(`${ASSIGNED_ORDERS}?${query}`);

      return {
        orders: res.data.orders,
        page,
      };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch assigned orders"
      );
    }
  }
);



/* ================= REACHED DROP ================= */

export const reachedDropOrder = createAsyncThunk(
  "orders/reachedDrop",
  async (orderId: string, thunkAPI) => {
    try {
      const res = await api.patch(`${REACHED_DROP}/${orderId}`);
      return {
        order: res.data.order,
        message: res.data.message,
      };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Reached drop failed"
      );
    }
  }
);

/* ================= COMPLETE DELIVERY ================= */

export const completeDeliveryOrder = createAsyncThunk<
  { order: any; message: string },
  { orderId: string; otp: string },
  { rejectValue: string }
>(
  "orders/completeDelivery",
  async ({ orderId, otp }, thunkAPI) => {
    try {
      console.log("orderId", orderId, "otp", otp);
      const res = await api.put(`${COMPLETE_ORDER}/${orderId}`, { otp });
      console.log("completeDelivery res", res.data);
      return {
        order: res.data.order,
        message: res.data.message || "Delivery completed successfully",
      };
    } catch (err: any) {
      console.log("completeDelivery err", err.response?.data?.message)
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Delivery completion failed"
      );
    }
  }
);


/* ================= CUSTOMER UNAVAILABLE ================= */

export const customerUnavailableOrder = createAsyncThunk<
  { order: any; message: string },
  { orderId: string; reason: string },
  { rejectValue: string }
>(
  "orders/customerUnavailable",
  async ({ orderId, reason }, thunkAPI) => {
    try {
      console.log("orderId", orderId, "reason", reason);
      const res = await api.put(`${CUSTOMER_UNAVAILABLE}/${orderId}`, {
        reason,
      });

      console.log("customerUnavailable res", res.data);

      return {
        order: res.data.order,
        message: res.data.message || "Customer marked as unavailable",
      };
    } catch (err: any) {
      console.log("customerUnavailable err", err.response?.data?.message)
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Customer unavailable failed"
      );
    }
  }
);


/* ================= SLICE ================= */

const assignedOrdersSlice = createSlice({
  name: "assignedOrders",
  initialState: {
    loading: false,
    page: 1,
    hasMore: true,
    actionLoading: false,
    data: [] as any[],
    error: null as string | null,
    lastMessage: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* FETCH */
      .addCase(fetchAssignedOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAssignedOrders.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.page === 1) {
          state.data = action.payload.orders;
        } else {
          state.data = [...state.data, ...action.payload.orders];
        }

        state.page = action.payload.page;
        state.hasMore = action.payload.orders.length > 0;
      })
      .addCase(fetchAssignedOrders.rejected, (state) => {
        state.loading = false;
      })

      /* REACHED DROP */
      .addCase(reachedDropOrder.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(reachedDropOrder.fulfilled, (state, action) => {
        state.actionLoading = false;
        replaceOrder(state.data, action.payload.order);
        state.lastMessage = action.payload.message; // 🔹 store message
      })
      .addCase(reachedDropOrder.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      })

      /* COMPLETE DELIVERY */
      .addCase(completeDeliveryOrder.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(completeDeliveryOrder.fulfilled, (state, action) => {
        state.actionLoading = false;
        replaceOrder(state.data, action.payload.order);
        state.lastMessage = action.payload.message; // 🔹 store message
      })
      .addCase(completeDeliveryOrder.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      })

      /* CUSTOMER UNAVAILABLE */
      .addCase(customerUnavailableOrder.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(customerUnavailableOrder.fulfilled, (state, action) => {
        state.actionLoading = false;
        replaceOrder(state.data, action.payload.order);
        state.lastMessage = action.payload.message; // 🔹 store message
      })
      .addCase(customerUnavailableOrder.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      });
  },
});

const replaceOrder = (orders: any[], updatedOrder: any) => {
  const index = orders.findIndex((o) => o._id === updatedOrder._id);
  if (index !== -1) {
    orders[index] = updatedOrder;
  }
};

export default assignedOrdersSlice.reducer;
