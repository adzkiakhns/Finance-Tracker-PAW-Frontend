"use client";

import { Column, Tiny } from "@ant-design/plots";
import React, { useState, useEffect } from "react";
import { axios } from "@/lib/axios";
import { IoDiamondOutline, IoFastFoodOutline } from "react-icons/io5";
import { BsBoxArrowUpLeft } from "react-icons/bs";
import { BsBank } from "react-icons/bs";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { ImSpoonKnife } from "react-icons/im";
import { Sidebar } from "@/components/sidebar";
import { useSession } from "next-auth/react";
import { IoSearchSharp } from "react-icons/io5";
import { StatsCard, StatsDashboard, CategoriesTable } from "@/components/dashboard";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const { data: session } = useSession();

  useEffect(() => {
    // Get the current year and month
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    const fetchFinancialData = async () => {
      try {
        const response = await axios.get(`/api/financial/${year}/${month}`);
        const apiData = response.data;

        const transformedData = apiData.flatMap((item) => [
          { week: `${item.week} Week`, value: item.totalIncome, type: "Income" },
          { week: `${item.week} Week`, value: item.totalExpenses, type: "Expense" },
        ]);

        setData(apiData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchIncomeData = async () => {
      try {
        const startDate = "2024-01-01";
        const endDate = "2024-12-31";

        const response = await axios.get(`/api/income/daterange?startDate=${startDate}&endDate=${endDate}`);

        const incomeApiData = response.data;
        setIncomeData(incomeApiData);
      } catch (error) {
        console.error("Error fetching income data:", error);
      }
    };

    fetchFinancialData();
    fetchIncomeData();
  }, [currentDate]);

  const columnConfig = {
    data: data.flatMap((item) => [
      { week: `${item.week} Week`, value: item.totalIncome, type: "Income" },
      { week: `${item.week} Week`, value: item.totalExpenses, type: "Expense" },
    ]),
    isGroup: true,
    xField: "week",
    yField: "value",
    seriesField: "type",
    columnStyle: {
      radius: [10, 10, 0, 0],
    },
    style: {
      fill: ({ type }) => {
        if (type === "Income") {
          return "rgba(0, 104, 255, 0.6)";
        }
        return "rgba(0, 208, 158, 0.6)";
      },
      radiusTopLeft: 10,
      radiusTopRight: 10,
    },
  };

  // Data for the ring chart
  const percent = 0.7;
  const ringConfig = {
    percent,
    width: 120,
    height: 120,
    color: ["#E8EFF5", "#66AFF4"],
    annotations: [
      {
        type: "text",
        position: ["50%", "50%"],
        content: `${percent * 100}%`,
        style: {
          fontSize: 16,
          fontWeight: "bold",
          textAlign: "center",
        },
      },
    ],
  };

  const iconMap = {
    Jewelry: <IoDiamondOutline className="w-5 h-5 text-white" />,
    Makanan: <IoFastFoodOutline className="w-5 h-5 text-white" />,
    Other: <BsBoxArrowUpLeft className="w-5 h-5 text-white" />,
    Food: <IoFastFoodOutline className="w-5 h-5 text-white" />,
  };

  return (
    <div className="min-h-screen w-full pl-0 md:pl-64 bg-gray-50">
      <Sidebar />
      <div className="min-h-screen bg-gray-50 p-8 text-black">
        <div className="w-full flex flex-row justify-between">
          <h1 className="text-xl text-black mb-8">Hello, {session?.user?.name ?? ""} 👋🏼</h1>
          <div className="relative flex flex-row h-full">
            <IoSearchSharp className="w-5 h-5 text-gray-500 z-10 absolute left-1 top-1/2 -translate-y-1/2" />
            <input className="relative px-3 pl-7 rounded z-0 h-full py-3" placeholder="search..." />
          </div>
        </div>

        <StatsCard />
        <StatsDashboard />
        <CategoriesTable />
      </div>
    </div>
  );
}
