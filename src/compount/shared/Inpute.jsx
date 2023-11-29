import React from 'react'

export default function Inpute({type='text',id,title,name,value,onChange,error,onBlur,touched}) {
  return (
    <div className="input-group mb-2">
      <label htmlFor={id} className="m-auto text-secondary d-block">
        {title}
      </label>
      <input type={type} id={id} name={name} value={value} onChange={onChange} onBlur={onBlur}/>
      {touched[name] &&error[name]&& <p className='text-danger d-block text-center'>{error[name]}</p>}
    </div>
  );
}
