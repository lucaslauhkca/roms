import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from './features/example/exampleSlice';
import cartReducers from './features/cart/cartReducers';
import menuReducer from './features/menu/menuSlice';
import orderReducer from './features/order/orderSlice';
import settingReducer from './features/setting/settingSlice';
import staffReducer from './features/staff/staffSlice';


//YOU MUST PUT THE REDUCER INSIDE THE STORE
//OR ELSE YOU CAN'T DISPATCH THEIR ACTIONS FROM ANY OF THE APP COMPONENTS
const store = configureStore({
  reducer: {
    example: exampleReducer,
    cart: cartReducers,
    menu: menuReducer,
    staff: staffReducer,
    setting: settingReducer,
    order: orderReducer
  },
});

export default store;
