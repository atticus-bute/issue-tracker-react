import { Link } from 'react-router-dom';
export default function Home({auth}) {

  return (
    <div>
      {auth ?
        <div className='alert alert-primary fs-3'>Welcome, {auth.fullName}!</div> :
        <div className='alert alert-warning'><Link to='/login'>Please Login</Link></div>
      }
    </div>
  );
}