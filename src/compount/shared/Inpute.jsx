import React from 'react';

export default function Inpute({ type = 'text', id, title, name, value, onChange, error, onBlur, touched }) {
  return (
    <div className='w-100 row align-items-center'>
      {type === 'date' && <label htmlFor={id} className="form-label fs-2 m-0 p-0 col-md-2">{title}:</label>}

      <div className="input-group col-md-5">
        <input
          className='fs-5 my-3 form-control'
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={title}
        />
        {touched[name] && error[name] && <p className='text-danger d-block text-center'>{error[name]}</p>}
      </div>

      {/* Add another input with similar structure */}
      <div className="input-group col-md-5">
        <input
          className='fs-5 my-3 form-control'
          type={type}
          id={`${id}-2`} {/* Ensure a unique ID for the second input */}
          name={`${name}-2`} {/* Ensure a unique name for the second input */}
          value={value} {/* Provide a separate value for the second input if needed */}
          onChange={onChange} {/* Provide a separate onChange handler for the second input if needed */}
          onBlur={onBlur} {/* Provide a separate onBlur handler for the second input if needed */}
          placeholder={`${title} 2`} {/* Provide a separate placeholder for the second input if needed */}
        />
        {touched[`${name}-2`] && error[`${name}-2`] && <p className='text-danger d-block text-center'>{error[`${name}-2`]}</p>}
      </div>
    </div>
  );
}
