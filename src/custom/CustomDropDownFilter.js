import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { useTranslation } from "react-i18next";


export default function CustomDropDownFilter({ value, onChange, options, label, placeholder, searchItem }) {

 const { t,i18n } = useTranslation();

    const selectedCountryTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">

                    <div>{option[searchItem]}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const countryOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option[searchItem]}</div>
            </div>
        );
    };

    return (
        <div className="my-5">
            <label className={`block text-xs font-bold mb-1 mx-1  ${i18n.language === 'ar' ? 'text-right arabic-font' : ''}`}>{placeholder} </label>
            <div className="border-2 py-1 ">
                <Dropdown
                    value={value}
                    onChange={onChange}
                    options={options}
                    optionLabel={label}
                    placeholder={placeholder}
                    filter
                    valueTemplate={selectedCountryTemplate}
                    itemTemplate={countryOptionTemplate}
                    className="w-full md:w-14rem focus:outline-none focus:shadow-none focus:border-none"
                    filterBy={searchItem}
                />
            </div>
        </div>
    )
}
