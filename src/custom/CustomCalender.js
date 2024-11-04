import React from "react";
import { useTranslation } from "react-i18next";
export default function CustomCalender({ value, onchange, placeholder }) {
  const { t, i18n } = useTranslation();
  return (
    <div className="mx-1">
      <label className={`block text-sm mb-1 mx-1 ${i18n.language === "ar" ? "text-right" : "text-left"}`}>{placeholder}</label>
      <input type="datetime-local" className="border-2 focus:border-primary focus:outline-none p-2 w-full" value={value} onChange={onchange} />
    </div>

  );
}
