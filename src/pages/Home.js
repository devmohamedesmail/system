import React,{useState,useEffect} from 'react'
import CustomPageTitle from '../custom/CustomPageTitle'
import { Chart } from 'primereact/chart';
import axios from 'axios';
import { Setting } from '../utilties/Setting';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import InvoicesStatistics from './Statistics/InvoicesStatistics';
import SalesStatistics from './Statistics/SalesStatistics';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default function Home() {
 

  return (
    <div className="p-4">
      <CustomPageTitle title='Dashboard' />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2 my-3'>
      
      <div className='bg-white'> <InvoicesStatistics /></div>
      <div className='bg-white'> <SalesStatistics /></div>
    
     </div>
    </div>
  )
}
