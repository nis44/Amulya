"use client";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function OrdersChart({ items }) {
  const data = {
    labels: items?.map((item) => item?.date),
    datasets: [
      {
        label: "Orders",
        data: items?.map((item) => item?.data?.totalOrders),
        backgroundColor: "#5E121D40",
        borderColor: "#5E121D",
        hoverBackgroundColor: "#8A1A2B",
        borderWidth: 1.5,
        borderRadius: 8,
        barThickness: 32,
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
        text: "Order Trends",
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
          callback: (value) => `${value} Orders`
        }
      }
    },
    animation: {
      duration: 2000
    }
  };

  return (
    <section className="bg-white p-5 rounded-xl shadow-lg border border-[#EBD1C4] w-full h-[430px]">
      <Bar data={data} options={options} />
    </section>
  );
}
