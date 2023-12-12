import { Link } from 'react-router-dom';
import moment from 'moment';
import { useState } from 'react';
export default function BugSummary({ bug }) {
  return (
    <>
      <Link className="card m-1 text-decoration-none  p-0" to={`/bug/${bug._id}`}>
        <div className="card-body">
          <h5 className="card-title fw-bold fst-italic">{bug.title}</h5>
          <span className={bug.classification === 'unclassified' ? 'badge bg-warning mx-1' : bug.classification === 'unapproved' ? 'badge bg-danger mx-1' : bug.classification === 'duplicate' ? 'badge bg-danger mx-1' : 'badge bg-success mx-1'}>{bug.classification}</span>
          <span className={bug.closed == true ? 'badge bg-success mx-1' : 'badge bg-danger mx-1'}>{bug.closed ? 'closed' : 'open'}</span>
          {bug.assignedToUserName && <span className='badge bg-warning mx-1'>{bug.assignedToUserName}</span>}
        </div>
        <div className='card-footer'>
          <p className="text-body-secondary">Author: {bug.createdBy.fullName}</p>
          <span className="text-body-secondary">Reported {moment(bug.creationDate).fromNow()}</span>
        </div>
      </Link>
    </>
  );
}