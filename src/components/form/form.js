"use client";

import React, { useState } from "react";

import { useGetExpenses, useAddExpenses, useEditExpenses, useDeleteExpenses } from "@/hooks/expenses";
import { useGetIncome, useAddIncome, useEditIncome, useDeleteIncome } from "@/hooks/income";

export function TransactionSummary() {
  const { data: expenseData, isLoading: loadingExpenses } = useGetExpenses();
  const { data: incomeData, isLoading: loadingIncome } = useGetIncome();
  const { mutate: AddIncome } = useAddIncome();
  const { mutate: AddExpenses } = useAddExpenses();

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    type: "Income",
  });

  if (loadingExpenses || loadingIncome) return <div>Loading...</div>;

  // Function to transform data into required format
  function transformData(data, type) {
    return (
      data?.map((item) => {
        const date = new Date(item.date);
        const formattedDate = `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")} - ${date.toLocaleString(
          "default",
          { month: "long" },
        )} ${date.getDate()}`;
        const amount = `Rp${(item.amount / 1000).toFixed(0)}k`;
        return {
          name: item.source,
          date: formattedDate,
          type: item.category,
          amount,
          tag: type,
        };
      }) || []
    );
  }

  // Transform both income and expense data
  const transformedIncome = transformData(incomeData, "Income");
  const transformedExpenses = transformData(expenseData, "Expenses");

  // Merge and sort by date
  const mergedData = [...transformedIncome, ...transformedExpenses].sort((a, b) => {
    return new Date(b.date.split(" - ")[1]) - new Date(a.date.split(" - ")[1]);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount || !formData.category) {
      alert("Please fill out all fields.");
      return;
    }
    if (e.type === "Income") {
      AddIncome(formData);
    } else {
      AddExpenses(formData);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full flex flex-col lg:flex-row gap-6 items-start justify-center">
      {/* Transaction Summary Form */}
      <div className="bg-white rounded-xl shadow-lg w-full p-6 lg:w-1/3">
        <h2 className="text-xl font-bold text-orange-600 mb-4">Transaction Summary</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg text-gray-600 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg text-gray-600 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg text-gray-600 focus:outline-none"
          />
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: "Income" })}
              className={`w-1/2 px-4 py-3 rounded-lg ${
                formData.type === "Income" ? "bg-orange-400 text-white" : "bg-gray-300 text-gray-700"
              }`}
            >
              Income
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: "Expense" })}
              className={`w-1/2 px-4 py-3 rounded-lg ${
                formData.type === "Expense" ? "bg-orange-400 text-white" : "bg-gray-300 text-gray-700"
              }`}
            >
              Expense
            </button>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 bg-orange-400 text-white font-bold rounded-lg hover:bg-orange-500 transition"
          >
            PROCEED
          </button>
        </form>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-xl shadow-lg p-6 w-full lg:w-2/3">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Categories</h2>
        <div className="border-t border-gray-200">
          <div className="grid grid-cols-12 py-3 text-gray-500 text-sm">
            <div className="col-span-4">Transaction Name</div>
            <div className="col-span-4">Date</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Amount</div>
          </div>
          {mergedData.length ? (
            mergedData.map((transaction, index) => (
              <div
                key={transaction.id}
                className={`grid grid-cols-12 py-4 border-t border-gray-100 bg-opacity-50 ${
                  transaction.tag === "Income" ? "bg-green-50" : "bg-red-50"
                }`}
              >
                <div className="col-span-4 font-bold text-gray-800">{transaction.name}</div>
                <div className="col-span-4 text-gray-400">{transaction.date}</div>
                <div className="col-span-2 text-gray-800">{transaction.type}</div>
                <div className="col-span-2 font-bold text-gray-800">{transaction.amount}</div>
              </div>
            ))
          ) : (
            <div className="py-4 text-gray-500 text-center">No transactions available</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionSummary;
