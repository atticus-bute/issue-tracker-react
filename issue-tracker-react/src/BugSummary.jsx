import { useState } from 'react';
export default function BugSummary({bug}) {
//const [bug, setBug] = useState({title: 'Bug 1', description: 'This is a bug', stepsToReproduce: 'Click a button'})
  return(
    <>
      <div className="card col-2 m-1">
        <div className="card-body">
          <h5 className="card-title">{bug.title}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">{bug.description}</h6>
          <p className="card-text">{bug.stepsToReproduce}</p>
        </div>
      </div>
    </>
  );
}