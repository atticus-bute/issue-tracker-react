import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
export default function UserSummary({ showToast, reloadTick, setReloadTick, auth, navigate }) {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [myself, setMyself] = useState(false);

  function onDeleteUser(evt, userId) {
    evt.preventDefault();
    axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, { withCredentials: true })
      .then(response => {
        navigate('/users');
        showToast('User deleted successfully', 'success');
        console.log(response.data)
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, { withCredentials: true })
      .then(response => {
        setUser(response.data);
        setMyself(false);
        if (response.data._id === auth._id) {
          setMyself(true);
          console.log('my bug');
        }
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
          {auth?.role.includes('Technical Manager') ? <Link className='mt-3 btn btn-small btn-warning' to={`/user/${userId}/edit`} >Edit</Link> : myself ? <Link className='mt-3 btn btn-small btn-warning' to={`/user/me/edit`} >Edit</Link> : <Link className='mt-3 btn btn-small btn-warning disabled' to={`/user/me/edit`} >Edit</Link>}
          {auth?.role.includes('Technical Manager') && <Link className='mt-3 btn btn-small mx-2 btn-outline-danger' data-bs-toggle="modal" data-bs-target="#deleteModal">Delete User</Link>}
        </div>
        <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="deleteModalLabel">Are you sure?</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                Delete user #{user._id}, {user.fullName}?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={(evt) => onDeleteUser(evt, user._id)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-3'></div>
    </div>
  );
}