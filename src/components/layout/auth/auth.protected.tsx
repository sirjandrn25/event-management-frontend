"use client";
import { ReactNode } from "react";

import { useAuthContext } from "@/components/context/auth.provider";

const AuthProtected = ({ children }: { children: ReactNode }) => {
  const { isLoading, isLoggedIn } = useAuthContext();

  // if (isLoading)
  //   return (
  //     <div className="h-screen w-screen flex items-center justify-center">
  //       <Icons.spinner />;
  //     </div>
  //   );
  return <>{children}</>;

  // return (
  //   <>
  //     {!isLoggedIn ? (
  //       <RestrictedPage message="Please login first your own credentials..." />
  //     ) : (
  //       children
  //     )}
  //   </>
  // );
};

export default AuthProtected;
