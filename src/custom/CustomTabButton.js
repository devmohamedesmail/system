import React from 'react';
import { Link } from 'react-router-dom';

export default function CustomTabButton({ link, title, isActive, onTabChange }) {
    return (
        <Link
            to={link}
            className={`transition-all ease-in-out font-semibold  px-8 py-3 rounded-md mx-1 text-sm border border-light-mode ${isActive ? 'bg-light-mode text-white' : 'bg-secondary'}`}
            onClick={() => onTabChange(link)}
        >
            {title}
        </Link>
    );
}