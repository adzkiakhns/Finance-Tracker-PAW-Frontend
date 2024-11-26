"use client";

import { useState, useEffect } from "react";
import { axios } from "@/lib/axios";
import { Sidebar } from "@/components/sidebar";
import { TransactionSummary } from "@/components/form";

export default function TransactionsPage() {
  return (
    <div className="bg-gray-50 md:pl-64 pl-0 flex min-h-screen w-full items-center justify-center">
      <Sidebar />
      <TransactionSummary />
    </div>
  );
}
