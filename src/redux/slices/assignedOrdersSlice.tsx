import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import {
  ASSIGNED_ORDERS,
  REACHED_DROP,
  COMPLETE_ORDER,
  CUSTOMER_UNAVAILABLE,
} from "../../utils/apis/BASE_URL";

import { OrderType } from "../../navigation/AppNavigator";

type PaginatedBucket = {
  data: OrderType[];
  page: number;
  hasMore: boolean;
};

interface AssignedOrdersState {
  loadingMap: {
    delivered: boolean;
    cancelled: boolean;
    failed: boolean;
    pending: boolean;
  };

  paginated: {
    delivered: PaginatedBucket;
    cancelled: PaginatedBucket;
    failed: PaginatedBucket;
    pending: PaginatedBucket;
  };

  allData: OrderType[];
  actionLoading: boolean;
  lastMessage: string | null;
  error: string | null;
}


type ListKey = "delivered" | "cancelled" | "failed" | "pending";

export const fetchAssignedOrders = createAsyncThunk<
  { orders: OrderType[]; page: number; listKey: ListKey },
  {
    status?: string | string[];
    orderStatus?: string;
    page: number;
    limit: number;
    listKey: ListKey;
  },
  { rejectValue: string }
>(
  "orders/fetchAssignedOrders",
  async ({ status, orderStatus, page, limit, listKey }, thunkAPI) => {
    try {
      const query: string[] = [];

      if (status) {
        query.push(
          `status=${Array.isArray(status) ? status.join(",") : status}`
        );
      }

      if (orderStatus) query.push(`orderStatus=${orderStatus}`);

      query.push(`page=${page}`);
      query.push(`limit=${limit}`);

      const res = await api.get(`${ASSIGNED_ORDERS}?${query.join("&")}`);

      return { orders: res.data.orders || [], page, listKey };
    } catch (err: any) {
      return thunkAPI.rejectWithValue("Failed to fetch orders");
    }
  }
);


export const fetchAllAssignedOrders = createAsyncThunk<
  OrderType[],
  { status?: string; orderStatus?: string }
>("orders/fetchAllAssignedOrders", async (
  { status, orderStatus },
  thunkAPI
) => {
  try {
    const query = new URLSearchParams({
      ...(status && { status }),
      ...(orderStatus && { orderStatus }),
    }).toString();

    const res = await api.get(`${ASSIGNED_ORDERS}?${query}`);
    return res.data.orders;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Failed to fetch all assigned orders"
    );
  }
});


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


export const completeDeliveryOrder = createAsyncThunk<
  { order: any; message: string },
  { orderId: string; otp: string },
  { rejectValue: string }
>("orders/completeDelivery", async ({ orderId, otp }, thunkAPI) => {
  try {
    const res = await api.put(`${COMPLETE_ORDER}/${orderId}`, { otp });
    return {
      order: res.data.order,
      message: res.data.message,
    };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Delivery completion failed"
    );
  }
});


export const customerUnavailableOrder = createAsyncThunk<
  { order: any; message: string },
  { orderId: string; reason: string },
  { rejectValue: string }
>("orders/customerUnavailable", async ({ orderId, reason }, thunkAPI) => {
  try {
    const res = await api.put(`${CUSTOMER_UNAVAILABLE}/${orderId}`, { reason });
    return {
      order: res.data.order,
      message: res.data.message,
    };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Customer unavailable failed"
    );
  }
});

const initialPaginated: PaginatedBucket = {
  data: [],
  page: 1,
  hasMore: true,
};

const initialState: AssignedOrdersState = {
  loadingMap: {
    delivered: false,
    cancelled: false,
    failed: false,
    pending: false,
  },

  paginated: {
    delivered: { ...initialPaginated },
    cancelled: { ...initialPaginated },
    failed: { ...initialPaginated },
    pending: { ...initialPaginated },
  },

  allData: [],
  actionLoading: false,
  lastMessage: null,
  error: null,
};

const assignedOrdersSlice = createSlice({
  name: "assignedOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* ================= FETCH ================= */
      .addCase(fetchAssignedOrders.pending, (state, action) => {
        state.loadingMap[action.meta.arg.listKey] = true;
      })

      .addCase(fetchAssignedOrders.fulfilled, (state, action) => {
        const { listKey, orders, page } = action.payload;
        const bucket = state.paginated[listKey];

        state.loadingMap[listKey] = false;

        if (page === 1) {
          bucket.data = orders;
        } else {
          bucket.data.push(
            ...orders.filter(
              o => !bucket.data.some(e => e._id === o._id)
            )
          );
        }

        bucket.page = page;
        bucket.hasMore = orders.length > 0;
      })

      .addCase(fetchAssignedOrders.rejected, (state, action) => {
        state.loadingMap[action.meta.arg.listKey] = false;
      })

      .addCase(fetchAllAssignedOrders.pending, (state) => {
        state.actionLoading = true;
      })

      .addCase(fetchAllAssignedOrders.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.allData = action.payload;
      })

      .addCase(fetchAllAssignedOrders.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      })

      /* ================= ACTIONS ================= */
      .addCase(reachedDropOrder.pending, actionPending)
      .addCase(reachedDropOrder.fulfilled, actionSuccess)
      .addCase(reachedDropOrder.rejected, actionError)

      .addCase(completeDeliveryOrder.pending, actionPending)
      .addCase(completeDeliveryOrder.fulfilled, actionSuccess)
      .addCase(completeDeliveryOrder.rejected, actionError)

      .addCase(customerUnavailableOrder.pending, actionPending)
      .addCase(customerUnavailableOrder.fulfilled, actionSuccess)
      .addCase(customerUnavailableOrder.rejected, actionError);
  },
});


/* =========================================================
   COMMON HELPERS
========================================================= */

const actionPending = (state: any) => {
  state.actionLoading = true;
};

const actionSuccess = (state: any, action: any) => {
  state.actionLoading = false;
  state.lastMessage = action.payload.message;

  Object.values(state.paginated).forEach((bucket: any) => {
    const index = bucket.data.findIndex(
      (o: any) => o._id === action.payload.order._id
    );
    if (index !== -1) bucket.data[index] = action.payload.order;
  });

  replaceOrder(state.allData, action.payload.order);
};


const actionError = (state: any, action: any) => {
  state.actionLoading = false;
  state.error = action.payload;
};

const replaceOrder = (orders: any[], updatedOrder: any) => {
  const index = orders.findIndex((o) => o._id === updatedOrder._id);
  if (index !== -1) {
    orders[index] = updatedOrder;
  }
};

export default assignedOrdersSlice.reducer;
