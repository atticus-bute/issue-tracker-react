import { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
export default function LoginForm({ onLogin, showToast }) {

  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [error, setError] = useState('');
  const emailError = !email
    ? 'Email is required'
    : !email.includes('@')
      ? 'Email must contain @'
      : email != emailConfirm
        ? 'Emails do not match' : '';
  const passwordError = !password
    ? 'Password is required'
    : password.length < 7
      ? 'Password must be at least 8 characters'
      : password != passwordConfirm
        ? 'Passwords do not match' : '';
  const givenNameError = !givenName
    ? 'Given Name is required' : '';
  const familyNameError = !givenName
    ? 'Given Name is required' : '';

    function onSubmitRegister(evt) {
      evt.preventDefault();
      if (emailError) {
        showToast(emailError, 'error');
        return;
      } else if (passwordError) {
        showToast(passwordError, 'error');
        return;
      } else if (givenNameError) {
        showToast(givenNameError, 'error');
        return;
      } else if (familyNameError) {
        showToast(familyNameError, 'error');
        return;
      }
      axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, {
        email, password, givenName, familyName
      }, { withCredentials: true })
        .then(response => {
          onLogin(response.data);
        })
        .catch(error => {
          const resError = error?.response?.data;
          console.log(resError);
          showToast(resError?.message, 'error');
          if (resError) {
            //bad username or password
            console.log(resError);
            if (typeof resError === 'string') {
              showToast(error.response.data, 'error');
            } else if (resError?.message) { //joi validation errors
              showToast(resError?.message?.details[0]?.message, 'error');
            }
          }
        });
    }
  return (
    <>
      <div className='row'>
        <div className="col-4"></div>
        <div className="col-4">
          <label htmlFor="txtEmail" className="form-label">Email:</label>
          <input type="email" autoFocus={true} className='form-control' name="emailField" id='txtEmail' onChange={(evt) => setEmail(evt.target.value)} />
          <label htmlFor="txtEmailConfirm" className="form-label">Confirm Email:</label>
          <input type="email" className='form-control' name="emailConfirmField" id='txtEmailConfirm' onChange={(evt) => setEmailConfirm(evt.target.value)} />
          <label htmlFor="txtPassword" className="form-label">Password:</label>
          <input type="password" className='form-control' name="passwordField" id='txtPassword' onChange={(evt) => setPassword(evt.target.value)} />
          <label htmlFor="txtPasswordConfirm" className="form-label">Confirm Password:</label>
          <input type="password" className='form-control' name="passwordConfirmField" id='txtPasswordConfirm' onChange={(evt) => setPasswordConfirm(evt.target.value)} />
          <label htmlFor="txtGivenName" className="form-label">Given Name:</label>
          <input type="text" className='form-control' name="givenNameField" id='txtGivenName' onChange={(evt) => setGivenName(evt.target.value)} />
          <label htmlFor="txtFamilyName" className="form-label">Family Name:</label>
          <input type="text" className='form-control' name="familyNameField" id='txtFamilyName' onChange={(evt) => setFamilyName(evt.target.value)} />
          <button type="button" className="btn btn-success mt-1" onClick={(evt) => onSubmitRegister(evt)}>Register</button>
        </div>
        <div className="col-4"></div>
        <span className='text-center'>Already Registered?</span>
        <NavLink className="text-center" to="/login">Login Here.</NavLink>
      </div>
    </>
  );
}