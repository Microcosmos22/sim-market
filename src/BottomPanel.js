import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { Line } from 'react-chartjs-2'; // Import Line chart from react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'; // Import necessary Chart.js components

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BottomPanel = ({ response }) => {
  const [chartData, setChartData] = useState(null);

  // Chart.js options for customizing the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Position of the legend
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`; // Format the tooltip label
          },
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Log(Error)', // Y-axis label
        },
      },
      x: {
        title: {
          display: true,
          text: 'Training Time / Epochs', // X-axis label
        },
      },
    },
  };

  useEffect(() => {
    if (response?.error && response?.val) {
      const formattedData = {
        labels: response.error.map((_, index) => index + 1), // Epoch numbers for X-axis
        datasets: [
          {
            label: 'Error', // Label for error dataset
            data: response.error, // Error data
            borderColor: 'rgba(255, 99, 132, 1)', // Line color for error
            backgroundColor: 'rgba(255, 99, 132, 0.2)', // Area under the line (optional)
            fill: false, // No fill under the line
            borderWidth: 2,
          },
          {
            label: 'Validation Error', // Label for validation error dataset
            data: response.val, // Validation error data
            borderColor: 'rgba(54, 162, 235, 1)', // Line color for validation error
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Area under the line (optional)
            fill: false, // No fill under the line
            borderWidth: 2,
          },
        ],
      };
      setChartData(formattedData); // Update the chart data state
    }
  }, [response]); // Dependency array to re-run the effect when response changes

  return (
    <div className="bg-gray-700 p-4 shadow-lg rounded-lg">
      <h3 className="text-white"> Training Curves</h3>
      {chartData && <Line data={chartData} options={options} />} {/* Render the Line chart */}
    </div>
  );
};

export default BottomPanel;
