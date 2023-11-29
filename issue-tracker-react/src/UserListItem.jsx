import { useState } from 'react';
export default function UserListItem({ user, onDeleteUser }) {
  //const [user, setUser] = useState({email: 'admin@example.com', password: 'password', givenName: 'Admin', familyName: 'User' })
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