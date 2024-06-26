import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';
import BugList from './BugList.jsx';
import UserList from './UserList.jsx';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReportBug from './ReportBug.jsx';
import BugSummary from './BugSummary.jsx';
import BugEditor from './BugEditor.jsx';
import UserEditor from './UserEditor.jsx';
import UserSummary from './UserSummary.jsx';
import MyUserSummary from './MyUserSummary.jsx';
import MyUserEditor from './MyUserEditor.jsx';
import NotFound from './NotFound.jsx';
import Home from './Home.jsx';

function App() {
  const [auth, setAuth] = useState(null);
  const [reloadTick, setReloadTick] = useState(0);
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

  function onLogin(auth) {
    const now = new Date();
    const numHours = 1;
    const expirationTime = now.getTime() + numHours * 60 * 60 * 1000;
    const user = {
      ...auth.user,
      expiration: expirationTime
    };
    auth.user = user;
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
    const storedUser = JSON.parse(localStorage.getItem('auth'));
    const now = new Date();
    if (!storedUser) {
      return;
    }

    if (now.getTime() > storedUser.expiration) {
      axios.post(`${import.meta.env.VITE_API_URL}/api/users/logout`, {}, { withCredentials: true })
        .then(() => {
          onLogout();
        })
      return;
    }
    if (storedUser) {
      setAuth(storedUser);
    }
  }, []);

  return (
    <div style={{ userSelect: 'none' }}>
      <header>
        <NavBar auth={auth} onLogout={onLogout} reloadTick={reloadTick} setReloadTick={setReloadTick} />
        {console.log()}
      </header>
      <main className='flex-grow-1 bg-success-subtle mb-5'>
        <Routes>
          <Route path="/" element={<Home auth={auth}/>} />
          <Route path="/bugs" element={<BugList auth={auth} showToast={showToast} />} />
          <Route path="/users" element={<UserList auth={auth} showToast={showToast} />} />
          <Route path="/login" element={<LoginForm onLogin={onLogin} />} />
          <Route path="/register" element={<RegisterForm onLogin={onLogin} showToast={showToast} />} />
          <Route path="/bug/report" element={<ReportBug showToast={showToast} auth={auth} />} />
          <Route path="/bug/:bugId" element={<BugSummary reloadTick={reloadTick} setReloadTick={setReloadTick} auth={auth} showToast={showToast} />} />
          <Route path="/user/:userId" element={<UserSummary reloadTick={reloadTick} setReloadTick={setReloadTick} showToast={showToast} auth={auth} navigate={navigate}/>} />
          <Route path="/user/me" element={<MyUserSummary showToast={showToast} reloadTick={reloadTick} auth={auth}/>} />
          <Route path="/user/me/edit" element={<MyUserEditor showToast={showToast} auth={auth} setAuth={setAuth}/>} />
          <Route path="/bug/:bugId/edit" element={<BugEditor showToast={showToast} auth={auth} />} />
          <Route path="/user/:userId/edit" element={<UserEditor showToast={showToast} auth={auth} setAuth={setAuth}/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
        <ToastContainer />
      </main>
      <Footer />
    </div>
  );
}

export default App;
