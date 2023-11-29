import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
export default function UserSummary() {
  const { userId } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, { withCredentials: true })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => { console.log(error) });
  }, []);
  return (
    <>
      <div className="card col-2 m-1">
        <div className="card-body">
          <h5 className="card-title">{user.fullName}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">{user.email}</h6>
        </div>
        <button className='btn btn-danger btn-sm mx-5 mb-3' onClick={(evt) => onDeleteUser(evt, user._id)} >Remove User</button>
      </div>
    </>
  );
}