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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineGraph = ({ netIncome }) => {
  const dates = netIncome.map((entry) => entry.date);
  const incomeValues = netIncome.map((entry) => entry.netIncome);

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

  return <Line data={data} />;
};

export default LineGraph;
