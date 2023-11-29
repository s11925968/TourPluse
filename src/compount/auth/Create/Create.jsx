import React from 'react'
import { Link } from 'react-router-dom';

export default function Create() {
  return (
  <div className="d-flex justify-content-center align-items-center vh-100">
  <div className='text-center'>
    <h1>Welcome to our website</h1>
    <p>Please select:</p>
    <div className='forms'>
    <Link to="/Contact/create/createcompany" className='text-decoration-none btn bg-danger pb-4 w-100'>Company</Link>
    <Link to="/Contact/create/createuser" className='d-block text-decoration-none btn  pb-4 w-100'>Users</Link>
    </div>
  </div>
  </div>
  );
}
