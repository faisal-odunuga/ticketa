"use client";

import Button from "@/components/ui/button/Button";
import Loader from "@/components/ui/loader/Loader";
import { useUserEvents } from "@/state/EventsContext";
import { SentenseCase } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AllEvents = () => {
  const { events, isLoadingEvents, errorLoadingEvents } = useUserEvents();

  return (
    <section className="p-8 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-bold">All my events</h2>
      {isLoadingEvents && <Loader />}
      {errorLoadingEvents && (
        <div className="text-red-500">
          Error loading events: {errorLoadingEvents.message}
        </div>
      )}
      {!isLoadingEvents && events.length === 0 && <p>No events found.</p>}
      {!isLoadingEvents && events.length > 0 && (
        <div className="space-y-4 mt-4">
          {events.map((event) => (
            <div
              className="border p-3 rounded-xl flex items-center justify-between"
              key={event.event_id}
            >
              <div className="flex items-center space-x-4">
                <Image
                  src={event?.bannerUrl || ""}
                  alt={event?.title || ""}
                  width={600}
                  height={300}
                  className="w-20 h-20 object-cover rounded-lg border"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {event?.title}
                  </h3>
                  <p className="text-gray-600">
                    {SentenseCase(event?.category || "")}
                  </p>
                </div>
              </div>
              <Link href={`/dashboard/verify-event/${event.event_id}`}>
                <Button btnText="Verify Tickets" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AllEvents;
