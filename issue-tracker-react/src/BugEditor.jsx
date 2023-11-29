import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function BugEditor({showToast}) {
  const navigate = useNavigate();
  const { bugId } = useParams();
  const [bug, setBug] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stepsToReproduce, setStepsToReproduce] = useState('');

  function onBugUpdate(evt) {
    evt.preventDefault();
    const updatedBug = {
      title: title,
      description: description,
      stepsToReproduce: stepsToReproduce
    }
    axios.put(`${import.meta.env.VITE_API_URL}/api/bugs/${bugId}`,
    {...updatedBug},
    { withCredentials: true })
      .then(response => {
        console.log(response.data);
        navigate(`/bug/${bugId}`);
      })
      .catch(error => {
        console.log(error)
      });
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/bugs/${bugId}`, { withCredentials: true })
      .then(response => {
        setBug(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setStepsToReproduce(response.data.stepsToReproduce);
      })
      .catch(error => { console.log(error) });
  }, []);

  return (
    <>
      <div className='row'>
        <div className='col-3'></div>
        <div className="card col-6 m-1">
          <div className="card-body">
            <form onSubmit={(evt) => onBugUpdate(evt)}>
              <label htmlFor="txtBugTitle" className='form-label fw-bold'>Title:</label>
              <input type="text" className='form-control mb-2' name='txtBugTitle' value={title} onChange={(evt) => setTitle(evt.target.value)} />
              <label htmlFor="txtBugDescription" className='form-label fw-bold'>Description:</label>
              <input type="text" className='form-control mb-2' name='txtBugDescription' value={description} onChange={(evt) => setDescription(evt.target.value)} />
              <label htmlFor="txtBugSteps" className='form-label fw-bold'>Steps to Reproduce:</label>
              <input type="text" className='form-control mb-2' name='txtBugSteps' value={stepsToReproduce} onChange={(evt) => setStepsToReproduce(evt.target.value)} />
              <Link to={`/bug/${bug._id}`} className='mt-1 mx-1 btn btn-danger'>Back</Link>
              <button type='submit' className='mt-1 btn btn-success'>Save Bug</button>
            </form>
          </div>
        </div>
        <div className='col-3'></div>
      </div>
    </>
  );
}