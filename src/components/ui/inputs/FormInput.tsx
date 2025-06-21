import React from 'react'

const FormInput = ({type = "text", placeholder = "Placeholder", onChange = () => {}, value = "", ...rest}) => {
  return (
    <>
        <input type={type} onChange={onChange} value={value} className='cursor-pointer border-2 border-[#A62C2C] transition-all duration-150 focus:shadow-sm focus:shadow-[#A62C2C] hover:shadow-sm hover:shadow-[#A62C2C] font-normal w-full focus:border-[#A62C2C] outline-none bg-white rounded-md px-3 py-2 text-sm' placeholder={placeholder} {...rest}/>
    </>
  )
}

export default FormInput