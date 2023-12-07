import { Link, useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import { useState, useEffect } from 'react';
export default function BugSummary({auth, showToast, reloadTick, setReloadTick}) {
  const { bugId } = useParams();
  const navigate = useNavigate();
  const [bug, setBug] = useState({});
  const [newComment, setNewComment] = useState('');

  function onAddComment(evt) {
    evt.preventDefault();
    if (newComment === '') {
      showToast('Comment cannot be empty', 'error');
      return;
    }
    axios.put(`${import.meta.env.VITE_API_URL}/api/bugs/${bugId}/comment/new`,
    {comment: newComment},
    { withCredentials: true })
      .then(response => {
        console.log(response.data);
        setReloadTick(reloadTick + 1);
        setNewComment('');
      })
      .catch(error => {
        console.log(error)
      });
      
  }
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/bugs/${bugId}`, { withCredentials: true })
      .then(response => {
        setBug(response.data);
      })
      .catch(error => { console.log(error) });
  }, [reloadTick]);

  return (
    <div className='row'>
      <div className='col-3'></div>
      <div className="card col-6 m-1 p-0">
        <div className="card-body">
          <h5 className="card-title fw-bold fst-italic">{bug.title}</h5>
          <h6 className="card-subtitle text-body-secondary">{bug.description}</h6>
          <span className={bug.classification === 'unclassified' ? 'badge bg-warning' : bug.classification === 'unapproved' ? 'badge bg-danger' : bug.classification === 'duplicate' ? 'badge bg-danger' : 'badge bg-success'}>{bug.classification}</span>
          <span className={bug.closed == true ? 'badge bg-success mx-2' : 'badge bg-danger mx-2'}>{bug.closed ? 'closed' : 'open'}</span>
          <p className="card-text mt-3">{bug.stepsToReproduce}</p>
        </div>
        <div className='card-footer'>
          <p className="text-body-secondary">Author: {bug.createdBy?.fullName}</p>
          <span className="text-body-secondary">Reported {moment(bug.creationDate).fromNow()}</span>
          <br />
          <Link className='mt-3 btn btn-small mx-2 btn-danger' to='/bugs'>Back</Link>
          <Link className='mt-3 btn btn-small btn-warning' to={`/bug/${bugId}/edit`} >Edit</Link>
        </div>
      </div>
      <div className="col-4"></div>
      <div className="col-4">
        <form onSubmit={(evt) => onAddComment(evt)}>
          <div className="form-group">
            <label htmlFor="comment" className='fw-bold'>Add Comment:</label>
            <div className="input-group">
              <textarea className="form-control" name="comment" id="comment" cols="30" rows="4" aria-label="With textarea" value={newComment} onChange={(evt)=> setNewComment(evt.target.value)}></textarea>
              <button className="btn btn-success" type='submit'>Post Comment</button>
            </div>
          </div>
        </form>
      </div>
      <div className="col-4"></div>
      {bug.comments &&
        bug.comments.map((comment) =>
          <>
            <div className='col-4'></div>
            <div className="card col-4 my-1 p-0">
              <div className="card-body">
                <p className="card-text">{comment.comment}</p>
              </div>
              <div className='card-footer d-flex justify-content-between'>
                <span className="text-body-secondary">{comment.author.fullName}</span>
                <span className="text-body-secondary">Posted {moment(comment.date).fromNow()}</span>
              </div>
            </div>
            <div className='col-4'></div>
          </>
        )
      }
      <div className='col-3'></div>
    </div>
  );
}