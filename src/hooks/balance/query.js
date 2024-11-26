"use client";

import { useQuery } from "@tanstack/react-query";

import { useAccessToken } from "@/hooks/auth";
import { axios } from "@/lib/axios";

export const useGetBalance = () => {
  const { accessToken, headers, userId } = useAccessToken();
  return useQuery({
    queryKey: ["recalculate", "user", "balance"],
    queryFn: async () => {
      const res = await axios.get(`/api/financial/${userId}/recalculate-balance`, {
        headers,
      });
      return res.data;
    },
    staleTime: 15 * 60 * 1000,
    refetchInterval: 6000,
  });
};

export const useGetBalanceProgress = () => {
  const { accessToken, headers, userId } = useAccessToken();
  return useQuery({
    queryKey: ["progress", "user", "balance"],
    queryFn: async () => {
      const res = await axios.get(`/api/financial/${userId}/balance-progress`, {
        headers,
      });
      return res.data;
    },
    staleTime: 15 * 60 * 1000,
    refetchInterval: 6000,
  });
};
export default useGetBalance;
