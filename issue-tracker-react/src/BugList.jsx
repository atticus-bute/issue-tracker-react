import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import BugSummary from './BugSummary.jsx';
import BugEditor from './BugEditor.jsx';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';

export default function BugList({ showToast }) {
  const [bugs, setBugs] = useState([]);
  const [newBug, setNewBug] = useState({ id: nanoid(), editMode: false, title: '', description: '', stepsToReproduce: '' });
  const [updateCounter, setUpdateCounter] = useState(0);

  function onAddBug() {
    showToast('Bug added successfully', 'success');
    const newBugs = [...bugs];
    newBugs.push(newBug);
    setBugs(newBugs);
    setNewBug({ id: nanoid(), title: '', description: '', stepsToReproduce: '' });
  }

  function addEditMode(budId) {
    if (bugs.length) {
      const newBugs = [...bugs];
      const bugIndex = newBugs.findIndex(bug => bug._id === budId);
      newBugs[bugIndex].editMode = true;
      setBugs(newBugs);
    }
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/bugs/list`, { withCredentials: true })
      .then(response => {
        console.log('Getting bugs');
        setBugs(response.data);
      })
      .catch(error => {
        console.log('Error getting bugs');
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className='container'>
        {!bugs.length
          ? <h2 className='display-2'>No bugs to display</h2> :
          <>
            <span className='display-3 text-primary me-4'>Bug List</span>
            <span className='fs-3 mb-4 badge rounded-circle text-bg-warning'>{bugs.length}</span>
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
                    <BugSummary bug={bug} addEditMode={addEditMode} key={bug.id}  />
                  </div>
                }
              </>
            )}
          </>
        }
        <div className="card col-4 mx-1">
          <div className="card-body">
            <label htmlFor="txtBugTitle" className='form-label'>Title:</label>
            <input type="text" className='form-control' name='txtBugTitle' value={newBug.title} onChange={(evt) => setNewBug({ id: newBug.id, title: evt.target.value, description: newBug.description, stepsToReproduce: newBug.stepsToReproduce })} />
            <label htmlFor="txtBugDescription" className='form-label'>Description:</label>
            <input type="text" className='form-control' name='txtBugDescription' value={newBug.description} onChange={(evt) => setNewBug({ id: newBug.id, title: newBug.title, description: evt.target.value, stepsToReproduce: newBug.stepsToReproduce })} />
            <label htmlFor="txtBugSteps" className='form-label'>Steps to Reproduce:</label>
            <input type="text" className='form-control' name='txtBugSteps' value={newBug.stepsToReproduce} onChange={(evt) => setNewBug({ id: newBug.id, title: newBug.title, description: newBug.description, stepsToReproduce: evt.target.value })} />
            <button className='btn btn-success mt-3' onClick={onAddBug}>Add Bug</button>
          </div>
        </div>
      </div>
    </>
  )
}