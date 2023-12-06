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

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    const search = evt.target.search.value;
    axios.get(`${import.meta.env.VITE_API_URL}/api/users/list`, { withCredentials: true, params: { keywords: search } })
      .then(response => {
        console.log('Searching users');
        if (response.data.length === 0) {
          showToast('No users found', 'info');
          return;
        }
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
        showToast('Error searching users', 'error');
      });
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
            <span className='fs-3 mb-4 badge rounded-circle text-bg-success'>{users.length}</span>
            <br />
            <form onSubmit={(evt) => onFormSubmit(evt)}>
              <div className="form-group input-group">
                <button className="btn btn-success" type="submit" id="button-addon1">Search</button>
                <input type="text" className="form-control" placeholder="Keywords" />
              </div>
              <div className="form-group row mt-2">
                <div className="d-flex flex-column col">
                  <label className="form-label">Min Age:</label>
                  <input type="number" className="form-control" id="minAge" name="minAge" min={0} placeholder="0" />
                </div>
                <div className="d-flex flex-column col">
                  <label className="form-label">Max Age:</label>
                  <input type="number" className="form-control" id="maxAge" name="maxAge" min={0} placeholder="0" />
                </div>
                <div className="d-flex flex-column col">
                  <label className="form-label mx-3">Role:</label>
                  <select className="form-select mx-3">
                    <option className='form-select'>Any</option>
                    <option className='form-select' value="Developer">Developer</option>
                    <option className='form-select' value="Business Analyst">Business Analyst</option>
                    <option className='form-select' value="Technical Manager">Technical Manager</option>
                    <option className='form-select' value="Quality Analyst">Quality Analyst</option>
                    <option className='form-select' value="Product Manager">Product Manager</option>
                  </select>
                </div>
                <div className="d-flex flex-column col">
                  <label className="form-label mx-3">Sort by:</label>
                  <select className="form-select mx-3">
                    <option className='form-select' value="givenName">Given Name</option>
                    <option className='form-select' value="familyName">Family Name</option>
                    <option className='form-select' value="role">Role</option>
                    <option className='form-select' value="newest">Newest</option>
                    <option className='form-select' value="oldest">Oldest</option>
                  </select>
                </div>
              </div>
            </form>
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