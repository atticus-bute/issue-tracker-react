import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import BugListItem from './BugListItem.jsx';
import BugEditor from './BugEditor.jsx';
import axios from 'axios';

export default function BugList({ auth, showToast }) {
  const [bugs, setBugs] = useState([]);
  const [newBug, setNewBug] = useState({ id: nanoid(), editMode: false, title: '', description: '', stepsToReproduce: '' });
  const [loading, setLoading] = useState(false);

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    const search = evt.target.search.value;
    axios.get(`${import.meta.env.VITE_API_URL}/api/bugs/list`, { withCredentials: true, params: { keywords: search } })
      .then(response => {
        console.log('Searching bugs');
        if (response.data.length === 0) {
          showToast('No bugs found', 'info');
          return;
        }
        setBugs(response.data);
      })
      .catch(error => {
        console.log(error);
        showToast('Error searching bugs', 'error');
      });
  }

  useEffect(() => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_API_URL}/api/bugs/list`, { withCredentials: true })
      .then(response => {
        console.log('Getting bugs');
        setBugs(response.data);
      })
      .catch(error => {
        console.log(error);
        showToast('Error getting bugs', 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className='container'>
        {loading && <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>}
        {!bugs.length
          ? <h2 className='display-3'>No bugs found.</h2> :
          <>
            <span className='display-3 text-dark me-4'>Bug List</span>
            <span className='fs-3 mb-4 badge rounded-circle text-bg-success'>{bugs.length}</span>
            <br />
            <form onSubmit={(evt) => onFormSubmit(evt)}>
              <div className="form-group input-group">
                <button className="btn btn-success" type="submit" id="button-addon1">Search</button>
                <input type="text" className="form-control" placeholder="Keywords" />
              </div>
              <div className="form-group row mt-2">
                <div className="d-flex flex-column col">
                  <label className="form-label">Min Age:</label>
                  <input type="number" className="form-control" id="minAge" name="minAge" min={0} placeholder="0" />
                </div>
                <div className="d-flex flex-column col">
                  <label className="form-label">Max Age:</label>
                  <input type="number" className="form-control" id="maxAge" name="maxAge" min={0} placeholder="0" />
                </div>
                <div className="d-flex flex-column col">
                  <label className="form-label mx-3">Classification:</label>
                  <select className="form-select mx-3">
                    <option className='form-select'>Any</option>
                    <option className='form-select' value="unclassified">Unclassified</option>
                    <option className='form-select' value="approved">Approved</option>
                    <option className='form-select' value="unapproved">Unapproved</option>
                    <option className='form-select' value="duplicate">Duplicate</option>
                  </select>
                </div>

                <div className="d-flex flex-column col">
                  <label className="form-label mx-3">Sort by:</label>
                  <select className="form-select mx-3">
                    <option className='form-select' value="newest">Newest</option>
                    <option className='form-select' value="oldest">Oldest</option>
                    <option className='form-select' value="title">Title</option>
                    <option className='form-select' value="classification">Classification</option>
                    <option className='form-select' value="assignedTo">Assigned To</option>
                    <option className='form-select' value="createdBy">Reported By</option>
                  </select>
                </div>
                <div className="d-flex flex-column col">
                  <label className="form-label mx-3 invisible">Closed:</label>
                  <input type="checkbox" className="btn-check" id="btncheckClosed" autoComplete="off" />
                  <label className="btn btn-outline-success" htmlFor="btncheckClosed">Show Closed Bugs</label>
                </div>
              </div>
            </form>
            <div className="row">
              {bugs.map(bug =>
                <>
                  {bug.editMode
                    ?
                    <>
                      <BugEditor bug={bug} key={bug.id} />
                    </>
                    :
                    <div className='col-3'>
                      <BugListItem bug={bug} key={bug.id} />
                    </div>
                  }
                </>
              )}
            </div>
          </>
        }
      </div>
    </>
  )
}