import React from "react";
import { Calendar } from "primereact/calendar";
export default function CustomCalender({value,onchange,placeholder}) {
  return (
    <div className="border flex items-center p-3 rounded-md ">
      <Calendar
        value={value}
        onChange={onchange}
        placeholder={placeholder}
        className="w-full shadow-none"
        showTime hourFormat="12"
        showIcon
      />
      
    </div>
  );
}
