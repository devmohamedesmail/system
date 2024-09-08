import React from "react";
import { useTranslation } from "react-i18next";
import { CiSearch } from "react-icons/ci";

export default function TableSearchBox({ onchange }) {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center items-start border-2 rounded-xl overflow-hidden p-1">
      <div>
        <input
          className="focus:outline-none w-full px-3 text-gray-70"
          placeholder={t("search")}
          onChange={onchange}
        />
      </div>
      <div className=" mt-1">
        <CiSearch />
      </div>
    </div>
  );
}
