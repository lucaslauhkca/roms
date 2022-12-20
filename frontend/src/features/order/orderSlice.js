import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllOrdersThunk,
  getOrderThunk,
  addOrderThunk,
  editOrderThunk,
  deleteOrderThunk,
  uploadOrderImageThunk,
} from './orderThunk';

const initialState = {
  orderList: [],
  order: {},
  isLoading: false,
  errorMsg: '',
};

export const getAllOrders = createAsyncThunk(
  'orders/getAllOrders',
  async (_, thunkAPI) => {
    return getAllOrdersThunk('/orders', thunkAPI);
  }
);

export const getOrder = createAsyncThunk(
  'orders/getOrder',
  async (orderId, thunkAPI) => {
    return getOrderThunk(`/orders/${orderId}`, thunkAPI);
  }
);

export const addOrder = createAsyncThunk(
  'orders/addOrder',
  async (orderToAdd, thunkAPI) => {
    return addOrderThunk('/orders', orderToAdd, thunkAPI);
  }
);

export const editOrder = createAsyncThunk(
  'orders/editOrder',
  async (orderToEdit, thunkAPI) => {
    return editOrderThunk(
      `/orders/${orderToEdit._id}`,
      orderToEdit,
      thunkAPI
    );
  }
);

export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (orderId, thunkAPI) => {
    return deleteOrderThunk(`/orders/${orderId}`, thunkAPI);
  }
);

export const uploadOrderImage = createAsyncThunk(
  'orders/uploadOrderImage',
  async (orderId, imageData, thunkAPI) => {
    return uploadOrderImageThunk(
      `/orders/upload-image/${orderId}`,
      imageData,
      thunkAPI
    );
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducer: {},
  extraReducers: {
    //GET ALL MENU ITEMS
    [getAllOrders.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllOrders.fulfilled]: (state, { payload }) => {
      const { orders } = payload;
      state.isLoading = false;
      state.orderList = orders;
    },
    [getAllOrders.rejected]: (state) => {
      state.isLoading = false;
    },
    //GET SINGLE MENU ITEM
    [getOrder.pending]: (state) => {
      state.isLoading = true;
      state.order = {};
    },
    [getOrder.fulfilled]: (state, { payload }) => {
      const { order } = payload;
      state.isLoading = false;
      state.order = order;
    },
    [getOrder.rejected]: (state) => {
      state.isLoading = false;
    },
    //ADD MENU ITEM
    [addOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [addOrder.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      //the api will return the newly added order item
      //you can add it to the state if needed
    },
    [addOrder.rejected]: (state) => {
      state.isLoading = false;
    },
    //EDIT MENU ITEM
    [editOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [editOrder.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      //the api will return the updated order item
      //you can add it to the state if needed
    },
    [editOrder.rejected]: (state) => {
      state.isLoading = false;
    },
    //DELETE MENU ITEM
    [deleteOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteOrder.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [deleteOrder.rejected]: (state) => {
      state.isLoading = false;
    },
    //UPLOAD MENU ITEM IMAGE
    [uploadOrderImage.pending]: (state) => {
      state.isLoading = true;
    },
    [uploadOrderImage.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [uploadOrderImage.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default orderSlice.reducer;
