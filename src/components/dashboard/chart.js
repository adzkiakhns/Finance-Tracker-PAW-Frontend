import React from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Image from "next/image";

const data = [
  { name: "1st Week", earning: 50, expenses: 80 },
  { name: "2nd Week", earning: 50, expenses: 200 },
  { name: "3rd Week", earning: 100, expenses: 80 },
  { name: "4th Week", earning: 40, expenses: 80 },
];

export function StatsDashboard() {
  return (
    <div className="grid md:grid-cols-2 gap-6 bg-gray-50 h-full">
      {/* Monthly Earning Overview */}
      <div className="bg-white rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Overview</h3>
            <p className="text-sm text-gray-500">Monthly Earning</p>
          </div>
          <div className="text-gray-500 text-sm bg-gray-100 px-3 py-1 rounded-md">April</div>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#999" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
              formatter={(value, name) => (name === "expenses" ? `Expenses: ${value}k` : `Earning: ${value}k`)}
            />
            <Bar dataKey="earning" fill="#FF9F43" radius={[5, 5, 0, 0]} />
            <Bar dataKey="expenses" fill="#FF4D4F" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Progress Tracker */}
      <div className="bg-white rounded-xl  p-6 flex flex-col items-center">
        <h3 className="text-xl font-bold text-gray-800">Reach your Goal</h3>
        <p className="text-sm text-gray-500 mb-4">Progress Tracker</p>
        <div className="w-48 h-48 relative text-black">
          <div className="flex items-center justify-center flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <Image src="/car.svg" width={42} height={42} alt="Car" />
            <p className="text-lg font-bold">55%</p>
            <p className="text-xs text-center">Savings on Goal</p>
          </div>
          <CircularProgressbar
            className="z-0"
            strokeWidth={15}
            value={75}
            styles={buildStyles({
              pathColor: "rgb(255, 99, 71)",
              textColor: "rgb(34, 34, 34)",
              trailColor: "#d6d6d6",
            })}
          />
        </div>
      </div>
    </div>
  );
}
export default StatsDashboard;
