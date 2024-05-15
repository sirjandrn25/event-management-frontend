"use client";
import AuthProtected from "@/components/layout/auth/auth.protected";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProtected>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="w-full pt-16">{children}</main>
      </div>
    </AuthProtected>
  );
};

export default DashboardLayout;
