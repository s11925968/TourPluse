import React, { useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import './sendcode.css'
import Inpute from '../../shared/Inpute';
import { Link, useNavigate } from 'react-router-dom';
const initialValues={
  email:'',
}

export default function Sendcode() {
  const navigite=useNavigate();
  let [errorBack,setErrorBack]=useState('');
  const formik=useFormik({
    initialValues,
    onSubmit:async values=>{
      try{
        const {data}=await axios.patch(`${import.meta.env.VITE_URL_LINK}/auth/sendCode`,values);
      }catch(error){
        setErrorBack(error.response.data.message);
        
      }
    },
    
});
  const inputs=[
  {
    type:'email',
    name:'email',
    id:'email',
    title:'Email',
    value:formik.values.email,
  },
];
const renderInput=inputs.map((value,index)=>
  <Inpute 
  type={value.type}
  id={value.id}
  title={value.title}
  key={index} 
  name={value.name}
  value={value.value}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  touched={formik.touched}
  error={formik.errors}
  />
)
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="phone-width">
        <form onSubmit={formik.handleSubmit} className='forms p-3'>
          {renderInput}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={!formik.isValid}
          >
            Send code
          </button>
          <Link to="/auth/forgetPassword">change password</Link>
        </form>
        <div className="text-center w-100">
          {errorBack && <p className="text text-danger">{errorBack}</p>}
        </div>
        
      </div>
    </div>
  );
}
