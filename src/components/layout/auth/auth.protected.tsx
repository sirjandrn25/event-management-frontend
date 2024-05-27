"use client";
import { ReactNode, useEffect, useState } from "react";

import { useAuthContext } from "@/components/context/auth.provider";
import { Icons } from "@/components/ui/icons";

const AuthProtected = ({ children }: { children: ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  const { isLoading, isLoggedIn, handleLogout } = useAuthContext();
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (!isLoggedIn) handleLogout();
  }, [handleLogout, isLoading, isLoggedIn]);
  if (!isClient) return <>{children}</>;
  if (isLoading)
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Icons.spinner />;
      </div>
    );
  return <>{children}</>;
};

export default AuthProtected;
