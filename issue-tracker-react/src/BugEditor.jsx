import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function BugEditor({ showToast }) {
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
      { ...updatedBug },
      { withCredentials: true })
      .then(response => {
        console.log(response.data);
        navigate(`/bug/${bugId}`);
      })
      .catch(error => {
        console.log(error)
        const resError = error?.response?.data;
          console.log(resError);
          showToast(resError.message, 'error');
          if (resError) {
            console.log(resError);
            if (typeof resError === 'string') {
              showToast(error.response.data, 'error');
            } else if (resError.message) { //joi validation errors
              showToast(resError.message.details[0].message, 'error');
            }
          }
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
        <div className='col-1'></div>
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
        <div className='col-4 flex-column'>
          <form className='card card-body my-1'>
            <label className='form-labe fw-bold' htmlFor="inputGroupSelectClassification">Classification:</label>
            <div className="input-group">
              <select className="form-select" id="inputGroupSelectClassification">
                <option className='form-select' value='unclassified'>Unclassified</option>
                <option className='form-select' value="approved">Approved</option>
                <option className='form-select' value="unapproved">Unapproved</option>
                <option className='form-select' value="duplicate">Duplicate</option>
              </select>
              <button className="btn btn-outline-success" type="submit">Classify</button>
            </div>
          </form>
          <form className='card card-body my-1'>
            <label className='form-label fw-bold' htmlFor="inputGroupSelectAssigned">Assigned to:</label>
            <div className="input-group">
              <select className="form-select" id="inputGroupSelectAssigned">
                <option className='form-select' value='Unassigned'>Unassigned</option>
                <option className='form-select' value="Arty">Arty</option>
              </select>
              <button className="btn btn-outline-success" type="submit">Assign</button>
            </div>
          </form>
          <form className='card card-body my-1'>
            <label className='form-label fw-bold' htmlFor="inputGroupSelectClosed">Status:</label>
            <div className="input-group">
              <select className="form-select" id="inputGroupSelectClosed">
                <option className='form-select' value='false'>Open</option>
                <option className='form-select' value="true">Closed</option>
              </select>
              <button className="btn btn-outline-success" type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}