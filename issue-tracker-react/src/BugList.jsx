import { useState } from 'react';
import { nanoid } from 'nanoid';
import BugSummary from './BugSummary.jsx';
import BugEditor from './BugEditor.jsx';

export default function BugList() {

  const [bugs, setBugs] = useState([{ id: nanoid(), editMode: false, title: 'Bug 1', description: 'This is a bug', stepsToReproduce: 'Click a button' },
  { id: nanoid(), editMode: false, title: 'Bug 2', description: 'This is another bug', stepsToReproduce: 'Click a button' },
  { id: nanoid(), editMode: false, title: 'Bug 3', description: 'This is a third bug', stepsToReproduce: 'Click a button' }
  ]);

  const [newBug, setNewBug] = useState({ id: nanoid(), title: '', description: '', stepsToReproduce: '' });

  function onAddBug() {
    const newBugs = [...bugs];
    newBugs.push(newBug);
    setBugs(newBugs);
    setNewBug({ id: nanoid(), title: '', description: '', stepsToReproduce: '' });
  }

  function onDeleteBug(bug) {
    const newBugs = [...bugs];
    const index = newBugs.indexOf(bug);
    newBugs.splice(index, 1);
    setBugs(newBugs);
  }

  function onEditBug(bug) {
    const newBugs = [...bugs];
    const index = newBugs.indexOf(bug);
    newBugs[index].editMode = true;
    setBugs(newBugs);
  }

  function onUpdateBug(updateBug) {
    const newBugs = [...bugs];
    for (let index = 0; index < newBugs.length; index++) {
     if(newBugs[index].id === updateBug.id){
      newBugs[index].title = updateBug.title;
      newBugs[index].description = updateBug.description;
      newBugs[index].stepsToReproduce = updateBug.stepsToReproduce;
      newBugs[index].editMode = false;
      setBugs(newBugs);
    }
    }
  }

  return (
    <>
      <div className='container'>
        <span className='display-3 text-primary me-4'>Bug List</span>
        <span className='fs-3 mb-4 badge rounded-circle text-bg-warning'>{bugs.length}</span>
        <br />
        {bugs.map(bug =>
          <>
            {bug.editMode
              ?
              <>
                <BugEditor bug={bug} key={bug.id} onUpdateTitle={(evt) => onUpdateTitle(evt, bug)} onUpdateBug={(evt) => onUpdateBug(evt, bug)} />
              </>
              :
              <div className='display-inline'>
                <BugSummary bug={bug} key={bug.id} />
                <button className='btn btn-warning btn-sm mx-1 mb-3' onClick={() => onEditBug(bug)} >Edit Bug</button>
                <button className='btn btn-danger btn-sm mx-1 mb-3' onClick={() => onDeleteBug(bug)} >Remove Bug</button>
              </div>}
          </>
        )}

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