import { useAccessToken } from "@/hooks/auth";
import { useApiMutation2 } from "@/hooks/useApiMutation";
import { axios } from "@/lib/axios";

export const useAddIncome = () => {
  const { accessToken, headers, userId } = useAccessToken();

  return useApiMutation2({
    queryKey: ["income", "add"],
    mutationFun: async (_, data) => {
      const res = await axios.post(`/api/income/${userId}`, data, {
        headers,
      });
      return res?.data;
    },
  });
};

export const useEditIncome = () => {
  const { accessToken, headers, userId } = useAccessToken();

  return useApiMutation2({
    queryKey: ["income", "edit"],
    mutationFun: async (_, data) => {
      const res = await axios.put(`/api/income/${userId}/${data.id}`, data, {
        headers,
      });
      return res?.data;
    },
  });
};

export const useDeleteIncome = () => {
  const { accessToken, headers, userId } = useAccessToken();

  return useApiMutation2({
    queryKey: ["income", "delete"],
    mutationFun: async (_, data) => {
      const res = await axios.delete(`/api/income/${userId}/${data}`, {
        headers,
      });
      return res?.data;
    },
  });
};
