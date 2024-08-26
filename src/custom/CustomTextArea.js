import React from 'react'

export default function CustomTextArea({value,onchange,placeholder}) {
  return (
    // <textarea placeholder={placeholder} className='p-3 border-2 rounded-md mb-3 transition-colors ease-in-out duration-300 focus:outline-none focus:border-orange-600 focus:border w-full' onChange={onchange}>
    //  {value}
    // </textarea>
    <textarea
      value={value} // Set the value prop
      onChange={onchange} // Handle changes
      placeholder={placeholder}
      className='p-3 border-2 rounded-md mb-3 transition-colors ease-in-out duration-300 focus:outline-none focus:border-orange-600 focus:border w-full'
    />
  )
}
