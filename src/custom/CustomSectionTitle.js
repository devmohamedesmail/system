import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../context/ThemeContext';


export default function CustomSectionTitle({title}) {
    const { i18n } = useTranslation();
    const { theme } = useTheme();
  return (
    <div className='mb-10 mt-5'>
        <h4 className={`font-semibold ml-3 ${i18n.language === 'ar' ? 'text-right arabic-font':''} ${theme === 'dark' ? 'text-white' : 'text-black'} `}>{title}</h4>
    </div>
  )
}
