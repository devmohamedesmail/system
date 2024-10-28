import React from "react";
import { FaDownload } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";



export default function TableButton({onclick,title}) {
  const { theme } = useTheme();
  return (
    <button
      onClick={onclick}
      className={` ${theme === 'light'? 'bg-light-mode text-white':'bg-primary text-black'} px-5 py-2 flex items-center rounded-full text-sm `}
    >
      <span className="mx-1">{title}</span>
         <FaDownload />
    </button>
  );
}
