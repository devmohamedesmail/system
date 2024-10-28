import React from 'react'
import { useTranslation } from 'react-i18next'
import { TiArrowLeft } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';



export default function CustomPageTitle({title}) {
  const {i18n} = useTranslation();
  const navigate=useNavigate();
  const {theme} = useTheme();
  return (
    <div className={` p-3 flex items-center mb-3 ${theme === 'dark' ? 'bg-primary' : 'bg-light-mode'} }`}>
       <button onClick={() => navigate(-1)} className='bg-white shadow-md rounded-full p-1'>
           <TiArrowLeft size={25} />
        </button>
        <h4 className={`font-semibold ml-3 ${i18n.language === 'ar' ? 'text-right arabic-font':''}  ${theme === 'light' ? 'text-white' : 'text-black'} `} >{title}</h4>
    </div>
  )
}
