import React from 'react'

export default function CustomTextArea({value,onchange,placeholder}) {
  return (
    
    <textarea
      value={value} 
      onChange={onchange} 
      placeholder={placeholder}
      className='p-3 border-2 bg-transparent border-slate-400 rounded-md mb-3 transition-colors ease-in-out duration-300 focus:outline-none focus:border-primary focus:border w-full'
    />
  )
}
