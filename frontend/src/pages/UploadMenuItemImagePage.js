import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { uploadMenuItemImage, getMenuItem } from '../features/menu/menuSlice';
import { getStaffRole } from '../utils/roleHelper';

const UploadMenuItemImagePage = () => {
  const { isLoading, menuItem } = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState('');

  const role = getStaffRole();
  //only owner and managers can upload menu item image
  if (role !== 'OWNER' && role !== 'MANAGER') {
    navigate('/ManageOrder');
  }

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

  function handleFileChange(event) {
    const image = event.target.files[0];
    // transform file
    if (image) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(image);
      fileReader.onloadend = () => {
        setImage(fileReader.result);
      };
    } else {
      setImage('');
    }
  }

  const onSubmitImage = async () => {
    let imageData = image;
    // console.log('imageData', image);
    await dispatch(uploadMenuItemImage({ id: menuItem._id, image: imageData }));
    //can do something after the image is uploaded
    navigate('/menu-items');
  };

  if (isLoading) {
    //please replace with loader lol
    return <div>Loading</div>;
  }

  return (
    <div className='container'>
      <h2 className='text-center mt-5'>Upload Image</h2>
      <div className='d-flex pb-4'>
        <a href='/menu-items' className='btn btn-outline-dark ms-auto me-3'>
          cancel
        </a>
        <button form='form-upload-image' className='btn btn-primary'>
          Save
        </button>
      </div>
      <div className='card'>
        <div className='card-body'>
          <form id='form-upload-image' onSubmit={onSubmitImage}>
            <div className='mb-3 row'>
              <label htmlFor='name' className='col-sm-2'>
                Menu Item
              </label>
              <div className='col-sm-10'>{menuItem.name}</div>
            </div>
            <div className='mb-3 row'>
              <label htmlFor='name' className='col-sm-2'>
                Cuurent Image
              </label>
              <div className='col-sm-6'>
                <img
                  src={menuItem.imageUrl || '/assets/no_image.png'}
                  alt={menuItem.name}
                  className='img-fluid'
                />
              </div>
            </div>
            <div className='mb-3 row'>
              <label htmlFor='name' className='col-sm-2 col-form-label'>
                Image
              </label>
              <div className='col-sm-6'>
                {image && (
                  <img src={image} alt='menu_item' className='img-thumbnail mb-3' />
                )}
                <input
                  name='image'
                  onChange={handleFileChange}
                  type='file'
                  accept='image/jpeg, image/png'
                  className='form-control'
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadMenuItemImagePage;
