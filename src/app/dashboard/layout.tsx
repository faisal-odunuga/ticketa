"use client";
import Header from "@/components/dashboard/layout/Header";
import Sidebar from "@/components/dashboard/layout/Sidebar";
import React, { ReactNode, useState } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

  function toggleSidebar() {
    setSidebarOpen(!isSidebarOpen);
  }
  return (
    <div className="flex h-screen bg-[#f7f7f7] relative">
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[20] backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="flex-1 flex flex-col overflow-hidden relative h-screen">
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto bg-[#f4f6ff] p-2 relative w-full h-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
