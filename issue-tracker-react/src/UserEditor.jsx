import { useState } from 'react';
export default function UserEditor({user, onUpdateUser}) {
  const [editUser, setEditUser] = useState(user);

  function updateGivenName(evt) {
    const newUser = {...editUser};
    newUser.givenName = evt.target.value;
    setEditUser(newUser);
  }
  function updateFamilyName(evt) {
    const newUser = {...editUser};
    newUser.familyName = evt.target.value;
    setEditUser(newUser);
  }
  function updateFullName(evt) {
    const newUser = {...editUser};
    newUser.fullName = evt.target.value;
    setEditUser(newUser);
  }
  function updatePassword(evt) {
    const newUser = {...editUser};
    newUser.password = evt.target.value;
    setEditUser(newUser);
  }
  return(
    <>
      <div className="card col-2">
        <div className="card-body">
          <label htmlFor="txtUserGivenName" className='form-label'>Given Name:</label>
          <input type="text" className='form-control' name='txtUserGivenName' value={editUser.givenName} onChange={(evt) => updateGivenName(evt)} />
          <label htmlFor="txtUserFamilyName" className='form-label'>Family Name:</label>
          <input type="text" className='form-control' name='txtUserFamilyName' value={editUser.familyName} onChange={(evt) => updateFamilyName(evt)} />
          <label htmlFor="txtUserFullName" className='form-label'>Full Name:</label>
          <input type="text" className='form-control' name='txtUserFullName' value={editUser.fullName} onChange={(evt) => updateFullName(evt)}/>
          <label htmlFor="txtUserPassword" className='form-label'>Password:</label>
          <input type="password" className='form-control' name='txtUserPassword' value={editUser.password} onChange={(evt) => updatePassword(evt)}/>
          <button onClick={(evt) => onUpdateUser(editUser)} className='mt-1 btn btn-success'>Save User</button>
        </div>
      </div>
    </>
  );
}