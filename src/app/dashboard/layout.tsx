"use client";

import DashboardHeader from "@/components/dashboard/layout/Header";
import Sidebar from "@/components/dashboard/layout/Sidebar";
import { useAuth } from "@/state/AuthProvider";
import { TicketInfoProvider } from "@/state/TicketInfoProvider";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { user, loading, isLoggedIn } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Remove Supabase auth hash after redirect
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.hash.includes("access_token")
    ) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.replace("/login");
    }
  }, [loading, isLoggedIn, router]);

  if (loading) {
    return <div>Loading dashboard…</div>;
  }

  if (!isLoggedIn) {
    // Don’t flash content while redirecting
    return null;
  }

  return (
    <TicketInfoProvider>
      <div className="flex h-screen bg-[#f7f7f7] relative">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[20] backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <div className="flex-1 flex flex-col overflow-hidden relative h-screen">
          <DashboardHeader
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
            user={user}
          />
          <main className="flex-1 overflow-y-auto bg-[#f4f6ff] p-4 md:p-2 relative w-full h-full max-w-7xl mx-auto">
            {children}
          </main>
        </div>
      </div>
    </TicketInfoProvider>
  );
};

export default DashboardLayout;
