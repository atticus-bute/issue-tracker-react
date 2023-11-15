import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

/* <span>{screen}</span>
<br />
<span>logged in: {login}</span>
<br /> */

function App() {
  const [screen, setScreen] = useState('home');
  const [login, setLogin] = useState(false);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-success-subtle">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Bug Tracker</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Bugs</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Users</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">Register</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default App;
