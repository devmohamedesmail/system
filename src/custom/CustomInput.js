import React from 'react'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid';
import { useTheme } from '../context/ThemeContext';




export default function CustomInput({ type, placeholder, value, onchange, id }) {
  const { i18n } = useTranslation();
  const uniqueId = id || uuidv4();
  const { theme } = useTheme();


  return (

    <div>
      <label className={`block text-xs font-bold mb-1  ${theme === 'light' ? 'text-black' : 'text-white'} ${i18n.language === 'ar' ? 'text-right arabic-font' : ''}`}>{placeholder} </label>
      <div className='relative'>
        <input
          id={uniqueId}
          type={type}
          value={value}
          onChange={onchange}
          className={`p-3 border-2 border-slate-400 ${theme === 'light' ? 'border-slate-400 focus:border-slate-400':'text-white'}  focus:border-2 input-form w-full ${i18n.language === 'ar' ? 'text-right arabic-font' : ''}`} />
        
      </div>
    </div>
  )
}



