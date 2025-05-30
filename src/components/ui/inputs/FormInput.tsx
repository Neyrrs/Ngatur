import React from 'react'

const FormInput = ({type = "text", placeholder = "Placeholder", onChange = () => {}}) => {
  return (
    <>
        <input type={type} onChange={onChange} className='border-2 border-[#A62C2C] transition-all duration-150 focus:shadow-sm focus:shadow-[#A62C2C] hover:shadow-sm hover:shadow-[#A62C2C] font-normal w-full focus:border-[#A62C2C] outline-none bg-white rounded-md px-3 py-2 text-sm' placeholder={placeholder}/>
    </>
  )
}

export default FormInput