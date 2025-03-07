import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";

// Registering the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// LineGraph component definition
const LineGraph = ({ netIncome }) => {
  // Sort the netIncome array by date
  const sortedNetIncome = netIncome.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Extracting dates and income values from the sorted netIncome prop
  const dates = sortedNetIncome.map((entry) => entry.date);
  const incomeValues = sortedNetIncome.map((entry) => entry.netIncome);

  // Defining the data structure for the chart
  const data = {
    labels: dates,
    datasets: [
      {
        label: "Net Income",
        data: incomeValues,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  // Rendering the Line component with the prepared data
  return <Line data={data} />;
};

export default LineGraph;
