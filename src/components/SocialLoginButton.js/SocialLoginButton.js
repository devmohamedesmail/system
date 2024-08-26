import React from 'react'
import { Link } from 'react-router-dom'

export default function SocialLoginButton({link,image,title}) {
    return (
        <Link to={link} className='bg-slate-200 flex p-3 mx-2 flex-1 rounded-lg items-center hover:scale-110 hover:transition-transform ease-in-out duration-700'>
            <img src={image} width='25px' alt='login' />
            <p className='text-xs text-nowrap mx-3'>{title}</p>
        </Link>
    )
}
