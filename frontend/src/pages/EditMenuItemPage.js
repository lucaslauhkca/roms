import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  editMenuItem,
  deleteMenuItem,
  getMenuItem,
} from '../features/menu/menuSlice';
import { getStaffRole } from '../utils/roleHelper';

const EditMenuItemPage = () => {
  const { isLoading, menuItem } = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const role = getStaffRole();
  //only owner and managers can edit menu item list
  if (role !== 'OWNER' && role !== 'MANAGER') {
    navigate('/ManageOrder');
  }

  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    desc: '',
    price: '',
    isAvailable: true,
    isDineIn: true,
    isTakeOut: true,
  });

  useEffect(() => {
    if (menuItem) {
      setFormData({
        _id: menuItem._id,
        name: menuItem.name,
        desc: menuItem.desc,
        price: menuItem.price,
        isAvailable: menuItem.isAvailable,
        isDineIn: menuItem.isDineIn,
        isTakeOut: menuItem.isTakeOut,
      });
    }
  }, [menuItem]);

  function handleInputChange(event) {
    const name = event.target.name;
    let value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;

    if (event.target.type === 'file') {
      value = event.target.files[0];
    }

    setFormData((formData) => {
      return {
        ...formData,
        [name]: value,
      };
    });
  }

  useEffect(() => {
    getMenuItemData();

    console.log(menuItem);
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

  const onSubmit = async (event) => {
    event.preventDefault();

    await dispatch(editMenuItem(formData));
    //can do something after submitted
    navigate('../menu-items');
  };

  const onMenuItemDeleted = async (menuItemId) => {
    await dispatch(deleteMenuItem(menuItemId));
    navigate('../menu-items');
  };

  if (isLoading) {
    //please replace with loader lol
    return <div>Loading</div>;
  }

  const ORDERTYPE = [{ name: 'DINE_IN' }, { name: 'TAKE_AWAY' }];

  return (
    <div className='container'>
      <h1 className='text-center mt-5'>Edit Menu Item</h1>
      <div className='d-flex pb-4'>
        <a href='/menu-items' className='btn btn-outline-dark ms-auto me-3'>
          cancel
        </a>
        <button form='form-menu-item' className='btn btn-primary'>
          Save
        </button>
      </div>
      <div className='card'>
        <div className='card-body'>
          <form id='form-menu-item' onSubmit={onSubmit}>
            <div className='mb-3 row'>
              <label htmlFor='name' className='col-sm-2 col-form-label'>
                Name
              </label>
              <div className='col-sm-10'>
                <input
                  id='name'
                  name='name'
                  onChange={handleInputChange}
                  defaultValue={formData.name}
                  type='text'
                  className='form-control'
                />
              </div>
            </div>
            <div className='mb-3 row'>
              <label htmlFor='desc' className='col-sm-2 col-form-label'>
                Description
              </label>
              <div className='col-sm-10'>
                <textarea
                  id='desc'
                  name='desc'
                  onChange={handleInputChange}
                  defaultValue={formData.desc}
                  className='form-control'
                  rows={5}
                ></textarea>
              </div>
            </div>
            <div className='mb-3 row'>
              <label htmlFor='price' className='col-sm-2 col-form-label'>
                Price
              </label>
              <div className='col-sm-4'>
                <div className='input-group'>
                  <span className='input-group-text' id='price'>
                    $
                  </span>
                  <input
                    id='price'
                    name='price'
                    onChange={handleInputChange}
                    defaultValue={formData.price}
                    type='text'
                    className='form-control'
                  />
                </div>
              </div>
            </div>
            {/* <div className='mb-3 row'>
              <label htmlFor='sortOrder' className='col-sm-2 col-form-label'>
                Sort Order
              </label>
              <div className='col-sm-4'>
                <input
                  id='sortOrder'
                  name='sortOrder'
                  onChange={handleInputChange}
                  type='number'
                  className='form-control'
                />
              </div>
            </div> */}
            <div className='mb-3 row'>
              <label className='col-sm-2 col-form-label'>Status</label>
              <div className='col-sm-10'>
                <div className='form-check form-switch'>
                  <input
                    name='isAvailable'
                    type='checkbox'
                    className='form-check-input'
                    onChange={handleInputChange}
                    defaultChecked={menuItem.isAvailable}
                    autoComplete='off'
                  />
                </div>
              </div>
            </div>
            <div className='mb-3 row'>
              <label className='col-sm-2 col-form-label'>Order Type</label>
              <div className='col-sm-4'>
                <div className='form-check'>
                  <input
                    id='isDineIn'
                    value='DINE_IN'
                    checked={menuItem.isDineIn}
                    onChange={handleInputChange}
                    name='isDineIn'
                    className='form-check-input'
                    type='checkbox'
                  />
                  <label htmlFor='isDineIn' className='form-check-label'>
                    Dine in
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    id='isTakeOut'
                    value='DINE_IN'
                    checked={menuItem.isTakeOut}
                    onChange={handleInputChange}
                    name='isTakeOut'
                    className='form-check-input'
                    type='checkbox'
                  />
                  <label htmlFor='isTakeOut' className='form-check-label'>
                    Take out
                  </label>
                </div>
              </div>
            </div>
            <div className='mb-3 row'>
              <label className='col-sm-2 col-form-label'>Delete</label>
              <div className='col-sm-4'>
                <button
                  onClick={() => onMenuItemDeleted(getMenuItemIdFromUrl())}
                  className='btn btn-sm btn-outline-danger me-1'
                >
                  <i className='bi bi-trash3'></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMenuItemPage;
