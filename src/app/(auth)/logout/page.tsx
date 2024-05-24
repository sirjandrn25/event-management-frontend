"use client";

import { Icons } from "@/components/ui/icons";

const Logout = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="flex gap-4 items-center ">
        <Icons.spinner /> <span>Logout</span>
      </div>
    </div>
  );
};

export default Logout;
