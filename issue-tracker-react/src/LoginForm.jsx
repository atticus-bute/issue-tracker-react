import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginForm({ onLogin }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const emailError = !email
    ? 'Email is required'
    : !email.includes('@')
      ? 'Email must contain @'
      : '';

  const passwordError = !password
    ? 'Password is required'
    : password.length < 5
      ? 'Password must be at least 5 characters'
      : '';

  const navigate = useNavigate();

  function onSubmitLogin(evt) {
    setError('');
    evt.preventDefault();
    if (emailError) {
      setError(emailError);
      return;
    } else if (passwordError) {
      setError(passwordError);
      return;
    }
    axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, {
      email, password
    }, { withCredentials: true })
      .then(response => {
        onLogin(response.data, response);
      })
      .catch(error => {
        const resError = error?.response?.data;
        console.log(resError);
        setError(resError.message);
        if (resError) {
          //bad username or password
          console.log(resError);
          if (typeof resError === 'string') {
            setError(error.response.data);
          } else if (resError.message) { //joi validation errors
            setError(resError.message.details[0].message)
          }
        }
      });
  }
  return (
    <>
      <div className='col-4'></div>
      <div className="col-4">
        <label htmlFor="txtEmail" className="form-label">Email:</label>
        <input type="text" className='form-control' name="emailField" id='txtEmail' onChange={(evt) => setEmail(evt.target.value)} />
        <label htmlFor="txtPassword" className="form-label">Password:</label>
        <input type="password" className='form-control' name="passwordField" id='txtPassword' onChange={(evt) => setPassword(evt.target.value)} />
        <button type="button" className="btn btn-success mt-1" onClick={(evt) => onSubmitLogin(evt)} >Login</button>
      </div>
      <div className='col-4 mt-2'>
        {error && <div className='alert alert-danger' role='alert'>{error}</div>}
      </div>
    </>
  );
}