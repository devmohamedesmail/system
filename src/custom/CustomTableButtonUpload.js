import React from 'react'
import { FaUpload } from "react-icons/fa";

export default function CustomTableButtonUpload({title,onclick}) {
  return (
    <button
    onClick={onclick}
    className="bg-light-mode px-5 py-2 mx-2 flex items-center rounded-full text-sm text-black hover:bg-secondary transition-colors ease-in-out duration-300"
  >
    <span className="mx-1 text-white">{title}</span>
     <FaUpload color='#fff' />
  </button>
  )
}
