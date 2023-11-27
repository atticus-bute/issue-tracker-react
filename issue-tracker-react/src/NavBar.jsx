import { NavLink } from "react-router-dom";
import axios from 'axios';

export default function NavBar({ auth, onLogout }) {

  function onClickLogout(evt) {
    evt.preventDefault();
    axios.post(`${import.meta.env.VITE_API_URL}/api/users/logout`, {}, { withCredentials: true })
      .then(response => {
        onLogout();
      })
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">Bug Tracker</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {auth &&
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/bugs">Bugs</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/users">Users</NavLink>
                  </li>
                </>}
              {!auth &&
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to='/login'>Login</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to='/register'>Register</NavLink>
                  </li>
                </>
              }
              {auth &&
                <>
                  <div className="nav-item-group">
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/profile">{auth.email}</NavLink>
                    </li>
                    <li className="nav-item">
                      <button className="nav-link" to="/logout" onClick={(evt) => onClickLogout(evt)}>Logout</button>
                    </li>
                  </div>
                </>
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}