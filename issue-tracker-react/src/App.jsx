import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { Route, Routes, NavLink, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';
import BugList from './BugList.jsx';
import UserList from './UserList.jsx';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BugListItem from './BugListItem.jsx';
import BugSummary from './BugSummary.jsx';
import BugEditor from './BugEditor.jsx';
import UserEditor from './UserEditor.jsx';
import UserSummary from './UserSummary.jsx';

function App() {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  function showToast(message, type) {
    toast(message, {
      type: type,
      position: 'bottom-right',
      autoClose: 2500,
      closeOnClick: true,
      pauseOnHover: false
    });
  }

  function onLogin(auth, response) {
    const now = new Date();
    const numHours = 1;
    const expirationTime = now.getTime() + numHours * 60 * 60 * 1000;
    const user = {
      ...auth.user,
      expiration: expirationTime
    };
    auth.user = user;
    console.log(`response.data.user: ${JSON.stringify(response.data.user)}`);
    setAuth(user);
    localStorage.setItem('auth', JSON.stringify(user));
    navigate('/bugs');
    showToast('Login successful', 'success');
  }

  function onLogout() {
    setAuth(null);
    localStorage.removeItem('auth');
    navigate('/login');
    showToast('Logout successful', 'success');
  }

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('auth'));
    const now = new Date();
    if (!currentUser) {
      return;
    }
    if (now.getTime() > currentUser.expiration) {
      axios.post(`${import.meta.env.VITE_API_URL}/api/users/logout`, {}, { withCredentials: true })
      .then(() => {
        onLogout();
      })
      return;
    }
    if (currentUser) {
      setAuth(currentUser);
      console.log(currentUser)
    }
  }, []);

  return (
    <>
      <header>
        <NavBar auth={auth} onLogout={onLogout} />
      </header>
      <main className='flex-grow-1 bg-success-subtle'>
        <Routes>
          <Route path="/" element={auth ?
            <span className='display-5'>Welcome, {auth.fullName}!</span> :
            <span className='display-5'>Please Login</span>
          } />
          <Route path="/bugs" element={<BugList auth={auth} showToast={showToast}/>} />
          <Route path="/users" element={<UserList auth={auth} showToast={showToast}/>} />
          <Route path="/login" element={<LoginForm onLogin={onLogin} />} />
          <Route path="/register" element={<RegisterForm onLogin={onLogin}/>} />
          <Route path="/bug/:bugId" element={<BugSummary/>} />
          <Route path="/user/:userId" element={<UserSummary/>} />
          <Route path="/bug/:bugId/edit" element={<BugEditor/>} showToast={showToast} />
          <Route path="/user/:userId/edit" element={<UserEditor/>} />
        </Routes>
        <ToastContainer />
      </main>
      <Footer />
    </>
  );
}

export default App;
