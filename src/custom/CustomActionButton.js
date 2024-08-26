import React from 'react'

export default function CustomActionButton({icon,onpress}) {
  return (
    <button 
        onClick={onpress} 
        className='bg-slate-300 rounded-lg p-1 flex justify-center items-center m-1 shadow-md'> 
       {icon}
    </button>
  )
}
