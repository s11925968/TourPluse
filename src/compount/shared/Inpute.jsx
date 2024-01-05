import React from 'react';

export default function Inpute({ type = 'text', id, title, name, value, onChange, error, onBlur, touched }) {
  return (
    <div className='w-100'>

    <div className="input-group mb-2">
      <input className='fs-4 my-2'
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
