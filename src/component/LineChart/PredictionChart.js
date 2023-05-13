import React from 'react'
import { Line } from "react-chartjs-2";
import { predict } from "../../mock/api/predict";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
const PredictionChart = ({name}) => {
    const [data,setData]=React.useState(predict.result)

    const options = {
        scales: {
          x: {
            ticks: {
              font: {
                size: 14,
              },
              color: "black",
            },
          },
        },
           y: {
            ticks: {
              font: {
                size: 15,
              },
              color: "black",
           },
        },
    
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: `${name}`,
            font: {
              size: 25,
              family: "Poppins, sans-serif",
            },
          },
        },
      };

      const labels = data.map((item) => {
        return Object.keys(item);
      });    

      const predictdata = {
        labels,
        datasets: [
          {
            label: "actual",
            borderColor: "rgb(53, 162, 235)",
            data: data.map((item) => {
              return item[Object.keys(item)].actual;
            }),
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
          {
            label: "predict",
            borderColor: "rgb(255, 99, 132)",
            data: data.map((item) => {
              return item[Object.keys(item)].predict;
            }),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      };
    
  return (
    <Line style={{ width: "100%" }} options={options} data={predictdata} />
  );
}

export default PredictionChart