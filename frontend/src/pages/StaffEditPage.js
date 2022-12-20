import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getStaff, editStaff } from '../features/staff/staffSlice';
import { getStaffRole } from '../utils/roleHelper';

const StaffEditPage = () => {
  const { isLoading, staff } = useSelector((state) => state.staff);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstname, SetFirstname] = useState('');
  const [lastname, SetLastname] = useState('');
  const [username, SetUsername] = useState('');
  const [password, SetPassword] = useState('');
  const [role, SetRole] = useState('');
  const { id } = useParams();

  const staffRole = getStaffRole();
  //only owner can see staff list
  if (staffRole !== 'OWNER') {
    navigate('/ManageOrder');
  }

  useEffect(() => {
    document.title = 'Edit Staff';
    setStaffData();
  }, []);

  function setStaffData() {
    dispatch(getStaff(id))
      .then((response) => {
        console.log(staff);
        SetFirstname(response.payload.staff.firstname);
        SetLastname(response.payload.staff.lastname);
        SetUsername(response.payload.staff.username);
        SetPassword(response.payload.staff.password);
        SetRole(response.payload.staff.role);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function onChangeFirstname(event) {
    SetFirstname(event.target.value);
  }

  function onChangeLastname(event) {
    SetLastname(event.target.value);
  }

  function onChangeUsername(event) {
    SetUsername(event.target.value);
  }

  function onChangePassword(event) {
    SetPassword(event.target.value);
  }

  function onChangeRole(event) {
    SetRole(event.target.value);
  }

  const onEdit = async (event) => {
    event.preventDefault();
    const updatedStaff = {
      id: id,
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      role: role,
    };
    await dispatch(editStaff(updatedStaff));
    navigate('../staffs');
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className='container'>
      <h2 className='text-center mt-5'>Edit Staff</h2>
      <form noValidate className='signup-form' onSubmit={onEdit}>
      <div className='form-group text-end pb-3'>
        <a href="/staffs" className='btn btn-outline-primary me-2'>Cancel</a>
        <input
          className='btn btn-primary'
          type='submit'
          value='Update'
        />
      </div>
      <div className='card'>
        <div className='card-body' onChange={onChangeRole}>
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">First Name</label>
            <div className="col-sm-10">
              <input
                className='form-control'
                type='text'
                name='firstname'
                id='firstname'
                value={firstname}
                onChange={onChangeFirstname}
                required
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Last Name</label>
            <div className="col-sm-10">
              <input
                className='form-control'
                type='text'
                name='lastname'
                id='lastname'
                value={lastname}
                onChange={onChangeLastname}
                required
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Username</label>
            <div className="col-sm-10">
              <input
                type='text'
                className='form-control'
                id='username'
                name='username'
                required
                value={username}
                onChange={onChangeUsername}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input
                type='password'
                className='form-control'
                id='password'
                name='password'
                required
                value={password}
                onChange={onChangePassword}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Staff Type</label>
            <div className="col-sm-10">
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="role" id="server" value="SERVER" checked={role == 'SERVER'} onChange={SetRole}/>
                <label className="form-check-label" htmlFor="server">Server</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="role" id="chef" value="CHEF" checked={role == 'CHEF'} onChange={SetRole}/>
                <label className="form-check-label" htmlFor="chef">Chef</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="role" id="manager" value="MANAGER" checked={role == 'MANAGER'} onChange={SetRole}/>
                <label className="form-check-label" htmlFor="manager">Manager</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="role" id="owner" value="OWNER" checked={role == 'OWNER'} onChange={SetRole}/>
                <label className="form-check-label" htmlFor="owner">Owner</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      </form>
    </div>
  );
};

export default StaffEditPage;
