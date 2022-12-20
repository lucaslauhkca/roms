import { Routes, Route, BrowserRouter } from 'react-router-dom';
//import ExampleHomePage from './pages/example/ExampleHomePage';
import ExampleNotFoundPage from './pages/example/ExampleNotFoundPage';
import SignInPage from './pages/SignInPage';
import AddStaffPage from './pages/AddStaffPage';
import SignOutPage from './pages/SignOutPage';
import Menu from './components/Menu';
import FoodDetailPage from './pages/FoodDetailPage';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/CheckoutPage';
import ManageOrderPage from './pages/ManageOrder';
import ViewOrderPage from './pages/ViewOrder';
import MenuItemListPage from './pages/MenuItemListPage';
import AddMenuItemPage from './pages/AddMenuItemPage';
import EditMenuItemPage from './pages/EditMenuItemPage';
import UploadMenuItemImagePage from './pages/UploadMenuItemImagePage';
import LiveOrderPage from './pages/LiveOrderPage';
import CustomerOrderDetailPage from './pages/CustomerOrderDetailPage';
import StaffsListPage from './pages/StaffsListPage';
import StaffEditPage from './pages/StaffEditPage';
import SettingPage from './pages/SettingPage';
import HomePg from './pages/HomePg';
import HomePage from './pages/HomePage';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* PROTECTED ROUTES - can view only if logged in */}
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Menu />
              </ProtectedRoute>
            }
          >
            {/* ALL STAFF CAN VIEW */}
            <Route path='signout' element={<SignOutPage />} />
            <Route path='manageOrder' element={<ManageOrderPage />} />
            <Route path='viewOrder/:id' element={<ViewOrderPage />} />
            <Route path='LiveOrder' element={<LiveOrderPage />} />

            {/* ONLY OWNERS AND MANAGERS CAN VIEW */}
            <Route path='menu-items' element={<MenuItemListPage />} />
            <Route path='add-menu-item' element={<AddMenuItemPage />} />
            <Route path='edit-menu-item/:id' element={<EditMenuItemPage />} />
            <Route
              path='upload-image/:id'
              element={<UploadMenuItemImagePage />}
            />
            <Route path='setting' element={<SettingPage />} />

            {/* ONLY OWNER CAN VIEW */}
            <Route path='staffs' element={<StaffsListPage />} />
            <Route path='add-staff' element={<AddStaffPage />} />
            <Route path='staffs/edit/:id' element={<StaffEditPage />} />
          </Route>

          {/*UNPROTECTED ROUTES - can view without being logged in */}
          <Route path='/' element={<Menu />}>
            <Route index element={<HomePage />} />
            <Route path='signin' element={<SignInPage />} />
            <Route path='cart' element={<CartPage />} />
            <Route path='checkout' element={<CheckoutPage />} />
            <Route path='food-item/:id' element={<FoodDetailPage />} />
            <Route path='homepg' element={<HomePg />} />
            <Route path='order/:id' element={<CustomerOrderDetailPage />} />
            {/* add page here if you want the shared layout*/}
          </Route>

          {/* add page here if you don't want the shared layout*/}

          {/* !!not found page must be placed at the very end!!*/}
          <Route path='*' element={<ExampleNotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
