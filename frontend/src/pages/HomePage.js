import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllMenuItems } from "../features/menu/menuSlice";
import { getSetting } from "../features/setting/settingSlice";

import FoodItem from "../components/FoodItem";

const HomePage = () => {
  const { menuItemList } = useSelector((state) => state.menu);
  const { setting } = useSelector((state) => state.setting);
  const dispatch = useDispatch();
  const orderTypeList = ["Dine in", "Take out"];

  let i = 0;

  if (!localStorage.getItem("orderType")) {
    localStorage.setItem("orderType", "DINE_IN");
  }

  //get menu list when the page is loaded
  useEffect(() => {
    getMenuItemList();
    dispatch(getSetting());
  }, []);

  const getMenuItemList = () => {
    dispatch(getAllMenuItems());
  };

  const filter = (orderType) => {
    localStorage.setItem("orderType", orderType);
    if (localStorage.getItem("cart")) {
      localStorage.removeItem("cart");
    }
    getMenuItemList();
  };

  return (
    <div className="container-fluid">
      <div className="p-3 text-center"><img src="/assets/logo.png" width={250} alt={setting.name}/></div>
      <div className="text-center h4">{setting.desc}</div>
      <div className="text-center">{setting.openHour}</div>

      <div className="text-center p-4">
        <div className="btn-group" role="group" aria-label="Basic example">
          <button
            onClick={() => filter("DINE_IN")}
            type="button"
            className={
              localStorage.getItem("orderType") === "DINE_IN"
                ? "btn btn-primary"
                : "btn btn-outline-primary"
            }
          >
            Dine in
          </button>
          <button
            onClick={() => filter("TAKE_OUT")}
            type="button"
            className={
              localStorage.getItem("orderType") === "TAKE_OUT"
                ? "btn btn-primary"
                : "btn btn-outline-primary"
            }
          >
            Take out
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-10 mx-auto">
          <div className="row">
            {menuItemList.map((item, index) => {
              if (localStorage.orderType === "DINE_IN" && item.isDineIn) {
                return <FoodItem key={index} prop={item} />;
              } else if (
                localStorage.orderType === "TAKE_OUT" &&
                item.isTakeOut
              ) {
                return <FoodItem key={index} prop={item} />;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
