import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

const InternetUsersChart = () => {
    const [selectedInterval, setSelectedInterval] = useState(''); // Default to 'month'
    const [chartData, setChartData] = useState(null);
    const [options, setOptions] = useState({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Growth of Straking Users'
        },
        xAxis: {
            categories: [] // Dynamically update based on interval
        },
        yAxis: {
            title: {
                text: 'Number of Users'
            }
        },
        series: [{
            name: 'Internet Users',
            data: [] // Dynamically update based on interval
        }],
        credits: {
            enabled: false // Disable credits to remove the watermark
        }
    });

    const adminUrl = 'http://103.181.21.93:8099/api/v1/admin/get_graph_data';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${adminUrl}?interval=${selectedInterval}`);
                setChartData(response.data);

            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        };

        fetchData();
    }, [selectedInterval]);

    useEffect(() => {
        if (chartData) {
            const newData = chartData.message.map(item => ({
                y: item.count,
                name: String(item.timeLabel).toUpperCase() // Adjust based on your API response structure
            }));

            setOptions(prevOptions => ({
                ...prevOptions,
                xAxis: {
                    categories: chartData.categories // Adjust based on your API response structure
                },
                series: [{
                    ...prevOptions.series[0],
                    data: newData
                }]
            }));
        }
    }, [chartData]);

    return (
        <div className="">
            <div className="interval-selector">
                <button onClick={() => setSelectedInterval('day')}>Day</button>
                <button onClick={() => setSelectedInterval('month')}>Month</button>
                <button onClick={() => setSelectedInterval('year')}>Year</button>
            </div>
            {chartData ? (
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                    containerProps={{ style: { height: '400px' } }}
                />
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default InternetUsersChart;
