"use client";

import { useQuery } from "@tanstack/react-query";

import { useAccessToken } from "@/hooks/auth";
import { axios } from "@/lib/axios";

export const useGetIncome = () => {
  const { accessToken, headers, userId } = useAccessToken();
  return useQuery({
    queryKey: ["income", "user"],
    queryFn: async () => {
      const res = await axios.get(`/api/income/${userId}`, {
        headers,
      });
      return res.data;
    },
    staleTime: 15 * 60 * 1000,
    refetchInterval: 6000,
  });
};

export const useGetWeeklyIncome = () => {
  const { accessToken, headers, userId } = useAccessToken();
  const date = new Date();
  return useQuery({
    queryKey: ["income", "user", "weekly"],
    queryFn: async () => {
      const res = await axios.get(`/api/income/${userId}/weekly-income/${date.getFullYear()}/${date.getMonth() + 1}`, {
        headers,
      });
      return res.data;
    },
    staleTime: 15 * 60 * 1000,
    refetchInterval: 6000,
  });
};

export const useGetMonthlyIncome = () => {
  const { accessToken, headers, userId } = useAccessToken();
  const date = new Date();
  return useQuery({
    queryKey: ["income", "user", "monthly"],
    queryFn: async () => {
      const res = await axios.get(`/api/income/${userId}/summary/${date.getFullYear()}`, {
        headers,
      });
      return res.data;
    },
    staleTime: 15 * 60 * 1000,
    refetchInterval: 6000,
  });
};

export default useGetIncome;
