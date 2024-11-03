import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Setting } from '../../utilties/Setting';
import { useTheme } from '../../context/ThemeContext';
import CustomLoading from '../../custom/CustomLoading';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default function InvoicesStatistics() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();


  useEffect(() => {

    axios.get(`${Setting.url}invoices/statics`)
      .then(response => {
        const branches = response.data;
        const labels = branches.map(branch => branch.branch_name);
        const data = branches.map(branch => branch.invoice_count);

        setChartData({
          labels: labels,
          datasets: [{
            label: 'Number of Invoices',
            data: data,
            backgroundColor: theme === 'light' ? '#4c0054' : '#CCFF00',
            borderColor: theme === 'light' ? '#4c0054' : '#CCFF00',
            borderWidth: 1,
          }],
        });

        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [theme]);
  return (
    <div className='bg-white'>
      {loading ? (
        <CustomLoading />
      ) : (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Number of Invoices per Branch',
              },
            },
          }}
        />
      )}
    </div>
  )
}
