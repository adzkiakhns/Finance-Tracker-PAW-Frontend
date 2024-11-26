import { useSession } from "next-auth/react";

export const useAccessToken = () => {
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;
  const userId = "67440b57303a572cc292155c";

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  return { accessToken, headers, userId };
};

export const useUsername = () => {
  const { data: session } = useSession();
  const name = session?.user?.name;

  return name;
};
