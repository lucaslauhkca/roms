import customFetch from '../../utils/customFetch';

export const getAllOrdersThunk = async (url, thunkAPI) => {
  try {
    const res = await customFetch.get(url);
    console.log(res.data);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getOrderThunk = async (url, thunkAPI) => {
  try {
    const res = await customFetch.get(url);
    console.log(res.data);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const addOrderThunk = async (url, newOrder, thunkAPI) => {
  try {
    const res = await customFetch.post(url, newOrder);
    console.log(res.data);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const editOrderThunk = async (url, updatedOrder, thunkAPI) => {
  try {
    const res = await customFetch.patch(url, updatedOrder);
    console.log(res.data);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const deleteOrderThunk = async (url, thunkAPI) => {
  try {
    const res = await customFetch.delete(url);
    console.log(res.data);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const uploadOrderImageThunk = async (url, imageData, thunkAPI) => {
  try {
    const res = await customFetch.post(url, imageData);
    console.log(res.data);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
