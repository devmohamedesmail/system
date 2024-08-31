import React from 'react'
import { Link } from 'react-router-dom'

export default function SidebarDropdownItem({ icon, link, title }) {
    return (
        <li className='flex items-center px-4 hover:bg-primary '>
            {icon}
            <Link
                to={link}
                className="block p-4 pl-8 flex-1 text-black text-xs hover:text-white">
                {title}
            </Link>
        </li>
    )
}
