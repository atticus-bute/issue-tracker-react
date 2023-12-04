import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import UserListItem from './UserListItem.jsx';
import UserEditor from './UserEditor.jsx';
import axios from 'axios';

export default function UserList({ auth, showToast }) {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ id: nanoid(), editMode: false, email: '', password: '', givenName: '', familyName: '', fullName: '' });
  const [loading, setLoading] = useState(false);

  function onDeleteUser(evt, userId) {
    // evt.preventDefault();
    axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, { withCredentials: true })
      .then(response => {
        showToast('User deleted successfully', 'success');
        console.log(response.data)
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_API_URL}/api/users/list`, { withCredentials: true })
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
        showToast('Error getting users', 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      <div className='container'>
      {loading && <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>}
        {!users.length
          ? <h2 className='display-2'>No users to display</h2> :
          <>
            <span className='display-3 text-dark me-4'>User List</span>
            <span className='fs-3 mb-4 badge rounded-circle text-bg-secondary'>{users.length}</span>
            <br />
            {users.map(user =>
              <>
                {user.editMode
                  ?
                  <>
                    <UserEditor user={user} key={user.id} onDeleteUser={onDeleteUser} />
                  </>
                  :
                  <div className='d-inline'>
                    <UserListItem user={user} key={user.id} />
                  </div>
                }
              </>
            )}
          </>
        }
      </div>
    </>
  )
}