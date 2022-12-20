import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllStaffsThunk,
  getStaffThunk,
  editStaffThunk,
  deleteStaffThunk,
} from './staffThunk';

const initialState = {
  staffsList: [],
  staff: {},
  isLoading: false,
  errorMsg: '',
};

export const getAllStaffs = createAsyncThunk(
  'staffs/getAllStaffs',
  async (_, thunkAPI) => {
    return getAllStaffsThunk('/staffs', thunkAPI);
  }
);

export const getStaff = createAsyncThunk(
  'staffs/getStaff',
  async (staffId, thunkAPI) => {
    return getStaffThunk(`/staffs/edit/${staffId}`, thunkAPI);
  }
);

export const editStaff = createAsyncThunk(
  'staffs/editStaff',
  async (updatedStaff, thunkAPI) => {
    return editStaffThunk(
      `/staffs/edit/${updatedStaff.id}`,
      updatedStaff,
      thunkAPI
    );
  }
);

export const deleteStaff = createAsyncThunk(
  'staffs/deleteStaff',
  async (staffId, thunkAPI) => {
    return deleteStaffThunk(`/staffs/delete/${staffId}`, thunkAPI);
  }
);

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducer: {},
  extraReducers: {
    //GET ALL STAFFS 
    [getAllStaffs.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllStaffs.fulfilled]: (state, { payload }) => {
      const { staffs } = payload;
      state.isLoading = false;
      state.staffsList = staffs;
    },
    [getAllStaffs.rejected]: (state) => {
      state.isLoading = false;
    },
    //GET SINGLE STAFF
    [getStaff.pending]: (state) => {
      state.isLoading = true;
      state.staff = {};
    },
    [getStaff.fulfilled]: (state, { payload }) => {
      const { staff } = payload;
      state.isLoading = false;
      state.staff = staff;
    },
    [getStaff.rejected]: (state) => {
      state.isLoading = false;
    },
    
    //EDIT STAFF
    [editStaff.pending]: (state) => {
      state.isLoading = true;
    },
    [editStaff.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [editStaff.rejected]: (state) => {
      state.isLoading = false;
    },
    //DELETE STAFF
    [deleteStaff.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteStaff.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [deleteStaff.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default staffSlice.reducer;