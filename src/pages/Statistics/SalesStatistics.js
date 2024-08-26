
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Setting } from '../../utilties/Setting';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);


export default function SalesStatistics() {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        axios.get(`${Setting.url}sales/statics`)
          .then(response => {
            const names = response.data;
            const labels = names.map(item => item.name);
            const data = names.map(item => item.count);
    
            setChartData({
              labels: labels,
              datasets: [{
                label: 'Number of Occurrences',
                data: data,
                backgroundColor: '#eb5e28',
                borderColor: '#eb5e28',
                borderWidth: 1,
              }],
            });
    
            setLoading(false);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            setLoading(false);
          });
      }, []);
    
  return (
    <div>
    {loading ? (
      <p>Loading...</p>
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
              text: 'Occurrences of Each Name in Sales Column',
            },
          },
        }}
      />
    )}
  </div>
  )
}
