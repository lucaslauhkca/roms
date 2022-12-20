import customFetch from "../../utils/customFetch";

export const getSettingThunk = async (url, thunkAPI) => {
  try {
    const res = await customFetch.get(url);
    console.log(res.data);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateSettingThunk = async (url, updatedSetting, thunkAPI) => {
  console.log(updatedSetting);
  try {
    const res = await customFetch.patch(url, updatedSetting);
    console.log(res.data);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
