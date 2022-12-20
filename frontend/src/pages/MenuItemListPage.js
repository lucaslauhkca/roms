import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteMenuItem, getAllMenuItems } from '../features/menu/menuSlice';
import { getStaffRole } from '../utils/roleHelper';

const MenuItemListPage = () => {
  const { menuItemList, isLoading } = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const role = getStaffRole();
  //only owner and managers can see menu item list
  if (role !== 'OWNER' && role !== 'MANAGER') {
    navigate('/ManageOrder');
  }

  //get menu list when the page is loaded
  useEffect(() => {
    getMenuItemList();
  }, []);

  const getMenuItemList = () => {
    dispatch(getAllMenuItems());
  };

  //navigate to edit menu page when an menu item is clicked
  const onMenuItemSelected = (menuItemId) => {
    navigate(`../edit-menu-item/${menuItemId}`);
  };

  //navigate to add menu page when the add menu item button is clicked
  const onAddMenuItem = () => {
    navigate('../add-menu-item');
  };

  const onUploadMenuItemImage = (menuItemId) => {
    navigate(`../upload-image/${menuItemId}`);
  };

  if (isLoading) {
    //please replace with loader lol
    return <div>Loading</div>;
  }

  return (
    <div className='container'>
      <h2 className='text-center mt-5'>Menu Items</h2>
      <div className='d-flex pb-4'>
        <button onClick={onAddMenuItem} className='btn btn-primary ms-auto'>
          Add Item
        </button>
      </div>
      <div className='card'>
        <div className='card-body'>
          <div className='table-responsive'>
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th width="100">Image</th>
                  <th>Name</th>
                  <th className='text-end'>Price</th>
                  <th className='text-center'>Status</th>
                  <th className='text-end'>Action</th>
                </tr>
              </thead>
              <tbody>
                {menuItemList.map((item, index) => {
                  return (
                    <tr key={item._id}>
                      <td>
                        <img
                          src={item.imageUrl || '/assets/no_image.png'}
                          alt={item.name}
                          className='img-fluid'
                        />
                      </td>
                      <td>{item.name}</td>
                      <td className='text-end'>$ {item.price}</td>
                      <td className='text-center'>
                        {item.isAvailable ? (
                          <span className='badge rounded-pill bg-success'>
                            Active
                          </span>
                        ) : (
                          <span className='badge rounded-pill bg-danger'>
                            Inactive
                          </span>
                        )}
                        {item.isDineIn && (
                          <span className='badge rounded-pill bg-secondary ms-1'>
                            Dine in
                          </span>
                        )}
                        {item.isTakeOut && (
                          <span className='badge rounded-pill bg-secondary ms-1'>
                            Take out
                          </span>
                        )}
                      </td>
                      <td className='text-end'>
                        <button
                          onClick={() => onUploadMenuItemImage(item._id)}
                          className='btn btn-sm btn-outline-primary me-1'
                        >
                          <i className='bi bi-image'></i>
                        </button>
                        <button
                          onClick={() => onMenuItemSelected(item._id)}
                          className='btn btn-sm btn-outline-primary'
                        >
                          <i className='bi bi-pencil'></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemListPage;
