import React from 'react'
import { useTranslation } from 'react-i18next'


export default function CustomInput({type,placeholder,value,onchange}) {
  const { i18n } = useTranslation();
  return (
    <div>
        <input 
        type={type} 
        placeholder={placeholder} 
        value={value} 
        onChange={onchange}
        className={`p-3 border border-slate-400 rounded-md mb-3 transition-colors ease-in-out duration-300 focus:outline-none focus:border-primary focus:border w-full ${i18n.language === 'ar' ? 'text-right arabic-font':''}`} />
        
    </div>
  )
}
