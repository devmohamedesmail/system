import React from 'react'
import { useTheme } from '../../context/ThemeContext'
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

export default function SwitchMode() {
    const { theme, toggleTheme } = useTheme();
    return (
        <div className={`app ${theme}`}>
            <button onClick={toggleTheme} className='text-white'>
                {theme === 'light' ? <MdDarkMode size={24} color='gold' /> : <MdLightMode size={24} color='' />} 
            </button>
        </div>
    )
}
