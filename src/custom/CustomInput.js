import React from 'react'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid';
export default function CustomInput({type,placeholder,value,onchange,id}) {
  const { i18n } = useTranslation();
  const uniqueId = id || uuidv4(); 


  return (
    <div className='relative'>
        <input 
        id={uniqueId}
        type={type} 
        value={value} 
        onChange={onchange}
        className={`p-3 border border-slate-400 rounded-md my-3 transition-colors ease-in-out duration-300 focus:outline-none focus:border-primary focus:border input-form w-full ${i18n.language === 'ar' ? 'text-right arabic-font':''}`} />
        <label className={`absolute  left-2 border-slate-400  input-label text-sm -top-0 border px-3 bg-white rounded-md`} htmlFor={uniqueId} > {placeholder} </label>
    </div>
  )
}



