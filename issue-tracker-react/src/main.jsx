import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';
import BugSummary from './BugSummary.jsx';
import UserSummary from './UserSummary.jsx';
import BugList from './BugList.jsx';
import UserList from './UserList.jsx';
import BugEditor from './BugEditor.jsx';
import UserEditor from './UserEditor.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <LoginForm />
    <RegisterForm />
    <BugList/>
    <UserList/>
  </React.StrictMode>,
)
