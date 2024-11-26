import { useAccessToken } from "@/hooks/auth";
import { useApiMutation2 } from "@/hooks/useApiMutation";
import { axios } from "@/lib/axios";

export const useEditProfile = () => {
  const { accessToken, headers, userId } = useAccessToken();

  return useApiMutation2({
    queryKey: ["profile", "edit"],
    mutationFun: async (_, data) => {
      const res = await axios.put(`/api/users/${userId}`, data, {
        headers,
      });
      return res?.data;
    },
  });
};
