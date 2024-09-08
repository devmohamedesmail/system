import React from "react";
import { Dropdown } from 'primereact/dropdown';

export default function CustomSelectOption({value,onchange,options,labelTitle,placeholder}) {
  return (
    <div className="rounded-lg border-2 overflow-hidden">
      <Dropdown
        value={value}
        onChange={onchange}
        options={options}
        optionLabel={labelTitle}
        placeholder={value ? value : placeholder}
        className="w-full md:w-14rem"
      />
    </div>
  );
}
