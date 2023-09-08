/* eslint-disable react/prop-types */
import { UserContext } from "../../Context/UserContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.register(

    Tooltip,
    Legend
);



export function VisitedChart() {

    const { urlData } = UserContext();
    const filteredData = urlData ? urlData.map(data => data.visitedCount ? data.visitedCount : 0) : [];
    const length = filteredData.length;
    const visitedOnce = filteredData.filter(count => count === 1).length || 0;
    const visitedMany = filteredData.filter(count => count > 1).length || 0;
    const visitedNone = filteredData.filter(count => count === 0).length || 0;
    
    const options = {

        responsive: true,
        plugins: {
            tooltip: {
                enabled: true,
                backgroundColor: "rgb(107,14,151)",
                bodyColor: "white",
                titleFont: {
                    size: 22
                },
                bodyFont: {
                    size: 17
                },
                padding: 5,
                titleColor: 'yellow'
            },
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 20,
                        weight: 'bold',
                    },
                    color: 'black',
                }
            },
            title: {
                display: true,
                text: `Chart of URL's Visited`,
                color: 'black',
                font: {
                    size: 28
                }
            },
        },

    };

    const data = {
        labels: ['Visited More than once','Visited only once','Visited not even once'],
        datasets: [
            {
                label: 'Visited %',
                data: [visitedMany/length*100,visitedOnce/length*100,visitedNone/length*100] || [],
                backgroundColor: [
                    '#D2B48C',
                    '#3EB489',
                    '#ffb6c1',
                  ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                  ],
                  
            },
        ],
    };
    return <Doughnut
        data={data}
        options={options}
    />;
}
