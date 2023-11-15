import { useState } from 'react'
export default function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  return(
    <>
      <div className="col-3">
        <label htmlFor="emailField" className="form-label">Email:</label>
        <input type="text" className='form-control' name="emailField" onChange={(evt) => setEmail(evt.target.value)} />
        <label htmlFor="passwordField" className="form-label">Password:</label>
        <input type="password" className='form-control' name="passwordField" onChange={(evt) => setPassword(evt.target.value)}/>
        <label htmlFor="givenNameField" className="form-label">Given Name:</label>
        <input type="text" className='form-control' name="givenNameField" onChange={(evt) => setGivenName(evt.target.value)}/>
        <label htmlFor="familyNameField" className="form-label">Family Name:</label>
        <input type="text" className='form-control' name="familyNameField" onChange={(evt) => setFamilyName(evt.target.value)}/>
        <button type="button" className="btn btn-success">Register</button>
      </div>
    </>
  );
};