"use client";

import { Column, Tiny } from "@ant-design/plots";
import React from "react";

export default function Dashboard() {
  // Data for the bar chart
  const data = [
    { week: "1st Week", value: 1000, type: "Income" },
    { week: "2nd Week", value: 3000, type: "Income" },
    { week: "3rd Week", value: 5000, type: "Income" },
    { week: "4th Week", value: 8000, type: "Income" },
    { week: "1st Week", value: 800, type: "Expense" },
    { week: "2nd Week", value: 2000, type: "Expense" },
    { week: "3rd Week", value: 4000, type: "Expense" },
    { week: "4th Week", value: 3000, type: "Expense" },
  ];

  const columnConfig = {
    data,
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

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-black">
      <h1 className="text-3xl font-bold text-center mb-8">Expense & Income Management</h1>

      {/* Column Chart Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 aspect-[3/1] mb-8">
        <Column {...columnConfig} />
      </div>

      {/* Income & Expense Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: List of Transactions */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center mb-8">
            <div className="bg-blue-100 rounded-full p-3">
              <svg
                className="w-6 h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3"></path>
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-bold">Salary</h2>
              <p className="text-sm text-gray-500">18:27 - April 30</p>
              <p className="text-sm text-gray-500">Monthly</p>
            </div>
            <div className="ml-auto text-lg font-bold text-green-600">$4,000.00</div>
          </div>

          <div className="flex items-center mb-8">
            <div className="bg-blue-100 rounded-full p-3">
              <svg
                className="w-6 h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3"></path>
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-bold">Groceries</h2>
              <p className="text-sm text-gray-500">17:00 - April 24</p>
              <p className="text-sm text-gray-500">Pantry</p>
            </div>
            <div className="ml-auto text-lg font-bold text-red-600">- $100.00</div>
          </div>

          <div className="flex items-center mb-8">
            <div className="bg-blue-100 rounded-full p-3">
              <svg
                className="w-6 h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3"></path>
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-bold">Rent</h2>
              <p className="text-sm text-gray-500">8:30 - April 15</p>
              <p className="text-sm text-gray-500">Rent</p>
            </div>
            <div className="ml-auto text-lg font-bold text-red-600">- $674.40</div>
          </div>
        </div>

        {/* Right Side: Savings Goals & Summary */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-8">
            <div className="text-lg font-bold text-green-600">Savings on Goals</div>
            {/* Replaced SVG with Tiny.Ring */}
            <Tiny.Ring {...ringConfig} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold">Revenue Last Week</h3>
              <p className="text-xl font-bold text-green-600">$4,000.00</p>
            </div>

            <div>
              <h3 className="text-sm font-bold">Food Last Week</h3>
              <p className="text-xl font-bold text-red-600">- $100.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
