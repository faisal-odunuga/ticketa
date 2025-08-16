"use client";
import { getAllEvents } from "@/services/apiEvents";
import EventCard from "./EventCard";
import { useQuery } from "@tanstack/react-query";
import Loader from "../ui/loader/Loader";
import { getFeaturedEvents } from "@/utils/helpers";

const Events = () => {
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: getAllEvents,
  });
  const featuredEvents = getFeaturedEvents(events);
  if (isLoading)
    return (
      <div className="w-full h-full">
        <Loader />
      </div>
    );
  return (
    <>
      <section className="px-4 py-12 sm:px-6 lg:px-20 space-y-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
          <p className="text-[#4b5563]">
            {featuredEvents.length} event
            {featuredEvents.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map((event) => (
            <EventCard key={event.event_id} event={event} />
          ))}
        </div>
      </section>
    </>
  );
};
export default Events;
