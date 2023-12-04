import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import { useState, useEffect } from 'react';
export default function BugSummary() {
  const { bugId } = useParams();
  const [bug, setBug] = useState({});

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/bugs/${bugId}`, { withCredentials: true })
      .then(response => {
        setBug(response.data);
      })
      .catch(error => { console.log(error) });
  }, []);

  return (
      <div className='row'>
        <div className='col-3'></div>
        <div className="card col-6 m-1">
          <div className="card-body">
            <h5 className="card-title fw-bold fst-italic">{bug.title}</h5>
            <h6 className="card-subtitle text-body-secondary">{bug.description}</h6>
            <span className={bug.classification === 'unclassified' ? 'badge bg-warning' : bug.classification === 'unapproved' ? 'badge bg-danger' : bug.classification === 'duplicate' ? 'badge bg-danger' : 'badge bg-success'}>{bug.classification}</span>
            <span className={bug.closed == true ? 'badge bg-success mx-2' : 'badge bg-danger mx-2'}>{bug.closed ? 'closed' : 'open'}</span>
            <p className="card-text mt-3">{bug.stepsToReproduce}</p>
          </div>
          <div className='card-footer'>
            <p className="text-body-secondary">Author: {bug.createdBy?.fullName}</p>
            <span className="text-body-secondary">{moment(bug.creationDate).fromNow()}</span>
            <br />
            <Link className='mt-3 btn btn-small mx-2 btn-danger' to='/bugs'>Back</Link>
            <Link className='mt-3 btn btn-small btn-warning' to={`/bug/${bugId}/edit`} >Edit</Link>
          </div>
        </div>
        <div className='col-3'></div>
      </div>
  );
}