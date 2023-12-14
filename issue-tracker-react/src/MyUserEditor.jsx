import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function MyUserEditor({ showToast, auth }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState([]);
  const [myself, setMyself] = useState(false);

  function onUserUpdate(evt) {
    evt.preventDefault();
    if (!givenName || !familyName || !fullName || !password) {
      showToast('Please fill all fields', 'error');
      return;
    }
    if (password.length < 7) {
      showToast('Password must be at least 7 characters', 'error');
      return;
    }
    const updatedUser = {
      givenName: givenName,
      familyName: familyName,
      fullName: fullName,
      password: password,
      role: roles
    }
    axios.put(`${import.meta.env.VITE_API_URL}/api/users/me`,
      { ...updatedUser },
      { withCredentials: true })
      .then(response => {
        console.log(response.data);
        navigate(`/user/me`);
      })
      .catch(error => {
        console.log(error)
        const resError = error?.response?.data;
        console.log(resError);
        showToast(resError.message, 'error');
        if (resError) {
          console.log(resError);
          if (typeof resError === 'string') {
            showToast(error.response.data, 'error');
          } else if (resError.message) { //joi validation errors
            showToast(resError.message.details[0].message, 'error');
          }
        }
      });
  }
  const handleRoleChange = (roleName) => {
    const updatedRoles = roles.includes(roleName)
      ? roles.filter(role => role !== roleName)
      : [...roles, roleName];
    setRoles(updatedRoles);
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/users/me`, { withCredentials: true })
      .then(response => {
        setUser(response.data);
        setGivenName(response.data.givenName);
        setFamilyName(response.data.familyName);
        setFullName(response.data.fullName);
        setPassword('');
        setRoles(response.data.role);
        setMyself(false);
        if (response.data._id === auth?._id) {
          setMyself(true);
          console.log('my bug');
        }
      })
      .catch(error => { console.log(error) });
  }, []);

  return (
    <>
      <div className='row'>
        <div className='col-1'></div>
        <div className="card col-6 m-1">
          <div className="card-body">
            <form onSubmit={(evt) => onUserUpdate(evt)}>
              <label htmlFor="txtUserGivenName" className='form-label'>Given Name:</label>
              <input type="text" className='form-control' name='txtUserGivenName' value={givenName} onChange={(evt) => setGivenName(evt.target.value)} />
              <label htmlFor="txtUserFamilyName" className='form-label'>Family Name:</label>
              <input type="text" className='form-control' name='txtUserFamilyName' value={familyName} onChange={(evt) => setFamilyName(evt.target.value)} />
              <label htmlFor="txtUserFullName" className='form-label'>Full Name:</label>
              <input type="text" className='form-control' name='txtUserFullName' value={fullName} onChange={(evt) => setFullName(evt.target.value)} />
              <label htmlFor="txtUserPassword" className='form-label'>Password:</label>
              <input type="password" className='form-control' name='txtUserPassword' onChange={(evt) => setPassword(evt.target.value)} />
              <Link to={`/user/${user._id}`} className='mt-1 mx-1 btn btn-danger'>Back</Link>
              <button type='submit' className='mt-1 btn btn-success'>Save User</button>
            </form>
          </div>
        </div>
        <div className='col-4'>
          <form className="card card-body my-1 p-0 disabled">
            <div className="card-header">User Roles:</div>
            {['Developer', 'Quality Analyst', 'Business Analyst', 'Product Manager', 'Technical Manager'].map((roleName, index) => (
              <div key={index} className="form-check form-switch m-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id={`flexSwitchCheckRole${index}`}
                  checked={roles.includes(roleName)}
                  onChange={() => handleRoleChange(roleName)}
                  disabled={!auth?.role.includes('Technical Manager')}
                />
                <label className="form-check-label" htmlFor={`flexSwitchCheckRole${index}`}>
                  {roleName}
                </label>
              </div>
            ))}
          </form>
        </div>
      </div>
    </>
  );
}