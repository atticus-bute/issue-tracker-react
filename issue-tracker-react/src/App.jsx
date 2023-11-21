import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Route, Routes, NavLink, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';
import BugList from './BugList.jsx';
import UserList from './UserList.jsx';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [screen, setScreen] = useState('home');
  const [loggedIn, setLoggedIn] = useState();
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage) {
      const auth = localStorage.getItem('auth');
      if (auth) {
        setAuth(JSON.parse(auth));
        console.log(auth);
      }
    }
  }, []);

  useEffect(() => {
    const loggedInEmail = localStorage.getItem('loggedIn');
    if (loggedInEmail) {
      setLoggedIn(loggedInEmail);
    }
  }, []);

  function showToast(message, type) {
    toast(message, {
      type: type,
      position: 'bottom-right',
      autoClose: 2500,
      closeOnClick: true,
    });
  }

  function onLogin(auth, response) {
    setAuth(auth);
    setLoggedIn(response.data.email);
    localStorage.setItem('loggedIn', response.data.email);
    navigate('/bugs/list');
    showToast('Login successful', 'success');
  }

  function onLogout() {
    setAuth(null);
    setLoggedIn();
    localStorage.removeItem('loggedIn');
    navigate('/login');
    showToast('Logout successful', 'success');
  }

  return (
    <>
      <header>
        <NavBar loggedIn={loggedIn} onLogout={onLogout} />
      </header>
      <main className='flex-grow-1 bg-success-subtle'>
        <Routes>
          <Route path="/" element={loggedIn ?
            <span className='display-5'>Welcome, {loggedIn}!</span> :
            <span className='display-5'>Please Login</span>
          } />
          <Route path="/bugs" element={<BugList />} />
          <Route path="/users" element={<UserList showToast={showToast} />} />
          <Route path="/login" element={<LoginForm onLogin={onLogin}/>} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
        <ToastContainer />
      </main>
      <Footer/>
    </>
  );
}

export default App;