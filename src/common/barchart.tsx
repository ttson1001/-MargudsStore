import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LossesBarChart = () => {
  // Data for losses by month
  const lossData = [
    { month: "January", losses: 5 },
    { month: "February", losses: 3 },
    { month: "March", losses: 7 },
    { month: "April", losses: 4 },
    { month: "May", losses: 6 },
    { month: "June", losses: 8 },
    { month: "July", losses: 2 },
    { month: "August", losses: 5 },
    { month: "September", losses: 9 },
    { month: "October", losses: 6 },
    { month: "November", losses: 4 },
    { month: "December", losses: 7 },
  ];

  // Preparing data for the chart
  const data = {
    labels: lossData.map((d) => d.month), // x-axis labels (Months)
    datasets: [
      {
        label: "Number of Losses",
        data: lossData.map((d) => d.losses), // y-axis data (Losses)
        backgroundColor: "rgba(255, 99, 132, 0.5)", // Color for bars
        borderColor: "rgba(255, 99, 132, 1)", // Border color for bars
        borderWidth: 1,
      },
    ],
  };

  // Chart configuration options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const, // Fix: explicitly define 'top' as one of the allowed values
      },
      title: {
        display: true,
        text: "Losing Statistics by Month",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Losses",
        },
      },
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
    },
  };

  return (
    <div style={{ width: "800px", margin: "0 auto" }}>
      <h2>Losing Statistics by Month</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default LossesBarChart;
