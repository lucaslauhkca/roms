import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUniversityListThunk } from './exampleThunk';

//slice is similar to a feature of the app
//data manipulations that are related to the feature are placed together

//--CREATE INITIAL STATE OF THE SLICE
const initialState = {
  exampleList: [],
  isLoading: false,
  isSwitchOn: false,
};

//--DECLARE AN ACTION
//an async action requires an async thunk(aka middleware)
export const getUniversityList = createAsyncThunk(
  'example/getUniversityList',
  async (countryName, thunkAPI) => {
    return getUniversityListThunk(
      `http://universities.hipolabs.com/search?country=${countryName}`,
      thunkAPI
    );
  }
);

//--CREATE SLICE
const exampleSlice = createSlice({
  name: 'example',
  initialState,
  //reducers are for actions that do not require calling API
  //--DECLARE REDUCER
  reducers: {
    toggleSwitch: (state) => {
      state.isSwitchOn = !state.isSwitchOn;
    },
  },
  //extra reducers are for actions that require calling API (or some other async functions)
  //you can change the value of the states at differnt status of the action i.e. pending, fulfilled, rejected
  //--DECLARE EXTRA REDUCER
  extraReducers: {
    [getUniversityList.pending]: (state) => {
      state.isLoading = true;
    },
    [getUniversityList.fulfilled]: (state, { payload }) => {
      //payload is the data
      //you may have to deconstruct the object depending on the structure of the returned object from the API
      //i.e. const { someFieldName } = payload <-this is called object deconstruction
      //in this example, the API directly returns the list we want so no deconstruction is needed
      state.exampleList = payload.slice(0, 10); //limit to 10 universities only for demo purpose
      state.isLoading = false;
      //you can also dispatch another action here after this action is fulfilled
    },
    [getUniversityList.rejected]: (state) => {
      state.isLoading = false;
      //you can do some error handling here
    },
  },
});

//you have to export both the reducers' actions and the extraReducers
//so that they can be put in the store
//and can be dispatched from other components
export const { toggleSwitch } = exampleSlice.actions;
export default exampleSlice.reducer;

//REMEBER TO PUT THE REDUCER IN THE STORE /src/store.js
