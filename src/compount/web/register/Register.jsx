import React, { useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import './register.css'
import { registerValidation } from '../../shared/Validation';
import Inpute from '../../shared/Inpute';
import { useNavigate } from 'react-router-dom';
const initialValues={
  userName:'',
  email:'',
  password:'',
  age:'',
}

export default function Register() {
  const navigite=useNavigate();
  let [errorBack,setErrorBack]=useState('');
  const formik=useFormik({
    initialValues,
    onSubmit:async values=>{
      try{
        const {data}=await axios.post("https://gazaaaal.vercel.app/auth/signup",values);
        if(data.message=="success"){
          formik.resetForm();
          toast.success('account created succesfully,please verify your email to login', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            navigite('/admin/getAdmin');
        }
      }catch(error){
        setErrorBack(error.response.data.message);
        
      }
    },
    validationSchema:registerValidation,
    
});
  const inputs=[
  {
    type:'text',
    name:'userName',
    id:'userName',
    title:'user Name',
    value:formik.values.userName,
  },
  {
    type:'email',
    name:'email',
    id:'email',
    title:'user email',
    value:formik.values.email,
  },
  {
    type:'password',
    name:'password',
    id:'password',
    title:'user password',
    value:formik.values.password,
  },
  {
    type:'password',
    name:'confirmPassword',
    id:'confirmPassword',
    title:'user confirmPassword',
  },
  {
    type:'text',
    name:'age',
    id:'age',
    title:'user age',
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
        <h2>create account</h2>
        <form onSubmit={formik.handleSubmit} className='forms p-3'>
          {renderInput}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={!formik.isValid}
          >
            submit
          </button>
        </form>
        <div className="text-center w-100">
          {errorBack && <p className="text text-danger">{errorBack}</p>}
        </div>
      </div>
    </div>
  );
}
