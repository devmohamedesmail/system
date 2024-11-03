import React from "react";


export default function CustomSelect({ value, onchange, title,data, key = "id",itemtitle = "itemTitle",itemvalue = "itemValue" }) {
  return (
    <div className="mx-3 flex justify-center w-full">
      <select
        id="example-select"
        value={value}
        onChange={onchange}
        className="border rounded-full w-full p-2 bg-secondary text-white"
      >
        <option value="0">{title}</option>
        {data.map((item) => (
          <option key={item[key]} value={item[itemvalue]}>
            {item[itemtitle]}
          </option>
        ))}
      </select>
    </div>
  );
}
