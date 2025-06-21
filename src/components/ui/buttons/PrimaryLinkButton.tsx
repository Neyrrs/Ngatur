import Link from 'next/link'
import React from 'react'

const PrimaryLinkButton = ({width = "px-4", height = "py-2", text="Primary button", destination = "", onClick = () => {},  ...rest}) => {
  return (
    <>
        <Link href={destination} onClick={onClick} className={`text-center text-md font-semibold hover:bg-[#740303e5] duration-200 transition-all border-2 border-transparent cursor-pointer rounded-md bg-[#A62C2C] text-white ${width} ${height} ${rest}`}>
            {text}
        </Link>
    </>
  )
}

export default PrimaryLinkButton