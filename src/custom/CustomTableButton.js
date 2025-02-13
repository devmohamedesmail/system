import React from "react";
import { FaDownload } from "react-icons/fa";

export default function CustomTableButton({ onclick, title }) {
  return (
    <button
      onClick={onclick}
      className="bg-light-mode text-white px-5 py-2 mx-2 flex items-center rounded-full text-sm hover:bg-secondary transition-colors ease-in-out duration-300"
    >
      <span className="mx-1 text-white">{title}</span>
      <FaDownload />
    </button>
  );
}
