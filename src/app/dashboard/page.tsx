"use client";
import React from "react";
import TicketStats from "@/components/dashboard/home/TicketStats";
import { useTickets } from "@/state/TicketInfoProvider";
import Loader from "@/components/ui/loader/Loader";
import TicketsPage from "@/components/dashboard/home/Tickets";

const DashboardHome = () => {
  const { authLoading, isLoading } = useTickets();
  if (authLoading || isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <TicketStats />
      <TicketsPage />
    </div>
  );
};

export default DashboardHome;
