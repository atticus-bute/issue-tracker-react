import { Link } from 'react-router-dom';
import moment from 'moment';
import { useState } from 'react';
export default function BugSummary({ bug, addEditMode }) {
  function onClickEdit(bug) {
    addEditMode(bug._id);
  }
  return (
    <>
      <div className="card col-2 m-1">
        <div className="card-body">
          <h5 className="card-title fw-bold fst-italic">{bug.title}</h5>
          <span className={bug.classification === 'unclassified' ? 'badge bg-warning' : bug.classification === 'unapproved' ? 'badge bg-danger' : bug.classification === 'duplicate' ? 'badge bg-danger' : 'badge bg-success'}>{bug.classification}</span>
          <span className={bug.closed == true ? 'badge bg-success mx-2' : 'badge bg-danger mx-2'}>{bug.closed ? 'open' : 'closed'}</span>
        </div>
        <div className='card-footer'>
          <p className="text-body-secondary">Author: {bug.createdBy.fullName}</p>
          <span className="text-body-secondary">{moment(bug.creationDate).format('MMM Do YYYY')}</span>
        </div>
      </div>
    </>
  );
}