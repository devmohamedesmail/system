import React from 'react'
import { Link } from 'react-router-dom'

export default function SocialLoginButton({link,image,title}) {
    return (
        <Link to={link} className=' w-12 h-12 rounded-full bg-slate-200 flex justify-center items-center hover:scale-110 hover:transition-transform ease-in-out duration-700'>
            <img src={image} width='25px' alt='login' />
            {/* <p className='text-xs text-nowrap mx-3'>{title}</p> */}
        </Link>
    )
}
