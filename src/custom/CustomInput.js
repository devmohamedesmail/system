import React from 'react'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid';





export default function CustomInput({ type, placeholder, value, onchange, id }) {
  const { i18n } = useTranslation();
  const uniqueId = id || uuidv4();



  return (

    <div>
      <label className={`block text-xs font-bold mb-2 mx-1  ${i18n.language === 'ar' ? 'text-right arabic-font' : ''}`}>{placeholder} </label>
      <div className='relative'>
        <input
          id={uniqueId}
          type={type}
          value={value}
          onChange={onchange}
          className={`p-3 border-2 focus:outline-none focus:border-primary transition-all ease-in-out  w-full ${i18n.language === 'ar' ? 'text-right arabic-font' : ''}`} />
        
      </div>
    
    </div>
  )
}



