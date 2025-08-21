"use client";
import Tickets from "@/components/dashboard/home/Tickets";
import React from "react";
import TicketStats from "@/components/dashboard/home/TicketStats";

const DashboardHome = () => {
  return (
    <div>
      <TicketStats />
      <Tickets />
    </div>
  );
};

export default DashboardHome;
