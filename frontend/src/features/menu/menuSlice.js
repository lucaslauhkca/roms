import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllMenuItemsThunk,
  getMenuItemThunk,
  addMenuItemThunk,
  editMenuItemThunk,
  deleteMenuItemThunk,
  uploadMenuItemImageThunk,
} from './menuThunk';

const initialState = {
  menuItemList: [],
  menuItem: {},
  isLoading: false,
  errorMsg: '',
};

export const getAllMenuItems = createAsyncThunk(
  'menu/getAllMenuItems',
  async (_, thunkAPI) => {
    return getAllMenuItemsThunk('/menu', thunkAPI);
  }
);

export const getMenuItem = createAsyncThunk(
  'menu/getMenuItem',
  async (menuItemId, thunkAPI) => {
    return getMenuItemThunk(`/menu/${menuItemId}`, thunkAPI);
  }
);

export const addMenuItem = createAsyncThunk(
  'menu/addMenuItem',
  async (menuItemToAdd, thunkAPI) => {
    return addMenuItemThunk('/menu', menuItemToAdd, thunkAPI);
  }
);

export const editMenuItem = createAsyncThunk(
  'menu/editMenuItem',
  async (menuItemToEdit, thunkAPI) => {
    return editMenuItemThunk(
      `/menu/${menuItemToEdit._id}`,
      menuItemToEdit,
      thunkAPI
    );
  }
);

export const deleteMenuItem = createAsyncThunk(
  'menu/deleteMenuItem',
  async (menuItemId, thunkAPI) => {
    return deleteMenuItemThunk(`/menu/${menuItemId}`, thunkAPI);
  }
);

export const uploadMenuItemImage = createAsyncThunk(
  'menu/uploadMenuItemImage',
  async (data, thunkAPI) => {
    return uploadMenuItemImageThunk(
      `/menu/upload-image/${data.id}`,
      data.image,
      thunkAPI
    );
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducer: {},
  extraReducers: {
    //GET ALL MENU ITEMS
    [getAllMenuItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllMenuItems.fulfilled]: (state, { payload }) => {
      const { menuItems } = payload;
      state.isLoading = false;
      state.menuItemList = menuItems;
    },
    [getAllMenuItems.rejected]: (state) => {
      state.isLoading = false;
    },
    //GET SINGLE MENU ITEM
    [getMenuItem.pending]: (state) => {
      state.isLoading = true;
      state.menuItem = {};
    },
    [getMenuItem.fulfilled]: (state, { payload }) => {
      const { menuItem } = payload;
      state.isLoading = false;
      state.menuItem = menuItem;
    },
    [getMenuItem.rejected]: (state) => {
      state.isLoading = false;
    },
    //ADD MENU ITEM
    [addMenuItem.pending]: (state) => {
      state.isLoading = true;
    },
    [addMenuItem.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      //the api will return the newly added menu item
      //you can add it to the state if needed
    },
    [addMenuItem.rejected]: (state) => {
      state.isLoading = false;
    },
    //EDIT MENU ITEM
    [editMenuItem.pending]: (state) => {
      state.isLoading = true;
    },
    [editMenuItem.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      //the api will return the updated menu item
      //you can add it to the state if needed
    },
    [editMenuItem.rejected]: (state) => {
      state.isLoading = false;
    },
    //DELETE MENU ITEM
    [deleteMenuItem.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteMenuItem.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [deleteMenuItem.rejected]: (state) => {
      state.isLoading = false;
    },
    //UPLOAD MENU ITEM IMAGE
    [uploadMenuItemImage.pending]: (state) => {
      state.isLoading = true;
    },
    [uploadMenuItemImage.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [uploadMenuItemImage.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default menuSlice.reducer;
