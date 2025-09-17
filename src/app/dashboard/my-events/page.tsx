"use client";
import AddNewEvent from "@/components/dashboard/my-events/AddNewEvent";
import AllEvents from "@/components/dashboard/my-events/AllEvents";
import EventStats from "@/components/dashboard/my-events/EventsStats";
import NewEventForm from "@/components/dashboard/my-events/NewEventForm";

import React, { useState } from "react";

const MyEvents = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <EventStats />
      <AllEvents />
      <AddNewEvent setShowForm={setShowForm} />
      {showForm && <NewEventForm setShowForm={setShowForm} />}
    </div>
  );
};

export default MyEvents;
