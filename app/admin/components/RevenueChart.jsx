"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function RevenueChart({ items }) {
  const data = {
    labels: items?.map((item) => item?.date),
    datasets: [
      {
        label: "Revenue",
        data: items?.map((item) => (item?.data?.totalRevenue ?? 0) / 100),
        backgroundColor: "#5E121D10",
        borderColor: "#5E121D",
        pointBackgroundColor: "#EBD1C4",
        pointBorderColor: "#5E121D",
        pointHoverRadius: 6,
        borderWidth: 2,
        tension: 0.4,
        fill: true
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#5E121D",
          font: {
            weight: "600"
          }
        }
      },
      title: {
        display: true,
        text: "Revenue Trends",
        color: "#5E121D",
        font: {
          size: 18,
          family: "serif"
        }
      },
      tooltip: {
        backgroundColor: "#EBD1C4",
        titleColor: "#5E121D",
        bodyColor: "#5E121D",
        borderColor: "#5E121D20",
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: "#5E121DB0"
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#EBD1C440"
        },
        ticks: {
          color: "#5E121DB0",
          callback: (value) => `₹${value}`
        }
      }
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 8
      }
    }
  };

  return (
    <section className="bg-white p-5 rounded-xl shadow-lg border border-[#EBD1C4] w-full h-[430px]">
      <Line data={data} options={options} />
    </section>
  );
}
