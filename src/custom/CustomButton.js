import React from 'react'
import { useTheme } from '../context/ThemeContext';

export default function CustomButton({title,width,onpress}) {
  const {theme} = useTheme();
  const widthClass = width ? width : 'w-auto';

  return (
    <div className='text-center'>
        <button 
            className={` rounded-lg bg-primary text-white px-10 align-middle  py-3 transition-colors ease-in-out duration-800 text-black hover:bg-secondary hover:shadow-lg ${widthClass} `}
            aria-label={title}
            onClick={onpress} 
        >{title}</button>
    </div>
  )
}
