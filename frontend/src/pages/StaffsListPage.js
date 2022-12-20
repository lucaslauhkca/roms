import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteStaff, getAllStaffs } from '../features/staff/staffSlice';
import { getStaffRole } from '../utils/roleHelper';

const StaffsListPage = () => {
  const { staffsList, isLoading } = useSelector((state) => state.staff);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const role = getStaffRole();
  //only owner can see staff list
  if (role !== 'OWNER') {
    navigate('/ManageOrder');
  }

  useEffect(() => {
    document.title = 'Staff List';
    getStaffsList();
  }, []);

  const getStaffsList = () => {
    dispatch(getAllStaffs());
  };

  function confirmDelete(staffId) {
    if (!window.confirm('Are You Sure?')) {
      return;
    }
    onStaffDeleted(staffId);
  }

  const onStaffDeleted = async (staffId) => {
    await dispatch(deleteStaff(staffId));
    getStaffsList();
  };

  const onStaffSelected = (staffId) => {
    navigate(`./edit/${staffId}`);
  };

  const onAddStaff = () => {
    navigate('/add-staff');
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className='container'>
      <h2 className="text-center pt-5">Staff</h2>
      <div className='row'>
        <div className='d-flex pb-4'>
          <button
            onClick={() => onAddStaff()}
            className='btn btn-primary ms-auto'
          >
            <i className='bi bi-plus-lg'></i> Add Staff
          </button>
        </div>
      </div>
      <div className='card'>
        <div className='card-body'>
          <div className='table-responsive'>
            <table
              id='contactList'
              className='table table-hover table-striped'
            >
              <thead>
                <tr>
                  <th className='text-center'>
                    #
                  </th>
                  <th className='text-center align-middle'>
                    Role
                  </th>
                  <th className='text-center align-middle'>
                    First Name
                  </th>
                  <th className='text-center align-middle'>
                    Last Name
                  </th>
                  <th className='text-center align-middle'>
                    Username
                  </th>
                  <th className='text-center align-middle'>
                    Edit
                  </th>
                  <th className='text-center align-middle'>
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {staffsList &&
                  staffsList.map((staff, index) => {
                    return (
                      <tr key={staff._id}>
                        <th scope='row' className='text-center'>
                          {index + 1}
                        </th>
                        <td className='text-center'>{staff.role}</td>
                        <td className='text-center'>{staff.firstname}</td>
                        <td className='text-center'>{staff.lastname}</td>
                        <td className='text-center'>{staff.username}</td>
                        <td className='text-center'>
                          <button
                            onClick={() => {
                              onStaffSelected(staff._id);
                            }}
                            className='btn btn-primary btn-sm edit'
                          >
                            <i className="bi bi-pen"></i> Edit
                          </button>
                        </td>
                        <td className='text-center'>
                          <button
                            onClick={() => {
                              confirmDelete(staff._id);
                            }}
                            className='btn btn-outline-danger btn-sm delete'
                          >
                            <i className="bi bi-trash3"></i>
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

export default StaffsListPage;
