"use client";

import { useState } from "react";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [transactionType, setTransactionType] = useState("Income");

  const handleAddTransaction = () => {
    const newTransaction = {
      id: transactions.length + 1,
      date: new Date().toLocaleDateString(),
      description,
      category,
      amount,
      transactionType,
    };
    setTransactions([...transactions, newTransaction]);
    setDescription("");
    setAmount("");
    setCategory("");
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex justify-center items-center w-full">
      <div className="flex flex-col lg:flex-row justify-between gap-4 text-black w-full">
        <div className="w-full lg:w-1/3 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Order summary</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Description"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Amount"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Category"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Transaction Type</label>
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          <div className="text-xl font-bold flex justify-between items-center">
            <span>Total</span>
            <span>
              Rp {transactions.reduce((acc, cur) => acc + parseFloat(cur.amount || 0), 0).toLocaleString("id-ID")}
            </span>
          </div>

          <button
            onClick={handleAddTransaction}
            className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Input Expense / Income
          </button>
        </div>

        {/* Transaction List Section */}
        <div className="w-full lg:w-2/3 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Transactions</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-6 py-2 text-xs text-gray-500">#</th>
                  <th className="px-6 py-2 text-xs text-gray-500">Date</th>
                  <th className="px-6 py-2 text-xs text-gray-500">Description</th>
                  <th className="px-6 py-2 text-xs text-gray-500">Amount</th>
                  <th className="px-6 py-2 text-xs text-gray-500">Category</th>
                  <th className="px-6 py-2 text-xs text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="whitespace-nowrap">
                    <td className="px-6 py-4 text-sm text-gray-500">{transaction.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{transaction.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {transaction.description}
                      <p className="text-xs text-gray-400">Category: {transaction.category}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      Rp {parseFloat(transaction.amount).toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{transaction.category}</td>
                    <td className="px-6 py-4">
                      <button
                        className="px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded-md mr-2"
                        onClick={() => alert("Edit functionality not implemented yet")}
                      >
                        Edit
                      </button>
                      <button
                        className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded-md"
                        onClick={() => handleDeleteTransaction(transaction.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
