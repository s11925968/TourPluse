import React from 'react';

export default function Inpute({ type = 'text', id, title, name, value, onChange, error, onBlur, touched }) {
  return (
    <div className='w-100'>
        {type === 'date' && <label htmlFor={id} className="form-label fs-5 m-0 p-0">{title}:</label>}

    <div className="input-group ">
      <input className='fs-5 my-3'
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
    </div>
  );
}
