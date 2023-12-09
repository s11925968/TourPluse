import React from 'react'
import Inpute from '../../../shared/Inpute';
import axios from 'axios';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
export default function Creaetoperator() {
  const {_id}=4444444444444;
  const navgite = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      email: "",
      phoneNumber: "",
      password: "",
      image: "",
      categoryId:_id,
      description: "",
      founderName: "",
      phoneNumberEx: "",
    },
    onSubmit: async (users) => {
      const formdata = new FormData();
      formdata.append("name", users.name);
      formdata.append("image", users.image);
      formdata.append("address", users.address);
      formdata.append("email", users.email);
      formdata.append("phoneNumber", users.phoneNumber);
      formdata.append("password", users.password);
      formdata.append("categoryId", users.categoryId);
      formdata.append("description", users.description);
      formdata.append("founderName", users.founderName);
      formdata.append("phoneNumberEx", users.phoneNumberEx);
      try {
        const token = localStorage.getItem("userToken");
        const { data } = await axios.post(
          `${import.meta.env.VITE_URL_LINK}/operator/create`,
          formdata,
          {
            headers: {
              Authorization: `ghazal__${token}`, // Replace YOUR_TOKEN_HERE with your actual token
            },
          }
        );
        if(data.message=="success"){
          formik.resetForm();
          toast.success('you seccess create operator', {
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
        console.log(data);
      } catch (error) {
        console.error("Error creating admin:", error);
      }
    },
  });
  const handelFileChange=(event)=>{
    formik.setFieldValue('image',event.target.files[0]);
  }
  
  const inputs=[
  {
    name:'name',
    type:'text',
    id:'name',
    title:'name',
    value:formik.values.name,
  },
  {
    name:'address',
    type:'text',
    id:'address',
    title:'address',
    value:formik.values.address,
  },
  {
    name:'email',
    type:'email',
    id:'email',
    title:'email',
    value:formik.values.email,
  },
  {
    name:'phoneNumber',
    type:'number',
    id:'phoneNumber',
    title:'phoneNumber',
    value:formik.values.phoneNumber,
  },
  {
    name:'password',
    type:'password',
    id:'password',
    title:'password',
    value:formik.values.password,
  },
  {
    name:'description',
    type:'text',
    id:'description',
    title:'description',
    value:formik.values.description,
  },
  {
    name:'phoneNumberEx',
    type:'number',
    id:'phoneNumberEx',
    title:'phoneNumberEx',
    value:formik.values.phoneNumberEx,
  },
  {
    name:'founderName',
    type:'text',
    id:'founderName',
    title:'founderName',
    value:formik.values.founderName,
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
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className='forms p-4'>
      <h2 className='text-center'>Create Operator</h2>
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
