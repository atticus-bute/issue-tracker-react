import { Link } from 'react-router-dom';
import moment from 'moment';
import { useState } from 'react';
export default function UserListItem({ user }) {
  return (
    <>
      <Link className="card m-1 text-decoration-none p-0" to={`/user/${user._id}`}>
        <div className="card-body">
          <h5 className="card-title fw-bold">{user.fullName}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">{user.email}</h6>
          {user.role.length ? (
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
        </div>
      </Link>
    </>
  );
}