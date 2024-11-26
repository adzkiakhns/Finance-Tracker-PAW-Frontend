import { useAccessToken } from "@/hooks/auth";
import { useApiMutation2 } from "@/hooks/useApiMutation";
import { axios } from "@/lib/axios";

export const useAddExpenses = () => {
  const { accessToken, headers, userId } = useAccessToken();

  return useApiMutation2({
    queryKey: ["expenses", "add"],
    mutationFun: async (_, data) => {
      const res = await axios.post(`/api/expenses/${userId}`, data, {
        headers,
      });
      return res?.data;
    },
  });
};

export const useEditExpenses = () => {
  const { accessToken, headers, userId } = useAccessToken();

  return useApiMutation2({
    queryKey: ["expenses", "edit"],
    mutationFun: async (_, data) => {
      const res = await axios.put(`/api/expenses/${userId}/${data.id}`, data, {
        headers,
      });
      return res?.data;
    },
  });
};

export const useDeleteExpenses = () => {
  const { accessToken, headers, userId } = useAccessToken();

  return useApiMutation2({
    queryKey: ["expenses", "delete"],
    mutationFun: async (_, data) => {
      const res = await axios.delete(`/api/expenses/${userId}/${data.id}`, {
        headers,
      });
      return res?.data;
    },
  });
};
