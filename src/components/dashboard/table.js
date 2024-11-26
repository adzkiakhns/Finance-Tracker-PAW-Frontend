import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useGetExpenses } from "@/hooks/expenses";
import { useGetIncome } from "@/hooks/income";

export function CategoriesTable() {
  const { data: expenseData, isLoading: loadingExpenses } = useGetExpenses();
  const { data: incomeData, isLoading: loadingIncome } = useGetIncome();
  const [filter, setFilter] = useState(30);
  const [mergedData, setMergedData] = useState();

  function transformData(data, type) {
    const now = new Date();
    const filterDate = new Date(now);
    filterDate.setDate(now.getDate() - filter);

    return (
      data
        ?.filter((item) => new Date(item.date) >= filterDate) // Filter by date range
        .map((item) => {
          const date = new Date(item.date);
          const formattedDate = `${date.getHours()}:${String(date.getMinutes()).padStart(
            2,
            "0",
          )} - ${date.toLocaleString("default", { month: "long" })} ${date.getDate()}`;
          const amount = `Rp${(item.amount / 1000).toFixed(0)}k`;
          const icons = ["/salary.svg", "/groceries.svg", "/rent.svg"];
          return {
            id: item._id,
            name: item.source,
            amount,
            date: formattedDate,
            type: item.category,
            icon: icons[Math.floor(Math.random() * icons.length)], // Randomize icon selection
            tag: type,
            color: "bg-orange-400",
          };
        }) || []
    );
  }

  useEffect(() => {
    const transformedIncome = transformData(incomeData, "Income");
    const transformedExpenses = transformData(expenseData, "Expense");
    const newMergedData = [...transformedIncome, ...transformedExpenses].sort((a, b) => {
      return new Date(b.date.split(" - ")[1]) - new Date(a.date.split(" - ")[1]);
    });
    setMergedData(newMergedData);
  }, [filter]);

  console.log(mergedData);

  if (loadingExpenses || loadingIncome) return <div>Loading...</div>;

  return (
    <div className=" bg-gray-100 pt-6 h-full w-full flex justify-center items-center">
      <div className="bg-white rounded-xl w-full p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Categories</h2>
          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16l-4-4m0 0l4-4m-4 4h16" />
              </svg>
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent text-sm outline-none px-2 text-gray-600"
              />
            </div>

            {/* Filter Buttons */}
            <button
              type="button"
              onClick={() => setFilter(1)}
              className={`px-3 py-2 text-sm rounded-md ${
                filter === 1 ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-500"
              }`}
            >
              Last 1 day
            </button>
            <button
              type="button"
              onClick={() => setFilter(7)}
              className={`px-3 py-2 text-sm rounded-md ${
                filter === 7 ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-500"
              }`}
            >
              Last 7 days
            </button>
            <button
              type="button"
              onClick={() => setFilter(30)}
              className={`px-3 py-2 text-sm rounded-md ${
                filter === 30 ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-500"
              }`}
            >
              Last 30 days
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="border-t overflow-x-auto border-gray-200">
          <div className="grid w-full grid-cols-12 py-3 text-gray-500 text-sm">
            <div className="col-span-6">Transaction Name</div>
            <div className="col-span-3">Type</div>
            <div className="col-span-3">Amount</div>
          </div>
          {mergedData?.map((transaction, index) => (
            <div
              key={index}
              className={`grid grid-cols-12 py-4 border-t border-gray-100 items-center bg-opacity-70 ${
                transaction.tag === "Income" ? "bg-green-50" : "bg-red-50"
              }`}
            >
              {/* Icon and Name */}
              <div className="col-span-6 flex items-center gap-4">
                <div className={`w-12 h-12 flex items-center justify-center rounded-md ${transaction.color}`}>
                  <Image
                    width={36}
                    height={36}
                    src={transaction.icon}
                    alt={`${transaction.name} icon`}
                    className="w-6 h-6"
                  />
                </div>
                <div className="w-fit">
                  <p className="font-bold text-gray-800">{transaction.name}</p>
                  <p className="text-sm text-gray-400">{transaction.date}</p>
                </div>
              </div>
              {/* Type */}
              <div className="col-span-3 text-gray-800">{transaction.type}</div>
              {/* Amount */}
              <div className="col-span-3 font-bold text-gray-800">{transaction.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoriesTable;
