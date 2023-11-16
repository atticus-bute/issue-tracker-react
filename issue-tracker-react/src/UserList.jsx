import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import UserSummary from './UserSummary.jsx';
import UserEditor from './UserEditor.jsx';
import axios from 'axios';

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/bugs/list', { withCredentials: true })
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const [newUser, setNewUser] = useState({ id: nanoid(), editMode: false, email: '', password: '', givenName: '', familyName: '', fullName: '' });

  function onAddUser() {
    const newUsers = [...users];
    newUsers.push(newUser);
    setUsers(newUsers);
    setNewUser({ id: nanoid(), email: '', password: '', givenName: '', familyName: '', fullName: '' });
  }

  function onDeleteUser(user) {
    const newUsers = [...users];
    const index = newUsers.indexOf(user);
    newUsers.splice(index, 1);
    setUsers(newUsers);
  }

  function onEditUser(user) {
    const newUsers = [...users];
    const index = newUsers.indexOf(user);
    newUsers[index].editMode = true;
    setUsers(newUsers);
  }

  function onUpdateUser(updateUser) {
    const newUsers = [...users];
    for (let index = 0; index < newUsers.length; index++) {
      if (newUsers[index].id === updateUser.id) {
        newUsers[index].givenName = updateUser.givenName;
        newUsers[index].familyName = updateUser.familyName;
        newUsers[index].fullName = updateUser.fullName;
        newUsers[index].password = updateUser.password;
        newUsers[index].editMode = false;
        setUsers(newUsers);
      }
    }
  }
  return (
    <>
      <div className='container'>
        {!users.length
          ? <h2 className='display-2'>No users to display</h2> :
          <>
            <span className='display-3 text-primary me-4'>User List</span>
            <span className='fs-3 mb-4 badge rounded-circle text-bg-warning'>{users.length}</span>
            <br />
            {users.map(user =>
              <>
                {user.editMode
                  ?
                  <>
                    <UserEditor user={user} key={user.id} onUpdateUser={(evt) => onUpdateUser(evt, user)} />
                  </>
                  :
                  <div className='d-inline'>
                    <UserSummary user={user} key={user.id} />
                    <button className='btn btn-warning btn-sm mx-1 mb-3' onClick={() => onEditUser(user)} >Edit User</button>
                    <button className='btn btn-danger btn-sm mx-1 mb-3' onClick={() => onDeleteUser(user)} >Remove User</button>
                  </div>
                }
              </>
            )}
          </>
        }

        <div className="card col-4 mx-1">
          <div className="card-body">
            <label htmlFor="txtUserEmail" className='form-label'>Email:</label>
            <input type="text" className='form-control' name='txtUserEmail' value={newUser.email} onChange={(evt) => setNewUser({ id: newUser.id, email: evt.target.value, password: newUser.password, givenName: newUser.givenName, familyName: newUser.familyName, fullName: newUser.fullName })} />
            <label htmlFor="txtUserPassword" className='form-label'>Password:</label>
            <input type="password" className='form-control' name='txtUserPassword' value={newUser.password} onChange={(evt) => setNewUser({ id: newUser.id, email: newUser.email, password: evt.target.value, givenName: newUser.givenName, familyName: newUser.familyName, fullName: newUser.fullName })} />
            <label htmlFor="txtUserGivenName" className='form-label'>Given Name:</label>
            <input type="text" className='form-control' name='txtUserGivenName' value={newUser.givenName} onChange={(evt) => setNewUser({ id: newUser.id, email: newUser.email, password: newUser.password, givenName: evt.target.value, familyName: newUser.familyName, fullName: evt.target.value + ' ' + newUser.familyName })} />
            <label htmlFor="txtUserFamilyName" className='form-label'>Family Name:</label>
            <input type="text" className='form-control' name='txtUserFamilyName' value={newUser.familyName} onChange={(evt) => setNewUser({ id: newUser.id, email: newUser.email, password: newUser.password, givenName: newUser.givenName, familyName: evt.target.value, fullName: newUser.givenName + ' ' + evt.target.value })} />
            <button className='btn btn-success mt-3' onClick={onAddUser}>Add User</button>
          </div>
        </div>
      </div>
    </>
  )
}