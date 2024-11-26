"use client";

import { useQuery } from "@tanstack/react-query";

import { useAccessToken } from "@/hooks/auth";
import { axios } from "@/lib/axios";

export const useGetExpenses = () => {
  const { accessToken, headers, userId } = useAccessToken();
  return useQuery({
    queryKey: ["expenses", "user"],
    queryFn: async () => {
      const res = await axios.get(`/api/expenses/${userId}`, {
        headers,
      });
      return res.data;
    },
    staleTime: 15 * 60 * 1000,
    refetchInterval: 6000,
  });
};

export const useGetWeeklyExpenses = () => {
  const { accessToken, headers, userId } = useAccessToken();
  const date = new Date();
  return useQuery({
    queryKey: ["expenses", "user", "weekly"],
    queryFn: async () => {
      const res = await axios.get(
        `/api/expenses/${userId}/weekly-expense/${date.getFullYear()}/${date.getMonth() + 1}`,
        {
          headers,
        },
      );
      return res.data;
    },
    staleTime: 15 * 60 * 1000,
    refetchInterval: 6000,
  });
};

export const useGetMonthlyExpenses = () => {
  const { accessToken, headers, userId } = useAccessToken();
  const date = new Date();
  return useQuery({
    queryKey: ["expenses", "user", "monthly"],
    queryFn: async () => {
      const res = await axios.get(`/api/expenses/${userId}/summary/${date.getFullYear()}`, {
        headers,
      });
      return res.data;
    },
    staleTime: 15 * 60 * 1000,
    refetchInterval: 6000,
  });
};

export default useGetExpenses;
