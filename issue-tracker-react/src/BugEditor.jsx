import { useState } from 'react';
export default function BugEditor({ bug }) {
const [editBug, setEditBug] = useState(bug);

function updateTitle(evt) {
  const newBug = {...editBug};
  newBug.title = evt.target.value;
  setEditBug(newBug);
}
function updateDescription(evt) {
  const newBug = {...editBug};
  newBug.description = evt.target.value;
  setEditBug(newBug);
}
function updateStepsToReproduce(evt) {
  const newBug = {...editBug};
  newBug.stepsToReproduce = evt.target.value;
  setEditBug(newBug);
}

function onClickEdit(bug) {
  bug.editMode = true;
}

  return(
    <>
      <div className="card col-2 m-1">
        <div className="card-body">
          <label htmlFor="txtBugTitle" className='form-label'>Title:</label>
          <input type="text" className='form-control' name='txtBugTitle' value={editBug.title} onChange={(evt) => updateTitle(evt)}  />
          <label htmlFor="txtBugDescription" className='form-label'>Description:</label>
          <input type="text" className='form-control' name='txtBugDescription' value={editBug.description} onChange={(evt) => updateDescription(evt)}/>
          <label htmlFor="txtBugSteps" className='form-label'>Steps to Reproduce:</label>
          <input type="text" className='form-control' name='txtBugSteps' value={editBug.stepsToReproduce} onChange={(evt) => updateStepsToReproduce(evt)}/>
          <button className='mt-1 btn btn-success'>Save Bug</button>
        </div>
      </div>
    </>
  );
}