import React from 'react'
import { useTheme } from '../context/ThemeContext';

export default function CustomButton({title,width,onpress}) {
  const {theme} = useTheme();
  const widthClass = width ? width : 'w-auto';

  return (
    <div className='text-center'>
        <button 
            className={` ${theme === 'light'? 'bg-light-mode text-white':'bg-primary'} px-10 align-middle  py-3 transition-colors ease-in-out duration-800 text-black font-bold  ${widthClass} `}
            aria-label={title}
            onClick={onpress} 
        >{title}</button>
    </div>
  )
}
