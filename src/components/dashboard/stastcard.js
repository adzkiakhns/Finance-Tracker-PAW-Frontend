"use client";

import Image from "next/image";
import { useGetBalance, useGetBalanceProgress } from "@/hooks/balance";
import { useGetMonthlyExpenses } from "@/hooks/expenses";
import { useGetMonthlyIncome } from "@/hooks/income";
function numberWithDot(x) {
  if (!x) return "0";
  var parts = x?.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return parts.join(".");
}
export function StatsCard() {
  const { data: balanceData } = useGetBalance();
  const { data: progressData } = useGetBalanceProgress();

  const { data: incomeData } = useGetMonthlyIncome();
  const { data: expenseData } = useGetMonthlyExpenses();

  // Calculate income percentage change
  const incomeChange =
    incomeData && incomeData.length > 1
      ? ((incomeData[incomeData.length - 1].totalIncome - incomeData[incomeData.length - 2].totalIncome) /
          incomeData[incomeData.length - 2].totalIncome) *
        100
      : 0;

  // Calculate expense percentage change
  const expenseChange =
    expenseData && expenseData.length > 1
      ? ((expenseData[expenseData.length - 1].totalExpenses - expenseData[expenseData.length - 2].totalExpenses) /
          expenseData[expenseData.length - 2].totalExpenses) *
        100
      : 0;

  return (
    <div className="flex items-center justify-center h-full bg-gray-50">
      {/* Card Container */}
      <div className="relative flex flex-row gap-3 justify-center flex-wrap items-center md:justify-around w-full p-6 bg-white rounded-xl">
        {/* Glowing Border */}
        <div
          className="absolute inset-0 -z-10 rounded-xl blur-md opacity-80"
          style={{
            background: "linear-gradient(135deg, #e0f7ff, #ffffff, #e0f7ff)",
            filter: "blur(15px)",
          }}
        ></div>

        {/* Income Section */}
        <div className="flex min-w-[252px] justify-start w-1/4 flex-row items-center text-center gap-2">
          <div className="w-16 h-16 mb-2 rounded-full bg-gradient-to-r from-yellow-200 to-orange-300 flex items-center justify-center">
            <Image width={42} height={42} src="/earning.svg" alt="Earning Icon" />
          </div>
          <div className="flex flex-col text-start gap-1">
            <p className="text-sm font-medium text-gray-500">Earning</p>
            <h3 className="text-xl font-bold text-gray-800">
              Rp{numberWithDot(incomeData?.[incomeData.length - 1]?.totalIncome) || "0"}
            </h3>
            <p className={`text-sm ${incomeChange >= 0 ? "text-green-500" : "text-red-500"}`}>
              {incomeChange >= 0 ? "↑" : "↓"} {Math.abs(incomeChange).toFixed(1)}% this month
            </p>
          </div>
        </div>

        {/* Expenses Section */}
        <div className="flex min-w-[252px] justify-start w-1/4 flex-row items-center text-center gap-2">
          <div className="w-16 h-16 mb-2 rounded-full bg-gradient-to-r from-yellow-200 to-orange-300 flex items-center justify-center">
            <Image width={42} height={42} src="/expenses.svg" alt="Expense Icon" />
          </div>
          <div className="flex flex-col text-start gap-1">
            <p className="text-sm font-medium text-gray-500">Expenses</p>
            <h3 className="text-xl font-bold text-gray-800">
              Rp{numberWithDot(expenseData?.[0]?.totalExpenses) || "0"}
            </h3>
            <p className={`text-sm ${expenseChange >= 0 ? "text-green-500" : "text-red-500"}`}>
              {expenseChange >= 0 ? "↑" : "↓"} {Math.abs(expenseChange).toFixed(1)}% this month
            </p>
          </div>
        </div>

        {/* Balance Section */}
        <div className="flex min-w-[252px] justify-start w-1/4 flex-row items-center text-center gap-2">
          <div className="w-16 h-16 mb-2 rounded-full bg-gradient-to-r from-yellow-200 to-orange-300 flex items-center justify-center">
            <Image width={42} height={42} src="/balance.svg" alt="Balance Icon" />
          </div>
          <div className="flex flex-col text-start gap-1">
            <p className="text-sm font-medium text-gray-500">Balance</p>
            <h3 className="text-xl font-bold text-gray-800">Rp{numberWithDot(balanceData?.updatedBalance) || "0"}</h3>
            <p
              className={`text-sm ${Number(progressData?.progressPercentage) >= 0 ? "text-green-500" : "text-red-500"}`}
            >
              {Number(progressData?.progressPercentage) >= 0 ? "↑" : "↓"}{" "}
              {Math.abs(Number(progressData?.progressPercentage)).toFixed(1)}% this month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
