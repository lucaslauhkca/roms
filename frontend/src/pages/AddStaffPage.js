import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../features/authentication/auth-service';
import { toast } from 'react-toastify';
import { getStaffRole } from '../utils/roleHelper';

const AddStaffPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const staffRole = getStaffRole();
  //only owner can add staff
  if (staffRole !== 'OWNER') {
    navigate('/ManageOrder');
  }

  useEffect(() => {
    document.title = 'Register';
  }, []);

  function onChangeUsername(event) {
    setUsername(event.target.value);
  }

  function onChangePassword(event) {
    setPassword(event.target.value);
  }

  function onChangeFirstName(event) {
    setFirstName(event.target.value);
  }

  function onChangeLastName(event) {
    setLastName(event.target.value);
  }

  function onChangeRole(event) {
    setRole(event.target.value);
  }

  function clearForm(event) {
    setUsername('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setRole('');
  }

  function handleSignUp(event) {
    event.preventDefault();

    if (!username || !password || !firstname || !lastname || !role) {
      alert('Please fill in all the required info');
      return;
    }

    const UserData = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      role: role,
    };

    AuthService.register(
      UserData.username,
      UserData.password,
      UserData.firstname,
      UserData.lastname,
      UserData.role
    ).then(
      (data) => {
        if (data.success) {
          navigate('/staffs');
          toast('Create Staff Successfully');
        } else {
          toast.error(data.message);
        }
      },
      (error) => {
        toast.error('Server Error!');
      }
    );
  }

  return (
    <div className='container'>
      <h2 className='text-center mt-5'>Add New Staff</h2>
      <form noValidate className='signup-form' onSubmit={handleSignUp}>
      <div className='form-group text-end pb-3' onChange={onChangeRole}>
        <a href="/staffs" className='btn btn-outline-primary me-2'>Cancel</a>
        <input
          className='btn btn-primary'
          type='submit'
          value='Add Staff'
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
                onChange={onChangeFirstName}
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
                onChange={onChangeLastName}
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
                <input className="form-check-input" type="radio" name="role" id="server" value="SERVER"/>
                <label className="form-check-label" htmlFor="server">Server</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="role" id="chef" value="CHEF"/>
                <label className="form-check-label" htmlFor="chef">Chef</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="role" id="manager" value="MANAGER"/>
                <label className="form-check-label" htmlFor="manager">Manager</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="role" id="owner" value="OWNER"/>
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

export default AddStaffPage;
