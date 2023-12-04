import React from 'react'
import Inpute from '../../../shared/Inpute'
import { useFormik } from 'formik'
import { registerValidation } from '../../../shared/Validation'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const initialValues={
  userName:'',
  email:'',
  password:'',
  address:'',
  phoneNumber:'',
  role:'',
}
export default function Creatadmin() {
  const navigite=useNavigate();
  const formik =useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const token=localStorage.getItem('userToken');
        const { data } = await axios.post(
          `${import.meta.env.VITE_URL_LINK}/admin/create`,
          values,
          {
            headers: {
              Authorization:
                `ghazal__${token}`, 
            },
          }
        );
        if(data.message=="success"){
          formik.resetForm();
          toast.success('account admin created succesfully', {
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
      } catch (error) {
        console.error('Error creating admin:', error);
      }
    },
  
  });
  const inputs=[
  {
    name:'userName',
    type:'text',
    id:'userName',
    title:'User Name',
    value:formik.values.userName,
  },
  {
    name:'email',
    type:'email',
    id:'email',
    title:'User email',
    value:formik.values.email,
  },
  {
    name:'password',
    type:'password',
    id:'password',
    title:'User password',
    value:formik.values.password,
  },
  {
    name:'address',
    type:'text',
    id:'address',
    title:'User address',
    value:formik.values.address,
  },
  {
    name:'phoneNumber',
    type:'number',
    id:'phoneNumber',
    title:'User phoneNumber',
    value:formik.values.phoneNumber,
  },
  {
    name:'role',
    type:'text',
    id:'role',
    title:'User role',
    value:formik.values.role,
  },
];

const renderInput=inputs.map((input,index)=>{
  return(
    <Inpute
    key={index}
    name={input.name}
    type={input.type} 
    title={input.title}
    id={input.id}
    value={input.value}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    touched={formik.touched}
    error={formik.errors}
    />
  )
})

  return (
    <div className='container py-4 d-flex justify-content-center align-items-center '>
        <div className="phone-width">
        <h2>create admin</h2>
        <form onSubmit={formik.handleSubmit} className='forms p-3'>
          {renderInput}
          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            submit
          </button>
        </form>
        
      </div>
    </div>
  )
}
