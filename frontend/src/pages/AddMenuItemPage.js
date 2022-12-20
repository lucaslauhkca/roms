import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addMenuItem } from '../features/menu/menuSlice';
import { getStaffRole } from '../utils/roleHelper';

const AddMenuItemPage = () => {
  const { isLoading } = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const role = getStaffRole();
  //only owner and managers can edit menu item list
  if (role !== 'OWNER' && role !== 'MANAGER') {
    navigate('/ManageOrder');
  }

  // handle form data
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    price: '',
    sortOrder: 0,
    isAvailable: true,
    isDineIn: true,
    isTakeOut: true,
  });

  function handleInputChange(event) {
    const name = event.target.name;
    let value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;

    setFormData((formData) => {
      return {
        ...formData,
        [name]: value,
      };
    });
  }

  const onAddMenuItem = async () => {
    let newMenuItem = formData;
    await dispatch(addMenuItem(newMenuItem));
    //can do something after the item is added
    navigate('../menu-items');
  };

  if (isLoading) {
    //return some UI or whatever
  }

  return (
    <div className='container'>
      <h1 className='text-center mt-5'>Add Menu Item</h1>
      <div className='d-flex pb-4'>
        <a href='/menu-items' className='btn btn-outline-dark ms-auto me-3'>
          cancel
        </a>
        <button onClick={onAddMenuItem} className='btn btn-primary'>
          Save
        </button>
      </div>
      <div className='card'>
        <div className='card-body'>
          <form>
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
                  defaultValue={formData.sortOrder}
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
                    defaultChecked={formData.isAvailable}
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
                    checked={formData.isDineIn}
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
                    checked={formData.isTakeOut}
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMenuItemPage;
