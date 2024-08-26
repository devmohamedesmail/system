import React from 'react'
import { FaUpload } from "react-icons/fa";

export default function CustomTableButtonUpload({title,onclick}) {
  return (
    <button
    onClick={onclick}
    className="bg-primary px-5 py-2 mx-2 flex items-center rounded-full text-sm text-white hover:bg-secondary transition-colors ease-in-out duration-300"
  >
    <span className="mx-1">{title}</span>
     <FaUpload />
  </button>
  )
}
