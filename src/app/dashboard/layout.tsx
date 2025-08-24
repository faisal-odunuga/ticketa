"use client";
import DashboardHeader from "@/components/dashboard/layout/Header";
import Sidebar from "@/components/dashboard/layout/Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { UserEventsProvider } from "@/state/EventsContext";
import { TicketInfoProvider } from "@/state/TicketInfoProvider";
import { redirect } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    // remove the hash fragment after Supabase processes it
    if (window.location.hash.includes("access_token")) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);
  const { user, loading, isLoggedIn } = useAuth();

  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

  function toggleSidebar() {
    setSidebarOpen(!isSidebarOpen);
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!isLoggedIn) {
    redirect("/login");
  }
  return (
    <TicketInfoProvider>
      <UserEventsProvider>
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
              toggleSidebar={toggleSidebar}
              user={user}
            />
            <main className="flex-1 overflow-y-auto bg-[#f4f6ff] p-4 md:p-2 relative w-full h-full max-w-7xl mx-auto">
              {children}
            </main>
          </div>
        </div>
      </UserEventsProvider>
    </TicketInfoProvider>
  );
};

export default DashboardLayout;
