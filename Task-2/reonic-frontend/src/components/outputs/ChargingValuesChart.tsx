import React from 'react';
import { Line } from 'react-chartjs-2';

interface ChargingValuesChartProps {
  data: number[]; // Array of daily power demand values
}

// Component to display the daily power demand chart
const ChargingValuesChart: React.FC<ChargingValuesChartProps> = ({ data }) => {
  // Prepare data for the chart
  const chartData = {
    labels: Array.from({ length: data.length }, (_, i) => `Day ${i + 1}`), // Labels for each day
    datasets: [
      {
        label: 'Daily Power Demand (kW)',
        data,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  // Chart options
  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Day',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Power Demand (kW)',
        },
      },
    },
  };

  return (
    <div>
      <h2>Daily Power Demand</h2>
      <Line data={chartData} options={options} /> {/* Render the chart */}
    </div>
  );
};

export default ChargingValuesChart; // Export the component
