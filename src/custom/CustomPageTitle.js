import React from 'react'
import { useTranslation } from 'react-i18next'
import { TiArrowLeft } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';



export default function CustomPageTitle({title}) {
  const {i18n} = useTranslation();
  const navigate=useNavigate();
  return (
    <div className='bg-white p-3 flex items-center '>
       <button onClick={() => navigate(-1)} className='bg-white shadow-md rounded-full p-1'>
           <TiArrowLeft size={25} />
        </button>
        <h4 className={`font-semibold ml-3 ${i18n.language === 'ar' ? 'text-right arabic-font':''} `}>{title}</h4>
    </div>
  )
}
