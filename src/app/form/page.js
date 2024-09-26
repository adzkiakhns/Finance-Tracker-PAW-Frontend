"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [transactionType, setTransactionType] = useState("Income");
  const [editId, setEditId] = useState(null); // Store the ID of the transaction being edited

  // Fetch transactions from API on mount
  useEffect(() => {
    fetchTransactions();
  }, []);
  console.log(transactions);

  // Function to fetch both income and expense transactions
  const fetchTransactions = async () => {
    try {
      const incomeResponse = await axios.get("http://localhost:5000/api/income");
      const expenseResponse = await axios.get("http://localhost:5000/api/expenses");

      // Mapping income and expense data
      const incomeTransactions = incomeResponse.data.map((item) => ({
        id: item._id,
        description: item.source, // Mapping 'source' to 'description' for income
        amount: item.amount,
        category: item.category,
        date: new Date(item.date).toLocaleDateString(), // Formatting the date
        transactionType: "Income",
      }));

      const expenseTransactions = expenseResponse.data.map((item) => ({
        id: item._id,
        description: item.description, // Mapping 'description' for expenses
        amount: item.amount,
        category: item.category,
        date: new Date(item.date).toLocaleDateString(),
        transactionType: "Expense",
      }));

      setTransactions([...incomeTransactions, ...expenseTransactions]);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  // Function to add a new transaction (Create)
  const handleAddTransaction = async () => {
    const newTransaction = {
      source: transactionType === "Income" ? description : undefined, // For income
      description: transactionType === "Expense" ? description : undefined, // For expense
      amount: parseFloat(amount),
      category,
      date: new Date(), // Sending the current date
    };

    try {
      let response;
      if (transactionType === "Income") {
        response = await axios.post("http://localhost:5000/api/income", newTransaction);
      } else {
        response = await axios.post("http://localhost:5000/api/expenses", newTransaction);
      }

      // Add the new transaction to the local state
      setTransactions([
        ...transactions,
        {
          ...newTransaction,
          id: response.data._id,
          date: new Date(response.data.date).toLocaleDateString(), // Formatting the date
          transactionType,
        },
      ]);

      // Reset form fields
      setDescription("");
      setAmount("");
      setCategory("");
    } catch (err) {
      console.error("Error adding transaction:", err);
    }
  };

  // Function to delete a transaction (Delete)
  const handleDeleteTransaction = async (id, type) => {
    try {
      if (type === "Income") {
        await axios.delete(`http://localhost:5000/api/income/${id}`);
      } else {
        await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      }

      // Remove from local state
      setTransactions(transactions.filter((transaction) => transaction.id !== id));
    } catch (err) {
      console.error("Error deleting transaction:", err);
    }
  };

  // Function to set the edit state for a transaction
  const handleEditTransaction = (transaction) => {
    setEditId(transaction.id);
    setDescription(transaction.description);
    setAmount(transaction.amount);
    setCategory(transaction.category);
    setTransactionType(transaction.transactionType);
  };

  // Function to update an existing transaction (Update)
  const handleUpdateTransaction = async () => {
    const updatedTransaction = {
      source: transactionType === "Income" ? description : undefined, // For income
      description: transactionType === "Expense" ? description : undefined, // For expense
      amount: parseFloat(amount),
      category,
      date: new Date(), // Sending the current date
    };

    try {
      if (transactionType === "Income") {
        await axios.put(`http://localhost:5000/api/income/${editId}`, updatedTransaction);
      } else {
        await axios.put(`http://localhost:5000/api/expenses/${editId}`, updatedTransaction);
      }

      // Update the local state
      setTransactions(
        transactions.map((transaction) =>
          transaction.id === editId ? { ...transaction, description, amount, category, transactionType } : transaction,
        ),
      );

      // Reset form fields and edit mode
      setEditId(null);
      setDescription("");
      setAmount("");
      setCategory("");
    } catch (err) {
      console.error("Error updating transaction:", err);
    }
  };

  return (
    <div className="bg-gray-50 flex min-h-screen w-full items-center justify-center p-4">
      <div className="flex w-full flex-col justify-between gap-4 text-black lg:flex-row">
        {/* Transaction Input Form */}
        <div className="w-full rounded-lg bg-white p-6 shadow-lg lg:w-1/3">
          <h2 className="mb-4 text-xl font-bold">Order summary</h2>

          <div className="mb-4">
            <label className="text-gray-700 block text-sm font-medium">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm sm:text-sm"
              placeholder="Description"
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-700 block text-sm font-medium">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm sm:text-sm"
              placeholder="Amount"
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-700 block text-sm font-medium">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm sm:text-sm"
              placeholder="Category"
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-700 block text-sm font-medium">Transaction Type</label>
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm sm:text-sm"
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          <div className="flex items-center justify-between text-xl font-bold">
            <span>Total</span>
            <span>
              Rp {transactions.reduce((acc, cur) => acc + parseFloat(cur.amount || 0), 0).toLocaleString("id-ID")}
            </span>
          </div>

          <button
            onClick={editId ? handleUpdateTransaction : handleAddTransaction}
            className="bg-indigo-600 hover:bg-indigo-700 mt-4 w-full rounded-md px-4 py-2 text-white transition-colors"
          >
            {editId ? "Update Transaction" : "Input Expense / Income"}
          </button>
        </div>

        {/* Transaction List Section */}
        <div className="w-full rounded-lg bg-white p-6 shadow-lg lg:w-2/3">
          <h2 className="mb-4 text-xl font-bold">Transactions</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="text-gray-500 px-6 py-2 text-xs">#</th>
                  <th className="text-gray-500 px-6 py-2 text-xs">Date</th>
                  <th className="text-gray-500 px-6 py-2 text-xs">Description</th>
                  <th className="text-gray-500 px-6 py-2 text-xs">Amount</th>
                  <th className="text-gray-500 px-6 py-2 text-xs">Category</th>
                  <th className="text-gray-500 px-6 py-2 text-xs">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="whitespace-nowrap">
                    <td className="text-gray-500 px-6 py-4 text-sm">{transaction.id}</td>
                    <td className="text-gray-500 px-6 py-4 text-sm">{transaction.date}</td>
                    <td className="text-gray-500 px-6 py-4 text-sm">
                      {transaction.description}
                      <p className="text-gray-400 text-xs">Category: {transaction.category}</p>
                    </td>
                    <td className="text-gray-500 px-6 py-4 text-sm">
                      Rp {parseFloat(transaction.amount).toLocaleString("id-ID")}
                    </td>
                    <td className="text-gray-500 px-6 py-4 text-sm">{transaction.category}</td>
                    <td className="px-6 py-4">
                      <button
                        className="bg-yellow-500 mr-2 rounded-md px-2 py-1 text-xs font-bold text-white"
                        onClick={() => handleEditTransaction(transaction)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 rounded-md px-2 py-1 text-xs font-bold text-white"
                        onClick={() => handleDeleteTransaction(transaction.id, transaction.transactionType)}
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
