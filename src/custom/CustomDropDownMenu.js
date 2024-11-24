import React,{useState} from "react";
import { Dropdown } from "primereact/dropdown";

export default function CustomDropDownMenu({
  value,
  onchange,
  options,
  optionLabel,
  placeholder,
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
  
    <div className={`border-2 ${isFocused ? 'border-primary' : 'border-light border-2'} rounded`}>
      <Dropdown
        value={value}
        onChange={onchange}
        options={options}
        optionLabel={optionLabel}
        placeholder={value ? value : placeholder}
        className={`w-full md:w-14rem focus:shadow-none shadow-none border-slate-200 ${isFocused ? 'border-primary ' : 'focus:border-gray-300 shadow-slate-200 '} rounded`}
    
        checkmark={true}
        onFocus={() => setIsFocused(true)} // Set focus state to true
        onBlur={() => setIsFocused(false)}
        highlightOnSelect={false}
      />
    </div>
  
  );
}
