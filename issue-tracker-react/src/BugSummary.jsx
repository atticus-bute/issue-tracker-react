import {Link} from 'react-router-dom';

import { useState } from 'react';
export default function BugSummary({bug, addEditMode}) {
//const [bug, setBug] = useState({title: 'Bug 1', description: 'This is a bug', stepsToReproduce: 'Click a button'})
function onClickEdit(bug) {
 addEditMode(bug._id);
}
  return(
    <>
      <div className="card col-2 m-1">
        <div className="card-body">
          <h5 className="card-title">{bug.title}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">{bug.description}</h6>
          <p className="card-text">{bug.stepsToReproduce}</p>
        </div>
        <button onClick={()=>onClickEdit(bug)} className='btn btn-warning btn-sm mx-5 mb-3' >Edit Bug</button>
      </div>
    </>
  );
}