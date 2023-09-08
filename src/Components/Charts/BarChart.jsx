/* eslint-disable react/prop-types */
import { UserContext } from "../../Context/UserContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



export function Chart({ chartMonth }) {
  const curMonth = +chartMonth.split('-')[1]
  const { urlData } = UserContext();
  const filteredData = urlData ? urlData.map(data => data.created).filter(date => new Date(date).getMonth() + 1 === curMonth) : [];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const curMonthName = months[curMonth - 1]
  const countDate = {}

  const date = new Date();
  const year = date.getFullYear();
  const noOfDays = new Date(year, curMonth, 0).getDate();

  let labels = Array.from({ length: noOfDays }, (v, i) => i + 1);

  labels.forEach(day=>{
    countDate[day] = 0;
  })
  filteredData.forEach(date => {
    const createdDt = new Date(date).getDate();

    if (countDate[createdDt]) {
      countDate[createdDt]++;
    }
    else {
      countDate[createdDt] = 1;
    }
  });
  
  const length = filteredData.length;
  const options = {

    responsive: true,
    scales: {
      x: {
        ticks: {
          color: 'black',
          font: {
            size: 14,
            weight: 'bold',
          }
        },
        grid: {
          display: false
        }
      },
      y: {
        ticks: {
          color: 'black',
          font: {
            size: 14,
            weight: 'bold',
          },
          grid: {
            display: false
          }
        }
      }
    },
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: "rgb(107,14,151)",
        bodyColor: "white",
        titleFont: {
          size: 17
        },
        bodyFont: {
          size: 17
        },
        padding: 5,
        titleColor: 'yellow'
      },
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 17,
            weight: 'bold',
          },
          color: 'black',
        }
      },
      title: {
        display: true,
        text: `No  of URL's Shortened in ${curMonthName} - ${length ? length : 'None'}`,
        color: 'black',
        font: {
          size: 20
        }
      },
    },

  };

  const data = {
    labels: labels.map(day => `${day}`),
    datasets: [
      {
        label: length !== 0 ? ' Count of URLs' : 'No URL Shortened',
        data: Object.values(countDate) || [],
        backgroundColor: length !== 0 ? '#b10c0c' : '#9BD0F5',
      },
    ],
  };
  return <Bar
    data={data}
    options={options}
  />;
}
