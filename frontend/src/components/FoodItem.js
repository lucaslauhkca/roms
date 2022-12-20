import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartActions';

const FoodItem = ({ prop }) => {
    const dispatch = useDispatch();
    const { _id, imageUrl, name, price } = prop;

    // Cart
    const addMenuItemToCart = () => {
      console.log(prop);
      dispatch(addToCart(prop));
    };


    return (
      <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
        <div className="food-item card">
          <div className="card-body">
            <div className='image mb-3'>
              <img
                className='img-fluid'
                src={imageUrl || '/assets/no_image.png'}
                alt={name}
              />
            </div>
            <a className="name h5" href={"/food-item/"+_id}>{name}</a>
            <div className="d-flex justify-content-between align-items-center">
              <div className="price d-flex">
                <div>$</div>
                <div>{(Math.floor(price))}</div>
                <div>.{(price % 1) * 100}</div>
              </div>
              <button onClick={addMenuItemToCart} className="btn btn-sm btn-primary"><i className="bi bi-plus"></i></button>
            </div>
            
          </div>
        </div>
      </div>
    );
  };
  
  export default FoodItem;
  