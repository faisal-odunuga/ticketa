"use client";
import Stats from "@/components/dashboard/home/Stats";
import Tickets from "@/components/dashboard/home/Tickets";
import React from "react";

const DashboardHome = () => {
  return (
    <div>
      <Stats />
      <Tickets />
    </div>
  );
};

export default DashboardHome;
