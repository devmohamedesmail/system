import React from "react";
import { useTranslation } from "react-i18next";
import { CiSearch } from "react-icons/ci";

export default function TableSearchBox({ onchange }) {
  const { t } = useTranslation();
  return (
    
      <input
        className="border-2 border-slate-400 w-60 px-3 text-gray-70 h-10"
        placeholder={t("search")}
        onChange={onchange}
      />

      
    
  );
}
