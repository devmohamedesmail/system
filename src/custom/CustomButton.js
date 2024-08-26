import React from 'react'

export default function CustomButton({title,width,onpress}) {

  const widthClass = width ? width : 'w-auto';

  return (
    <div className='text-center'>
        <button 
            className={`bg-primary hover:bg-secondary px-10 align-middle rounded-md py-3 transition-colors ease-in-out duration-800 text-white ${widthClass} `}
            aria-label={title}
            onClick={onpress} 
        >{title}</button>
    </div>
  )
}
