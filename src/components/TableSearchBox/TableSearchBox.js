import React from "react";
import { useTranslation } from "react-i18next";


export default function TableSearchBox({ onchange }) {
  const { t } = useTranslation();
  return (
    
      <input
        className="border-2 border-slate-400 w-60 px-3 text-gray-70 h-10 focus:outline-primary focus:border-primary"
        placeholder={t("search")}
        onChange={onchange}
      />

  
  );
}
