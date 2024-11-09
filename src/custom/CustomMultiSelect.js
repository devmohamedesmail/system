import React from "react";
import { MultiSelect } from 'primereact/multiselect';
import { useTranslation } from "react-i18next";

export default function CustomMultiSelect({ options, onChange, label, placeholder, value }) {
    const { i18n } = useTranslation();

    return (

        <div className="my-5">
            <label className={`block text-xs font-bold mb-1 mx-1  ${i18n.language === 'ar' ? 'text-right arabic-font' : ''}`}>{placeholder} </label>
            <div className="border-2 py-1 ">

                <MultiSelect value={value} onChange={onChange} options={options} optionLabel={label}
                    filter placeholder={placeholder} maxSelectedLabels={3} className="w-full md:w-20rem focus:outline-none focus:ring-0 focus:border-blue-500" />
            </div>
        </div>
    )
}
