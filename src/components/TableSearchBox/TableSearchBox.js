import React from 'react'
import { useTranslation } from 'react-i18next'

export default function TableSearchBox({onchange}) {
    const {t}=useTranslation();
  return (
    <div className="flex justify-end">
    <input
      className="border-2 rounded-lg focus:border-primary p-2 focus:outline-none transition-colors ease-in-out duration-1000"
      placeholder={t('search')}
      onChange={onchange}
    />
  </div>
  )
}
