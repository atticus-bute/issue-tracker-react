import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Route, Routes, NavLink } from 'react-router-dom';
import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';
import BugList from './BugList.jsx';
import UserList from './UserList.jsx';

function App() {
  const [screen, setScreen] = useState('home');
  const [login, setLogin] = useState(false);

  const [auth, setAuth] = useState(null);
  
useEffect(() => {
  if(localStorage) {
    const auth = localStorage.getItem('auth');
    if(auth) {
      setAuth(JSON.parse(auth));
    }
  }
}, []);

  function onLogin(auth) {
    setAuth(auth);
  }
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-success-subtle">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">Bug Tracker</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/bugs">Bugs</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/users">Users</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to='/login'>Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to='/register'>Register</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main className='flex-grow-1 bg-success-subtle'>
        <Routes>
          <Route path="/" element={<span className='display-5'>home</span>} />
          <Route path="/bugs" element={<BugList />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/login" element={<LoginForm />} onLogin={onLogin} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </main>
      <footer>
        <div className="container-fluid bg-success-subtle text-center p-3">
          <span className="text-dark">Bute, 2023</span>
        </div>
      </footer>
    </>
  );
}

export default App;
