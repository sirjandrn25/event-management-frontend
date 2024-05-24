"use client";
import { ReactNode, useEffect } from "react";

import { useAuthContext } from "@/components/context/auth.provider";
import { Icons } from "@/components/ui/icons";
import RestrictedPage from "./restricted.page";

const AuthProtected = ({ children }: { children: ReactNode }) => {
  const { isLoading, isLoggedIn, handleLogout } = useAuthContext();
  useEffect(() => {
    if (isLoading) return;
    if (!isLoggedIn) handleLogout();
  }, [handleLogout, isLoading, isLoggedIn]);

  if (isLoading)
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Icons.spinner />;
      </div>
    );

  return (
    <>
      {!isLoggedIn ? (
        <RestrictedPage message="Please login first your own credentials..." />
      ) : (
        children
      )}
    </>
  );
};

export default AuthProtected;
