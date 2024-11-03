import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Setting } from '../../utilties/Setting';
import { useTheme } from '../../context/ThemeContext';

// Register necessary components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default function TaskStatistics() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { theme } = useTheme();

    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get(`${Setting.url}tasks/worker/statistics`); // Adjust the URL as needed
              const workers = response.data;
              const labels = workers.map(item => item.name);
              const data = workers.map(item => item.count);

              setChartData({
                  labels: labels,
                  datasets: [{
                      label: 'Worker Statistics',
                      data: data,
                      backgroundColor: ['#4c0054','#873e23' , '#d24608'],
                  }],
              });
          } catch (error) {
              console.error('Error fetching data:', error);
              setError('Failed to load data');
          } finally {
              setLoading(false);
          }
      };

      fetchData();
  }, [theme]);


  return (
    <div className='bg-white'>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <Pie
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Worker Statistics',
                            },
                        },
                    }}
                />
            )}
        </div>
  )
}
