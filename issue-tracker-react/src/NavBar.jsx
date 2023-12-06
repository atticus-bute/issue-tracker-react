import { NavLink } from "react-router-dom";
import axios from 'axios';
export default function NavBar({ auth, onLogout, reloadTick, setReloadTick }) {

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
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Bugs
                    </a>
                    <ul className="dropdown-menu">
                      <li><NavLink className="nav-link dropdown-item text-decoration-none" to="/bugs">All Bugs</NavLink></li>
                      <li><NavLink className="nav-link dropdown-item text-decoration-none" to="/bug/report">Report Bug</NavLink></li>
                    </ul>
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
                  <div className="d-flex">
                    <li className="nav-item">
                      <NavLink className="nav-link" onClick={()=>setReloadTick(reloadTick+1)} to={`/user/${auth._id}`} >{auth.email}</NavLink>
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