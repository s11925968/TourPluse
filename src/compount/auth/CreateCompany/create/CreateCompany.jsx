import React from 'react'
import './company.css'
import { Link } from 'react-router-dom'
export default function CreateCompany() {

  return (
    <>
      <div className="company-sing d-flex">
        <div className="container signup-form">
          <h2>Sign-Up</h2>
          <form id="signup-form">
            <label htmlFor="companyName">Company Name:</label>
            <input type="text" id="companyName" name="companyName" required />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
            />
            <span id="passwordError" className="error" />
            <label htmlFor="mobilePhone">Mobile Phone:</label>
            <input type="tel" id="mobilePhone" name="mobilePhone" required />
            <label htmlFor="address">Address:</label><br/>
            <textarea id="address" name="address" required defaultValue={""} />
            <br />
            {/* Logo Upload */}
            <label htmlFor="logo">Company Logo:</label>
            <input type="file" id="logo" name="logo" accept="image/*" />
            <button type="submit" className="w-100" id="sing">
              Sign Up
            </button>
          </form>
          <div className='mb-4'>
            <p className='text-danger'>you already have account ?</p>
          </div>
        </div>
      </div>
    </>
  );
}