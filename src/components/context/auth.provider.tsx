"use client";
import { UserType } from "@/types/user.type";
import { ApiService } from "@/utils/api-service.utils";
import { UserSessionType, authSession } from "@/utils/storage.utils";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocalStorage } from "usehooks-ts";

type AuthContextType = {
  user?: UserType;
  isLoggedIn: boolean;
  isLoading: boolean;
  onTokenHandle?: (data: UserSessionType) => void;
  handleLogout: () => void;
  isAuthorId: (userId: string) => boolean;
  fetchUser?: () => void;
};
export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLoading: false,
  handleLogout: () => {},
  isAuthorId: () => false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useLocalStorage<any>(authSession, {});
  const [localSession, setLocalSession] = useState(session);
  const router = useRouter();

  useQuery({
    queryKey: ["refreshToken"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        const service = new ApiService("auth/refresh");
        service.headers.Authorization = "Bearer " + localSession.refreshToken;
        const response: any = await service.post({
          token: session?.refreshToken,
        });
        onTokenHandle({
          accessToken: response?.data?.accessToken,
          refreshToken: localSession?.refreshToken,
        } as any);
        return {};
      } catch (error) {
        handleLogout();
      }
    },
    refetchInterval: 0.5 * 1000 * 60,
    enabled: !!localSession?.refreshToken,
  });
  const {
    data: user,
    isFetching: isLoading,
    refetch: fetchUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const service = new ApiService("auth/me");
      const response = await service.post({});
      return response?.data as UserType;
    },
    enabled: !!localSession?.accessToken,
    refetchOnWindowFocus: false,
  });

  // AuthStorageUtils.getRefreshToken()

  const onTokenHandle = useCallback(
    (data: UserSessionType) => {
      setSession(data);
      setLocalSession(data);
    },
    [setSession]
  );

  const handleLogout = useCallback(async () => {
    router.push("/logout");
    if (localSession?.accessToken) {
      try {
        const service = new ApiService("auth/logout");
        await service.post({});
      } catch (error) {
        console.log("error", error);
      }
    }
    setSession(null);
    setLocalSession(null);
    router.push("/login");
  }, [localSession?.accessToken, router, setSession]);
  useEffect(() => {
    if (!localSession?.refreshToken) handleLogout();
  }, [handleLogout, localSession]);
  const isAuthorId = useCallback(
    (userId: string) => userId === user?.id,
    [user?.id]
  );

  const value = useMemo(() => {
    return {
      onTokenHandle,
      handleLogout,
      user,
      isLoggedIn: !!localSession?.accessToken,
      isLoading,
      isAuthorId,
      fetchUser,
    };
  }, [
    onTokenHandle,
    handleLogout,
    user,
    localSession?.accessToken,
    isLoading,
    isAuthorId,
    fetchUser,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
