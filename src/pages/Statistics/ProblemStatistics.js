import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Setting } from '../../utilties/Setting';
import { useTheme } from '../../context/ThemeContext';
import CustomLoading from '../../custom/CustomLoading';

export default function ProblemStatistics() {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();

    useEffect(() => {

        axios.get(`${Setting.url}problems/statistics`)
            .then(response => {
                const problem = response.data;
                const labels = problem.map(item => item.name);
                const data = problem.map(item => item.count);

                setChartData({
                    labels: labels,
                    datasets: [{
                        label: 'Worker Problems',
                        data: data,
                        backgroundColor: ['#4c0054','#873e23' , '#d24608'],
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
                        text: 'Statistics of Problems',
                    },
                },
            }}
        />
    )}
</div>
  )
}
