import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function CustomHomeCard({image,title,url}) {
  const { theme } = useTheme();

  return (
    <Link to={url} className={`rounded-lg shadow-lg p-4 flex flex-col items-center justify-center hover:cursor-pointer ${theme === 'light'? 'bg-white':'bg-secondary'}`} >
        <img src={image} width='100px' alt={title} />
        <h6 className={`mt-5 ${theme === 'light'? 'text-black':'text-primary'}`}>{title}</h6>
    </Link>
  )
}
