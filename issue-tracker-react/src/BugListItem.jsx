import { Link } from 'react-router-dom';
import moment from 'moment';
import { useState } from 'react';
export default function BugSummary({ bug }) {
  return (
    <>
      <Link className="card m-1 text-decoration-none  p-0" to={`/bug/${bug._id}`}>
        <div className="card-body">
          <h5 className="card-title fw-bold fst-italic">{bug.title}</h5>
          <span className={bug.classification === 'unclassified' ? 'badge bg-warning' : bug.classification === 'unapproved' ? 'badge bg-danger' : bug.classification === 'duplicate' ? 'badge bg-danger' : 'badge bg-success'}>{bug.classification}</span>
          <span className={bug.closed == true ? 'badge bg-success mx-2' : 'badge bg-danger mx-2'}>{bug.closed ? 'closed' : 'open'}</span>
        </div>
        <div className='card-footer'>
          <p className="text-body-secondary">Author: {bug.createdBy.fullName}</p>
          <span className="text-body-secondary">Reported {moment(bug.creationDate).fromNow()}</span>
        </div>
      </Link>
    </>
  );
}