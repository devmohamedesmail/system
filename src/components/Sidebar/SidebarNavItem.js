import React from 'react'
import { Link } from 'react-router-dom'

export default function SidebarNavItem({icon,link,title}) {
    return (
        <li className='flex items-center hover:bg-primary  pl-5 hover:text-white nav-item transition-colors duration-1000 ease-in-out my-2'>
            {icon}
            <Link to={link} className="block p-2 text-black nav-link text-sm">{title}</Link>
        </li>
    )
}
