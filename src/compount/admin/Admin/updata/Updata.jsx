
import React from 'react';
import Inpute from '../../../shared/Inpute';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialValues = {
  email: '',
  password: '',
};

export default function Updata() {
  const {_id}=useParams();
  const navigite=useNavigate();
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.patch(
          `${import.meta.env.VITE_URL_LINK}/admin/${_id}`,
          values,
          {
            headers: {
              Authorization:
                "ghazal__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWYwYzIyOGEzODE1MGU3NDA5YTk3YiIsInN0YXR1cyI6IkFjdGl2ZSIsInJvbGUiOiJTdXBlcmFkbWluIiwiaWF0IjoxNzAxMTA1NzAwfQ.Alec_MEB9Ijsrgun36s7fLpt_7kDg7iL0qorl7EJYhA", // Replace YOUR_TOKEN_HERE with your actual token
            },
          }
        );
        if (data.message == "success") {
          formik.resetForm();
          toast.success("update account succesfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigite("/admin/getAdmin");
        }
      } catch (error) {
        console.error("Error creating admin:", error);
      }
    },
  });

  const inputs = [
    {
      name: 'email',
      type: 'email',
      id: 'email',
      title: 'New Email',
      value: formik.values.email,
    },
    {
      name: 'password',
      type: 'password',
      id: 'password',
      title: 'New Password',
      value: formik.values.password,
    },
  ];

  const renderInput = inputs.map((input, index) => (
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
  ));

  return (
    <div className="container py-4 d-flex justify-content-center align-items-center ">
      <div className="phone-width">
        <h2>Update Email and Password</h2>
        <form onSubmit={formik.handleSubmit} className="forms p-3">
          {renderInput}
          <button type="submit" className="btn btn-primary w-100">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}


