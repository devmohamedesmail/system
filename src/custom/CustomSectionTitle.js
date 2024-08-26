import React from 'react'
import { useTranslation } from 'react-i18next'
export default function CustomSectionTitle({title}) {
    const { i18n } = useTranslation();
  return (
    <div className='mb-10 mt-5'>
        <h4 className={`font-semibold ml-3 ${i18n.language === 'ar' ? 'text-right arabic-font':''} `}>{title}</h4>
    </div>
  )
}
