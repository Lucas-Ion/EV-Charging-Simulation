import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ExemplaryDayChartProps {
  data: number[]; // Array of data points for the chart
}

// Component to display the charging values on an exemplary day
const ExemplaryDayChart: React.FC<ExemplaryDayChartProps> = ({ data }) => {

  if (!data || data.length === 0) {
    return <p>No exemplary day data available.</p>; // Handle case where no data is available
  }

  // Prepare data for the chart
  const chartData = {
    labels: Array.from({ length: data.length }, (_, i) => i), // Generate labels based on data length
    datasets: [
      {
        label: 'Exemplary Day Charging Values (kW)',
        data: data,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: false,
      },
    ],
  };

  // Chart options
  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (15-minute intervals)',
        },
        type: 'linear' as const, // Ensures TypeScript understads this is a valid type
      },
      y: {
        title: {
          display: true,
          text: 'Power (kW)',
        },
      },
    },
  };

  return (
    <div>
      <h2>Charging Values on a Random Day</h2>
      <Line data={chartData} options={options} /> {/* Render the chart */}
    </div>
  );
};

export default ExemplaryDayChart; // Export the component
