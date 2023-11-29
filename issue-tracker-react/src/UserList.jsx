import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import UserListItem from './UserListItem.jsx';
import UserEditor from './UserEditor.jsx';
import axios from 'axios';

export default function UserList({ showToast }) {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ id: nanoid(), editMode: false, email: '', password: '', givenName: '', familyName: '', fullName: '' });
  const [deleteCounter, setDeleteCounter] = useState(0);

  function onAddUser() {
    const newUsers = [...users];
    newUsers.push(newUser);
    setUsers(newUsers);
    setNewUser({ id: nanoid(), email: '', password: '', givenName: '', familyName: '', fullName: '' });
    showToast('User added successfully', 'success');
  }

  function onDeleteUser(evt, userId) {
    // evt.preventDefault();
    axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, { withCredentials: true })
      .then(response => {
        setDeleteCounter(prevCount => prevCount + 1);
        showToast('User deleted successfully', 'success');
        console.log(response.data)
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/users/list`, { withCredentials: true })
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [deleteCounter]);
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
                    <UserListItem user={user} key={user.id} onDeleteUser={onDeleteUser} />
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