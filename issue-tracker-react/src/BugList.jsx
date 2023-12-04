import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import BugListItem from './BugListItem.jsx';
import BugEditor from './BugEditor.jsx';
import axios from 'axios';

export default function BugList({ auth, showToast }) {
  const [bugs, setBugs] = useState([]);
  const [newBug, setNewBug] = useState({ id: nanoid(), editMode: false, title: '', description: '', stepsToReproduce: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_API_URL}/api/bugs/list`, { withCredentials: true })
      .then(response => {
        console.log('Getting bugs');
        setBugs(response.data);
      })
      .catch(error => {
        console.log(error);
        showToast('Error getting bugs', 'error');
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
        {!bugs.length
          ? <h2 className='display-3'>No bugs found.</h2> :
          <>
            <span className='display-3 text-dark me-4'>Bug List</span>
            <span className='fs-3 mb-4 badge rounded-circle text-bg-secondary'>{bugs.length}</span>
            <br />
            {bugs.map(bug =>
              <>
                {bug.editMode
                  ?
                  <>
                    <BugEditor bug={bug} key={bug.id} />
                  </>
                  :
                  <div className='display-inline'>
                    <BugListItem bug={bug} key={bug.id} />
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