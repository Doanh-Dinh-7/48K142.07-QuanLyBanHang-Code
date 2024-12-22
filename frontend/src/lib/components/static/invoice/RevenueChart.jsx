import React, { useEffect } from "react";
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

// Đăng ký các thành phần cần thiết của ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = ({ data, timeUnit, startDate, endDate }) => {
  // Xử lý dữ liệu dựa trên mốc thời gian và nếu ngày bắt đầu và ngày kết thúc hợp lệ thì lọc dữ liệu
  const aggregateRevenue = () => {
    const groupedData = {};

    for (const invoice of data) {
      let key;
      const date = new Date(invoice.NgayLap).toISOString().split("T")[0];
      if (timeUnit === "day") {
        key = date;
      } else if (timeUnit === "month") {
        key = date.slice(0, 7); // Nhóm theo tháng (YYYY-MM)
      } else if (timeUnit === "year") {
        key = date.slice(0, 4); // Nhóm theo năm (YYYY)
      }

      if (startDate && endDate) {
        if (
          date >= new Date(startDate).toISOString().split("T")[0] &&
          date <= new Date(endDate).toISOString().split("T")[0]
        ) {
          groupedData[key] = (groupedData[key] || 0) + invoice.TongTien;
        }
      } else {
        groupedData[key] = (groupedData[key] || 0) + invoice.TongTien;
      }
    }
    // Sắp xếp dữ liệu theo thời gian tăng dần
    const sortedData = Object.keys(groupedData)
      .sort()
      .reduce((obj, key) => {
        obj[key] = groupedData[key];
        return obj;
      }, {});
    return sortedData;
  };

  const groupedRevenue = aggregateRevenue();

  const labels = Object.keys(groupedRevenue);
  const revenues = Object.values(groupedRevenue);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Doanh thu",
        data: revenues,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Tổng doanh thu theo ${
          timeUnit === "day" ? "ngày" : timeUnit === "month" ? "tháng" : "năm"
        }`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => value.toLocaleString(),
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default RevenueChart;
