import React from 'react'
import { useTranslation } from 'react-i18next'

export default function CustomPageTitle({title}) {
  const {i18n} = useTranslation();
  return (
    <div className='bg-white p-3'>
        <h4 className={`font-semibold ml-3 ${i18n.language === 'ar' ? 'text-right arabic-font':''} `}>{title}</h4>
    </div>
  )
}
