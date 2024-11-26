"use client";

import { useQuery } from "@tanstack/react-query";

import { useAccessToken } from "@/hooks/auth";
import { axios } from "@/lib/axios";

export const useGetProfile = () => {
  const { accessToken, headers, userId } = useAccessToken();
  return useQuery({
    queryKey: ["profile", "user"],
    queryFn: async () => {
      const res = await axios.get(`/api/users/${userId}`, {
        headers,
      });
      return res.data.data;
    },
    staleTime: 15 * 60 * 1000,
    refetchInterval: 6000,
  });
};

export default useGetProfile;
