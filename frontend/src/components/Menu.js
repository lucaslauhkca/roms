import { Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import AuthService from '../features/authentication/auth-service';
import settingSlice, { getSetting } from "../features/setting/settingSlice";
  
const Menu = () => {
  const { setting } = useSelector((state) => state.setting);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  useEffect(()=>{
    setIsLoggedIn(AuthService.getCurrentUser());
    dispatch(getSetting());
  }, []);

  return (
    <>
      <header>
        <nav className='d-flex justify-content-between p-3'>
          <div className="dropdown">
            <a className="nav-link" href="#" role="button" data-bs-toggle="dropdown"><i className="bi bi-list"></i></a>
            <ul className="dropdown-menu">
              {isLoggedIn
                ?
                <>
                <li><a className="dropdown-item" href="/LiveOrder">Live Order</a></li>
                <li><a className="dropdown-item" href="/ManageOrder">Order History</a></li>
                <li><a className="dropdown-item" href="/menu-items">Menu</a></li>
                <li><a className="dropdown-item" href="/staffs">Staff</a></li>
                <li><a className="dropdown-item" href="/setting">Setting</a></li>
                <li><hr className="dropdown-divider"/></li>
                <li><a className="dropdown-item" href="/signout">Sign Out</a></li>
                </>
                :
                <li><a className="dropdown-item" href="/signin">Sign In</a></li>
              }
            </ul>
          </div>
          <a href="/" className='navbar-brand'>{setting.name}</a>
          <a href="/cart" className="nav-link"><i className="bi bi-bag"></i></a>
        </nav>
      </header>
      <main className='pd-5'>
        <Outlet />
      </main>
      <footer className='text-center p-3'>{setting.name} {new Date().getFullYear()} All Right Reserve. ROMS Technical support</footer>
    </>
  );
};

export default Menu;
