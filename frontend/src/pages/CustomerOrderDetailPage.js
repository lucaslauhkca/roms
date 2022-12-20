import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getOrder } from '../features/order/orderSlice';

const CustomerOrderDetailPage = () => {
  const { order } = useSelector((state) => state.order);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Summery
  let subtotal = 0;
  let tax = 0.15;  
  function cal() {
    if (order.orderItems) {
      order.orderItems.forEach(item => {
        subtotal += item.menuItem.price * item.quantity
      });
    }
  }

  //get order list when the page is loaded
  useEffect(() => {
    dispatch(getOrder(id));
  }, []);

  const handleHome = evt => {
    navigate('/');
  };
  
  return (
    <div className="container">
      <h1 className='mt-5'>Order Detail</h1>
      <div className="card">
        <div className="card-body">
          <div className='table-responsive'>
            <table className='table'>
              <tbody>
                <tr>
                  <th width="200">Order No</th>
                  <td>{order.referenceNumber}</td>
                </tr>
                <tr>
                  <th>Order Date</th>
                  <td>{order.reserveTime && 'Reserve Time: ' + order.reserveTime}
                      {order.pickupTime && 'Pickup Time: ' + order.pickupTime}</td>
                </tr>
                <tr>
                  <th width="200">Last update</th>
                  <td>{order.updatedAt}</td>
                </tr>
                <tr>
                  <th>Order Type</th>
                  <td>{order.orderType}</td>
                </tr>
                <tr>
                  <th>Order status</th>
                  <td>{order.status}</td>
                </tr>
                <tr>
                  <th>Food Item</th>
                  <td>
                    {order.orderItems ? 
                        order.orderItems.map((item, index) => (
                          <div key={index} className="orderItem">
                            {item.menuItem.name} x {item.quantity}
                          </div>			
                      ))
                    : console.log()}
                  </td>
                </tr>
                { cal() }
                <tr>
                  <th>Subtotal</th>
                  <td>${(Math.round(subtotal * 100) / 100).toFixed(2)}</td>
                </tr>
                <tr>
                  <th>Tax</th>
                  <td>${(Math.round(subtotal * tax * 100) / 100).toFixed(2)}</td>
                </tr>
                <tr>
                  <th>Total</th>
                  <td>${(Math.round(subtotal * (1+tax) * 100) / 100).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row p-3">
        <div className="col text-center">
            <button className='btn btn-dark btn-lg'
                onClick={handleHome}>
                Back to Home
            </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrderDetailPage;
