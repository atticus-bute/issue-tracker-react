import { useState } from 'react'
export default function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function adminLogin(){
    console.log('adminLogin called');
    if (email == 'admin@example.com' && password == 'password') {
      alert('Login successful');
    } else {
      alert('Login failed');
    }
  }
  return (
    <>
      <div className="col-3">
        <label htmlFor="emailField" className="form-label">Email:</label>
        <input type="text" className='form-control' name="emailField" id='txtEmail' onChange={(evt) => setEmail(evt.target.value)} />
        <label htmlFor="passwordField" className="form-label">Password:</label>
        <input type="password" className='form-control' name="passwordField" id='txtPassword' onChange={(evt) => setPassword(evt.target.value)}/>
        <button type="button" className="btn btn-primary me-3" onClick={adminLogin} >Login</button>
        <button type="button" className="btn btn-success">Register</button>
      </div>
    </>
  );
}