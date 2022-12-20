import customFetch from '../../utils/customFetch';

export const getAllMenuItemsThunk = async (url, thunkAPI) => {
  try {
    const res = await customFetch.get(url);
    console.log(res.data);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getMenuItemThunk = async (url, thunkAPI) => {
  try {
    const res = await customFetch.get(url);
    console.log(res.data);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const addMenuItemThunk = async (url, newMenuItem, thunkAPI) => {
  try {
    const res = await customFetch.post(url, newMenuItem);
    console.log(res.data);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const editMenuItemThunk = async (url, updatedMenuItem, thunkAPI) => {
  try {
    const res = await customFetch.patch(url, updatedMenuItem);
    console.log(res.data);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const deleteMenuItemThunk = async (url, thunkAPI) => {
  try {
    const res = await customFetch.delete(url);
    console.log(res.data);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const uploadMenuItemImageThunk = async (url, imageData, thunkAPI) => {
  try {
    const res = await customFetch.post(url, { image: imageData });
    console.log(res.data);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
