import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { addOrder } from '../features/order/orderSlice';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = ({ order }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const navigate = useNavigate();

  // order type
  let orderType = "";
  if (localStorage.getItem('orderType') == 'DINE_IN'){
    orderType = "Dine in";
  }else{
    orderType = "Take out";
  }
  //let sampleOrder = {"selectedTime": "2021-12-01 20:13:00", "orderType": orderType}
  let selectedTime = localStorage.getItem('selectedTime');
  
  // Summery
  let cart;
  let subtotal = 0;
  let tax = 0.15;
  let total = 0;

  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'))
    cart.forEach(cartItem => {
      subtotal += cartItem.count * cartItem.price
    });
    total = subtotal * (1+tax);
  } else {
    cart = [];
  }

  const onAddOrder = async () => {
    let newOrder;
    if (localStorage.getItem('orderType') == 'DINE_IN') {
      newOrder = {
        orderType : 'DINE_IN', 
        reserveTime : selectedTime,
        total : total,
        items : cart
      }
    } else {
      newOrder = {
        orderType : 'TAKE_OUT', 
        pickupTime : selectedTime,
        total : total,
        items : cart
      }
    }
    
    let createdOrder = await dispatch(addOrder(newOrder));
    //console.log(createdOrder)
    localStorage.removeItem("cart");
    localStorage.removeItem("selectedTime");
    //can do something after the item is added
    navigate('../order/' + createdOrder.payload.newOrder._id);
  };

  return (
    <div className="container">
      <h2 className='mt-5'>Checkout</h2>
      <div className='card'>
        <div className='card-body'>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th width="200">Item</th>
                  <th></th>
                  <th width="100" className='text-center'>Unit</th>
                  <th width="100">Unit Price</th>
                </tr>
              </thead>
              <tbody>
              {cart.map((item, index) => (
                <tr key={index} className="col-12">
                  <td className="col-md-2">
                    <img
                      className='img-fluid'
                      src={item.imageUrl || '/assets/no_image.png'}
                      alt={`item: ${item.name}`}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td className='text-center'>{item.count}</td>
                  <td className='text-end'>$ {item.price}</td>
                </tr>
              ))}
              </tbody>
              <tfoot>
                <tr>
                  <td rowSpan={3} colSpan={2}>
                    Order Type: {orderType}<br/>
                    Select Time: {selectedTime}
                  </td>
                  <td className='text-end'>Subtotal : </td>
                  <td className='text-end'>{(Math.round(subtotal * 100) / 100).toFixed(2)}</td>
                </tr>
                <tr>
                  <td className='text-end'>Tax : </td>
                  <td className='text-end'>{(Math.round(subtotal * tax * 100) / 100).toFixed(2)}</td>
                </tr>
                <tr>
                  <td className='text-end'>Total : </td>
                  <td className='text-end'>{(Math.round(subtotal * (1+tax) * 100) / 100).toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mt-3">
          <div className="d-flex">
            <a href="/cart" className="btn btn-outline-primary ms-auto me-3">Back</a>
            <button onClick={onAddOrder} type="button" className="btn btn-primary">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
