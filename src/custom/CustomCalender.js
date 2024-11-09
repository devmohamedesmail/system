import React from "react";
import { useTranslation } from "react-i18next";
export default function CustomCalender({ value, onchange, placeholder }) {
  const { t, i18n } = useTranslation();
  return (
    <div className="my-1">
      <label className={`block text-xs font-bold mb-1 mx-1  ${i18n.language === 'ar' ? 'text-right arabic-font' : ''}`}>{placeholder} </label>
      <input type="datetime-local" className="border-2 focus:border-primary focus:outline-none py-3 px-2 w-full" value={value} onChange={onchange} />
    </div>

  );
}
