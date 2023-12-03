import React from 'react'
import Inpute from '../../../shared/Inpute';
import axios from 'axios';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const initialValues={
  image:'',
  name:'',

}

// const onSubmit=async users=>{
//   const formdata=new FormData();
//   formdata.append("name",users.name);
//   formdata.append("image",users.image);
//   try {
//     const { data } = await axios.post(
//       `${import.meta.env.VITE_URL_LINK}/categories/create`,
//       formdata,
//       {
//         headers: {
//           Authorization:
//             'ghazal__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjQ1ZGNlYjA5ZTZiNTk5NTdkZjllNCIsInN0YXR1cyI6IkFjdGl2ZSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTcwMTA3ODA3NX0.t4rh4-2o1rhC0lHwhEhl9Xw2zt2WE-GYGQIvi_ubRuo', // Replace YOUR_TOKEN_HERE with your actual token
//         },
//       }
      
//     );
//     if(data.message=="success"){
//       toast.success('account admin created succesfully', {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         });
        
//     }
//   } catch (error) {
//     console.error('Error creating admin:', error);
//   }
// }
export default function CreateCatgories() {
  const navgite=useNavigate();
  const formik =useFormik({
    initialValues,
    onSubmit:async users=>{
      const formdata=new FormData();
      formdata.append("name",users.name);
      formdata.append("image",users.image);
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_URL_LINK}/categories/create`,
          formdata,
          {
            headers: {
              Authorization:
                'ghazal__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjQ1ZGNlYjA5ZTZiNTk5NTdkZjllNCIsInN0YXR1cyI6IkFjdGl2ZSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTcwMTA3ODA3NX0.t4rh4-2o1rhC0lHwhEhl9Xw2zt2WE-GYGQIvi_ubRuo', // Replace YOUR_TOKEN_HERE with your actual token
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
            navgite('/admin/categories/get');
            
        }
      } catch (error) {
        console.error('Error creating admin:', error);
      }
    }
  });
  const handelFileChange=(event)=>{
    formik.setFieldValue('image',event.target.files[0]);
  }
  
  const inputs=[
  {
    name:'name',
    type:'text',
    id:'name',
    title:'User name',
    value:formik.values.name,
  },
  {
    name:'image',
    type:'file',
    id:'image',
    title:'User image',
    onChange:handelFileChange,
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
    onChange={input.onChange ||formik.handleChange}
    onBlur={formik.handleBlur}
    touched={formik.touched}
    error={formik.errors}
    />
  )
})
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div>
      <h2 className='text-center'>create categories</h2>
      <form onSubmit={formik.handleSubmit} enctype="multipart/form-data">
        {renderInput}
        <button type="submit" className='w-100'>
          Submit
        </button>
      </form>
      </div>
    </div>
  )
}
