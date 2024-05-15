"use client";
import { useAuthContext } from "@/components/context/auth.provider";
import {
  EmailLoginFormSchemaType,
  SignInWayTypes,
  SignUpFormSchemaType,
} from "@/types/auth.type";
import { DictionaryType } from "@/types/common.type";
import { ApiService } from "@/utils/api-service.utils";
import { UserSessionType } from "@/utils/storage.utils";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const useAuthHandle = () => {
  const [loading, setLoading] = useState<SignInWayTypes | null>();
  const router = useRouter();
  const { onTokenHandle } = useAuthContext();
  const [error, setError] = useState<string>("");

  const onLoginByEmail = useCallback(
    async ({ email, password }: EmailLoginFormSchemaType) => {
      const service = new ApiService("auth/login");
      const response = await service.post({
        email,
        password,
      });
      return response?.data;
    },
    []
  );

  const onRegister = useCallback(
    async (data: SignUpFormSchemaType) => {
      try {
        const service = new ApiService("auth/register");
        const response = await service.post(data);

        router.push("/login");
      } catch (error: any) {}
    },
    [router]
  );
  const onLoginHandle = useCallback(
    async (method: SignInWayTypes, data?: DictionaryType) => {
      try {
        let response: any;
        switch (method) {
          case "credential":
            setLoading("credential");
            response = await onLoginByEmail({
              email: data?.email as string,
              password: data?.password as string,
            });
        }
        onTokenHandle?.(response as UserSessionType);
        setLoading(null);
        router.push("/dashboard");
      } catch (error: any) {
        setError(error.response?.data?.message);
        setLoading(null);
      }
    },
    [onLoginByEmail, onTokenHandle, router]
  );
  return {
    loading,
    onLoginHandle,
    error,
    onRegister,
  };
};

export default useAuthHandle;
