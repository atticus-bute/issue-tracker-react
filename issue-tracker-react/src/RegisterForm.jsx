import { useState } from 'react'
export default function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  return(
    <>
      <div className="col-3">
        <label htmlFor="txtEmail" className="form-label">Email:</label>
        <input type="text" className='form-control' name="emailField" id='txtEmail' onChange={(evt) => setEmail(evt.target.value)} />
        <label htmlFor="txtPassword" className="form-label">Password:</label>
        <input type="password" className='form-control' name="passwordField" id='txtPassword' onChange={(evt) => setPassword(evt.target.value)}/>
        <label htmlFor="txtGivenName" className="form-label">Given Name:</label>
        <input type="text" className='form-control' name="givenNameField" id='txtGivenName' onChange={(evt) => setGivenName(evt.target.value)}/>
        <label htmlFor="txtFamilyName" className="form-label">Family Name:</label>
        <input type="text" className='form-control' name="familyNameField" id='txtFamilyName' onChange={(evt) => setFamilyName(evt.target.value)}/>
        <button type="button" className="btn btn-success mt-1">Register</button>
      </div>
    </>
  );
};