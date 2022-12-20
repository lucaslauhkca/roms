import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuItem } from '../features/menu/menuSlice';
import { addToCart } from '../features/cart/cartActions';

const FoodDetailPage = () => {
  const { isLoading, menuItem } = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  useEffect(() => {
    getMenuItemData();
  }, []);

  const getMenuItemIdFromUrl = () => {
    const url = document.URL;
    const id = url.substring(url.lastIndexOf('/') + 1);
    return id;
  };

  const getMenuItemData = () => {
    const menuItemId = getMenuItemIdFromUrl();
    dispatch(getMenuItem(menuItemId));
  };

  // Cart
  const addMenuItemToCart = () => {
    dispatch(addToCart(menuItem));
  };

  return (
    <div className='container pt-5'>
      <div className='card'>
        <div className='row'>
          <div className='col-8'>
            <div className='p-5'>
              <img
                src={menuItem.imageUrl || '/assets/no_image.png'}
                alt={menuItem.name}
                className='img-fluid'
              />
            </div>

          </div>
          <div className='col-4 p-4'>
            <div className='pb-3 d-flex'>
              <a className='btn btn-outline-dark ms-auto' href='/'>
                <i className='bi bi-arrow-return-left'></i> cancel
              </a>
            </div>
            <h2>{menuItem.name}</h2>
            <div className='pb-3'>{menuItem.desc}</div>
            <div className='pb-3 h4'>$ {menuItem.price}</div>
            <div className='pb-3'>
              <button
                onClick={addMenuItemToCart}
                className='btn btn-primary'
              >
                <i className='bi bi-plus'></i> Add to Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailPage;
