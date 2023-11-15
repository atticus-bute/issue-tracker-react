import { useState } from 'react';
export default function UserSummary({user}) {
//const [user, setUser] = useState({email: 'admin@example.com', password: 'password', givenName: 'Admin', familyName: 'User' })
  return(
    <>
      <div className="card col-2 m-1">
        <div className="card-body">
          <h5 className="card-title">{user.fullName}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">{user.email}</h6>
        </div>
      </div>
    </>
  );
}