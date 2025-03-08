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

const LineGraph = ({ netIncome, selectedView }) => {
  const sortedNetIncome = netIncome.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const filteredNetIncome = sortedNetIncome.reduce((acc, entry) => {
    const date = new Date(entry.date);
    let key;

    if (selectedView === "Month") {
      key = date.toLocaleString("default", { month: "long", year: "numeric" });
    } else if (selectedView === "Date") {
      key = date.toLocaleDateString();
    } else {
      key = date.getFullYear();
    }

    if (!acc[key]) {
      acc[key] = { date: key, netIncome: 0 };
    }
    acc[key].netIncome += entry.netIncome;
    return acc;
  }, {});

  const dates = Object.keys(filteredNetIncome);
  const incomeValues = Object.values(filteredNetIncome).map(
    (entry) => entry.netIncome
  );

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
