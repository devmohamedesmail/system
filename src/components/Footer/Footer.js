import React, { useState,useEffect } from 'react'

export default function Footer() {
    const [date,setDate]= useState(new Date())
    useEffect(() => {
        const intervalId = setInterval(() => {
            setDate(new Date());
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);
  return (
    <div className="bg-primary fixed bottom-0 left-0 right-0 py-2 px-2 text-sm  text-white">
    {date.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
  </div>
  )
}
