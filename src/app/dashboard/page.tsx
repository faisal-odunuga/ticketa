"use client";
import Tickets from "@/components/dashboard/home/Tickets";
import React from "react";
import TicketStats from "@/components/dashboard/home/TicketStats";
import { useTickets } from "@/state/TicketInfoProvider";
import Loader from "@/components/ui/loader/Loader";

const DashboardHome = () => {
  const { authLoading, isLoading } = useTickets();
  if (authLoading || isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <TicketStats />
      <Tickets />
    </div>
  );
};

export default DashboardHome;
