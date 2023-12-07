import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
export default function UserSummary({ showToast, reloadTick, setReloadTick}) {
  const { userId } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, { withCredentials: true })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => { console.log(error) });
  }, [reloadTick]);
  
  return (
    <div className='row'>
      <div className='col-3'></div>
      <div className="card col-6 m-1 p-0">
        <div className="card-body">
          <h5 className="card-title fw-bold">{user.fullName}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">{user.email}</h6>
          {user.role?.length ? (
            user.role.map((role) => (
              <span key={role} className='badge bg-primary mx-1'>
                {role}
              </span>
            ))
          ) : (
            <span className='badge bg-danger mx-1'>No roles</span>
          )}
        </div>
        <div className='card-footer'>
          <span className="text-body-secondary">Registered {moment(user.creationDate).fromNow()}</span>
          <br />
            <Link className='mt-3 btn btn-small mx-2 btn-danger' to='/users'>Back</Link>
            <Link className='mt-3 btn btn-small btn-warning' to={`/user/${userId}/edit`} >Edit</Link>
        </div>
      </div>
      <div className='col-3'></div>
    </div>
  );
}