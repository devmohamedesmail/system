import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'

export default function CustomLoading() {
  return (
  <div className='flex justify-center items-center'>
      <ThreeCircles
    visible={true}
    height="50"
    width="50"
    color="#eb5e28"
    ariaLabel="three-circles-loading"
    wrapperStyle={{}}
    wrapperClass=""
    />
  </div>
  )
}
