import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getSettingThunk, updateSettingThunk } from './settingThunk';

const initialState = {
  setting: {},
  isLoading: false,
  errorMsg: '',
};

export const getSetting = createAsyncThunk(
  'setting/getSetting',
  async (_, thunkAPI) => {
    return getSettingThunk('/setting', thunkAPI);
  }
);

export const updateSetting = createAsyncThunk(
  'setting/updateSetting',
  async (settingToUpdate, thunkAPI) => {
    return updateSettingThunk('/setting', settingToUpdate, thunkAPI);
  }
);

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducer: {},
  extraReducers: {
    //GET SETTING
    [getSetting.pending]: (state) => {
      state.isLoading = true;
    },
    [getSetting.fulfilled]: (state, { payload }) => {
      const { setting } = payload;
      state.isLoading = false;
      state.setting = setting;
    },
    [getSetting.rejected]: (state) => {
      state.isLoading = false;
    },
    //UPDATE SETTING
    [updateSetting.pending]: (state) => {
      state.isLoading = true;
    },
    [updateSetting.fulfilled]: (state, { payload }) => {
      const { setting } = payload;
      state.setting = setting;
      state.isLoading = false;
      toast.success('Setting updated');
    },
    [updateSetting.rejected]: (state) => {
      state.isLoading = false;
      toast.error('Failed to update setting');
    },
  },
});

export default settingSlice.reducer;
