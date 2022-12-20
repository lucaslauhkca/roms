import React, { useState } from 'react';
import { Stack } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ADD_TO_CART } from '../features/cart/cartConstants';
import { addToCart, deleteFromCart } from '../features/cart/cartActions';
import DatePicker from 'react-datepicker';
import { setMinutes, setHours } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';

const Cart = () => {
  let navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  function toggleOrderType() {
    if (localStorage.getItem('orderType') == 'DINE_IN') {
      return 'Dine in';
    } else {
      return 'Take out';
    }
  }

  const changeQuantity = (e, menuItem) => {
    let cart;
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    } else {
      cart = [];
    }

    cart.forEach((item) => {
      if (item._id === menuItem._id) {
        item.count = e.target.value;
      }
    });

    localStorage.setItem('cart', JSON.stringify(cart));

    dispatch({
      type: ADD_TO_CART,
      payload: cart,
    });
  };

  const handleMenu = (evt) => {
    navigate('/');
  };

  const handleCheckout = (evt) => {
    if (new Date() > setHours(setMinutes(now, 30), 22)) {
      toast('Restaurant Closed!');
    } else {
      navigate('/checkout');
    }
  };

  const handlePrevious = (evt) => {
    navigate(-1);
  };

  const handleHome = (evt) => {
    navigate('/');
  };

  const [now, setTime] = useState(new Date());
  localStorage.setItem('selectedTime', now);
  function onChangeOrderTime(date) {
    setTime(date);
    localStorage.setItem('selectedTime', date);
  }

  return (
    <div className="container cartPage">
      <h2 className='mt-5'>My Order</h2>
      <div className="card">
        <div className="card-body">
          <div id="cartList">
            {cart.map((item, index) => (
              <div key={index} className='cartItem'>
                <div className='itemDetails row align-items-center'>
                  <div className='col-2'>
                    <img
                      className='img-fluid'
                      src={item.imageUrl || '/assets/no_image.png'}
                      alt={`item: ${item.name}`}
                    />
                  </div>
                  <div className='col'>
                    <Link to={`/food-item/${item._id}`}>{item.name}</Link>
                  </div>
                  <div className='col-2'>${item.price.toFixed(2)}</div>
                  <div className='col-3'>
                    <input
                      className='form-control'
                      type='number'
                      min='1'
                      value={item.count}
                      onChange={(e) => changeQuantity(e, item)}
                    />
                  </div>
                  <div className='col-2 text-end'>
                    <button
                      type='button'
                      className='btn btn-danger btn-sm'
                      onClick={() => dispatch(deleteFromCart(item))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
                <hr/>
                {/* <div className='row p-3'>
                  <div className='col d-grid gap-2'>
                    <button
                      className='btn btn-success btn-lg btn-block'
                      onClick={handleMenu}
                    >
                      Add More Items
                    </button>
                  </div>
                </div> */}
                <div className='row'>
                  <div className='col-12 text-end'>
                  Total: $
                  {cart
                    .reduce(
                      (accumulator, cartItem) =>
                        accumulator + cartItem.count * cartItem.price,
                      0
                    )
                    .toFixed(2)}
                  </div>
                </div>
          </div>
        </div>
      </div>

      <div className="card mt-5" id='cartTime'>
        <div className='card-body'>
          <h2>Order Detail</h2>
          <div className='mb-3 row'>
            <div className='col-sm-2 '>Order type</div>
            <div className='col-sm-10'>{toggleOrderType()}</div>
          </div>
          <div className='mb-3 row'>
            <div className='col-sm-2 '>Select time</div>
            <div className='col-sm-10'>
              <DatePicker
                className='form-control'
                selected={now}
                minTime={Date.now()}
                maxTime={setHours(setMinutes(now, 30), 22)}
                onChange={(date) => onChangeOrderTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption='Time'
                dateFormat='h:mm aa'
              />
            </div>
          </div>
          <div id='cartAction'>
            <div className='row'>
              <div className='col d-grid gap-3'>
                <button
                  className='btn btn-success btn-lg btn-block'
                  onClick={handleCheckout}
                >
                  Proceed to Check out
                </button>
                <button
                  className='btn btn-primary btn-lg btn-block'
                  onClick={handlePrevious}
                >
                  Back to Previous page
                </button>
                <button
                  className='btn btn-dark btn-lg btn-block'
                  onClick={handleHome}
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
