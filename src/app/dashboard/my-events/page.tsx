"use client";
import AddNewEvent from "@/components/dashboard/my-events/AddNewEvent";
import EventStats from "@/components/dashboard/my-events/EventsStats";
import NewEventForm from "@/components/dashboard/my-events/NewEventForm";

import React, { useState } from "react";

const MyEvents = () => {
  const [showForm, setShowForm] = useState(false);

  if (showForm) return <NewEventForm setShowForm={setShowForm} />;
  return (
    <div className="">
      <EventStats />
      <AddNewEvent setShowForm={setShowForm} />
    </div>
  );
};

export default MyEvents;
