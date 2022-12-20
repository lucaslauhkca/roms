import customFetch from '../../utils/customFetch';

//thunks are separated into different file for cleaner codes
//of course you can put these codes inside the action in the slice file
//but it is a good practice to separate the codes
export const getUniversityListThunk = async (url, thunkAPI) => {
  //must use try catch block when calling API!!
  try {
    const res = await customFetch.get(url);
    //you can always check out the structure of the returned object by logging
    console.log(res.data);
    //you can do something here
    //thunkAPI allows you to dispatch another action
    //e.g. thunkAPI.dispatch(someOtherAction());
    return res.data;
  } catch (error) {
    //you can do error handling here
    //thunkAPI allows you to dispatch another action
    //e.g. thunkAPI.dispatch(someErrorHandlingAction());
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
