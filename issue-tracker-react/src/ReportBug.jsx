import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function ReportBug({ showToast, auth }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stepsToReproduce, setStepsToReproduce] = useState('');
  const [error, setError] = useState('');
  const titleError = !title ? 'Title is required' : '';
  const descriptionError = !description ? 'Description is required' : '';
  const stepsToReproduceError = !stepsToReproduce ? 'Steps to reproduce are required' : '';

  function onReportBug(evt) {
    setError('');
    evt.preventDefault();
    if (titleError) {
      showToast(titleError, 'error');
      return;
    } else if (descriptionError) {
      showToast(descriptionError, 'error');
      return;
    } else if (stepsToReproduceError) {
      showToast(stepsToReproduceError, 'error');
      return;
    }
    axios.post(`${import.meta.env.VITE_API_URL}/api/bugs/new`, {
      title, description, stepsToReproduce
    }, { withCredentials: true })
      .then(() => {
        navigate('/bugs');
      })
      .catch(error => {
        const resError = error?.response?.data;
        console.log(resError);
        showToast(resError.message, 'error');
        if (resError) {
          //bad username or password
          console.log(resError);
          if (typeof resError === 'string') {
            showToast(error.response.data, 'error');
          } else if (resError.message) { //joi validation errors
            showToast(resError.message, 'error');
          } else if (resError.errors) {
            showToast(resError.errors[0].message, 'error');
          } else {
            showToast(error.response.data, 'error');
          }
        } else {
          showToast(error.message, 'error');
        }
      });
  }
  return (
    <>
      <div className='row'>
      {auth?.role.length > 0 ? <>
        <div className='col-3'></div>
        <div className="card col-6 m-1">
          <div className="card-body">
            <form >
              <label htmlFor="txtBugTitle" className='form-label fw-bold'>Title:</label>
              <input type="text" className='form-control mb-2' name='txtBugTitle' placeholder="Give the bug a short title" value={title} onChange={(evt) => setTitle(evt.target.value)} />
              <label htmlFor="txtBugDescription" className='form-label fw-bold'>Description:</label>
              <input type="text" className='form-control mb-2' name='txtBugDescription' placeholder='Give a detailed description of the bug' value={description} onChange={(evt) => setDescription(evt.target.value)} />
              <label htmlFor="txtBugSteps" className='form-label fw-bold'>Steps to Reproduce:</label>
              <input type="text" className='form-control mb-2' name='txtBugSteps' placeholder='Describe how to recreate this bug' value={stepsToReproduce} onChange={(evt) => setStepsToReproduce(evt.target.value)} />
              <button type='submit' className='mt-1 btn btn-success' onClick={(evt) => onReportBug(evt)}>Report Bug</button>
            </form>
          </div>
        </div>
        <div className='col-3'></div>
        </> : <h2 className='display-3'>You need permission to report a bug.</h2>}
      </div>
    </>
  );
}