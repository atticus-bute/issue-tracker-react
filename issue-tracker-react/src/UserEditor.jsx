import { useState } from 'react';
export default function UserEditor() {
  const [user, setUser] = useState({email: 'admin@example.com', password: 'password', givenName: 'Admin', familyName: 'User' })
  return(
    <>
      <div className="card col-2">
        <div className="card-body">
          <label htmlFor="txtUserGivenName" className='form-label'>Given Name:</label>
          <input type="text" className='form-control' name='txtUserGivenName' />
          <label htmlFor="txtUserFamilyName" className='form-label'>Family Name:</label>
          <input type="text" className='form-control' name='txtUserFamilyName' />
          <label htmlFor="txtUserFullName" className='form-label'>Full Name:</label>
          <input type="text" className='form-control' name='txtUserFullName' />
          <label htmlFor="txtUserPassword" className='form-label'>Steps to Reproduce:</label>
          <input type="password" className='form-control' name='txtUserPassword' />
        </div>
      </div>
    </>
  );
}