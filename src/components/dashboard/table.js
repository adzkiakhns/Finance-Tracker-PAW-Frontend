import Image from "next/image";
import React from "react";

export function CategoriesTable() {
  const transactions = [
    {
      name: "Salary",
      date: "18:27 - April 30",
      type: "Monthly",
      amount: "Rp2.00mio",
      icon: "/salary.svg", // Add your icon paths
      color: "bg-orange-400",
    },
    {
      name: "Groceries",
      date: "17:02 - April 24",
      type: "Pantry",
      amount: "Rp100k",
      icon: "/groceries.svg",
      color: "bg-red-500",
    },
    {
      name: "Rent",
      date: "08:30 - April 15",
      type: "Rent",
      amount: "Rp500k",
      icon: "/rent.svg",
      color: "bg-red-400",
    },
  ];

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

            {/* Dropdown */}
            <div className="bg-gray-100 px-3 py-2 text-sm text-gray-500 rounded-md">Last 30 days</div>
          </div>
        </div>

        {/* Table */}
        <div className="border-t overflow-x-auto border-gray-200">
          <div className="grid w-full grid-cols-12 py-3 text-gray-500 text-sm">
            <div className="col-span-6">Transaction Name</div>
            <div className="col-span-3">Type</div>
            <div className="col-span-3">Amount</div>
          </div>
          {transactions.map((transaction, index) => (
            <div key={index} className="grid grid-cols-12 py-4 border-t border-gray-100 items-center">
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
