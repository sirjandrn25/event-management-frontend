import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-[300px] rounded grid gap-1 shadow border p-4">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
