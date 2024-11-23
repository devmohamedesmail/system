import React from 'react'
import logoimage from './logo.png'

export default function Logo({width}) {
  
  return (
    <div>
        <img src={logoimage} width={width} alt='logo' />
    </div>
  )
}
