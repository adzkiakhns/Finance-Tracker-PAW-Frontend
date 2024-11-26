import { useSession } from "next-auth/react";

export const useAccessToken = () => {
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;
  const userId = session?.user?.id;

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
