import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function UserEditor({ showToast }) {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState([]);

  function onUserUpdate(evt) {
    evt.preventDefault();
    const updatedUser = {
      givenName: givenName,
      familyName: familyName,
      fullName: fullName,
      password: password,
      role: role
    }
    axios.put(`${import.meta.env.VITE_API_URL}/api/users/${userId}`,
      { ...updatedUser },
      { withCredentials: true })
      .then(response => {
        console.log(response.data);
        navigate(`/user/${userId}`);
      })
      .catch(error => {
        console.log(error)
      });
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, { withCredentials: true })
    .then(response => {
      setUser(response.data);
      setGivenName(response.data.givenName);
      setFamilyName(response.data.familyName);
      setFullName(response.data.fullName);
      setPassword(response.data.password);
      setRole(response.data.role);
    })
    .catch(error => { console.log(error) });
  }, []);

  return (
    <>
      <div className='row'>
        <div className='col-3'></div>
        <div className="card col-6">
          <div className="card-body">
            <form onSubmit={(evt) => onUserUpdate(evt)}>
              <label htmlFor="txtUserGivenName" className='form-label'>Given Name:</label>
              <input type="text" className='form-control' name='txtUserGivenName' value={givenName} onChange={(evt) => setGivenName(evt.target.value)} />
              <label htmlFor="txtUserFamilyName" className='form-label'>Family Name:</label>
              <input type="text" className='form-control' name='txtUserFamilyName' value={familyName} onChange={(evt) => setFamilyName(evt.target.value)} />
              <label htmlFor="txtUserFullName" className='form-label'>Full Name:</label>
              <input type="text" className='form-control' name='txtUserFullName' value={fullName} onChange={(evt) => setFullName(evt.target.value)} />
              <label htmlFor="txtUserPassword" className='form-label'>Password:</label>
              <input type="password" className='form-control' name='txtUserPassword' value={password} onChange={(evt) => setPassword(evt.target.value)} />
              <Link to={`/user/${user._id}`} className='mt-1 mx-1 btn btn-danger'>Back</Link>
              <button type='submit' className='mt-1 btn btn-success'>Save User</button>
            </form>
          </div>
        </div>
        <div className='col-3'></div>
      </div>
    </>
  );
}